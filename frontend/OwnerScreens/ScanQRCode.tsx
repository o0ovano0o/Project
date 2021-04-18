import React, { Component } from "react";
import { StyleSheet, View,Text ,Image,Dimensions,SafeAreaView,StatusBar,ScrollView,TextInput } from "react-native";
import {Camera} from 'expo-camera'
import styles from '../Style/ListTicketStyle';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { AntDesign, Feather } from "@expo/vector-icons";
import axios from "axios";
export default class ScanQRCode extends React.Component{
    state={
        hasCameraPermission:true,
        type:Camera.Constants.Type.back,
        data:null
    };

    async componentDidMount(){
        const {status}= await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission:status === 'granted'})
    }
    getdataTicket(data:any){
        var datas = data.split('*');
        var user = datas[0];
        var phonenumber = datas[1];
        var code = datas[2];
        var type = datas[3];
        this.setState({
            data:{
                userid:user,
                phonenumber,
                code,
                type,
                QRCode: data
            }
        });
        // alert(JSON.stringify(this.state.data));
    }
    async createTicket() {
        if(!this.state.data?.QRCode) return alert('Chưa nhận được thông tin');
        var reponse = await axios
            .post('https://project3na.herokuapp.com/api/vehicle', {
                QRCode: this.state.data?.QRCode
            });
        this.props.navigation.push('AddTicket', { data: reponse.data.data });
    }
    successTicketRender(){
        const availableHours = ["Vé lượt", "Vé ngày" ];
        return(
            <ScrollView style={{flex:1, borderBottomColor:"#CCCCCC"}}>
                <View style={{flex:7, marginLeft:5, marginTop:-5}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={styles.namecar}>Bãi đỗ xe Duy Tân 2</Text>
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                            <Text style={styles.textcar}>Ngõ 12, phố Duy Tân, Cầu Giấy, Hà Nội</Text>
                        </View>
                    </View>
                    <View style={{marginTop:10, marginLeft:-15,width:width, alignItems:'center'}}>
                        <Image
                            source={require('../assets/images/su.png')}
                            resizeMode="cover"
                            style={{height:180, width:180}}
                        ></Image>
                    </View>

                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <View style={{height:60, backgroundColor:'white',flexDirection:'row', marginTop:10}}>

                            <MaterialButtonViolet
                                // onPress={() =>

                                // }
                                style={styles.accept2}
                                title="Tạo vé mới"
                            ></MaterialButtonViolet>
                        </View>
                    </View>

                </View>
            </ScrollView>
        );
    }
    render(){
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <View></View>
        }
        else if (hasCameraPermission === false){
            return <Text>No access</Text>
        } else {
            return(
                <View style={{flex:1}}>
                    <Camera style={{flex:1}} type={this.state.type}
                    flashMode = {Camera.Constants.FlashMode.auto}
                    whiteBalance = {Camera.Constants.WhiteBalance.auto}
                    zoom = {0}
                    onBarCodeScanned={({ type, data }) => {
                                // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
                                this.getdataTicket(data);
                              }}

                    >
                        <View style={{height:80, width:width, flexDirection:'row', marginTop:height-100, justifyContent:'center'}}>
                            <TouchableOpacity
                                style={{
                                    height:80,
                                    width:80,
                                    borderRadius:80,
                                    borderWidth:1,
                                    borderColor:'gray',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    backgroundColor:'gray',
                                    flexDirection:'row'}}
                                    onPress={()=>{
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front:Camera.Constants.Type.back,
                                        });
                                    }}
                            >
                                <Text
                                    style={{fontSize:18, marginBottom:10, color:'white'}}
                                >
                                    {''}Scan{''}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </Camera>
                        { this.state.data!=null
                        &&
                        <SafeAreaView  style={styles.container}>
                        <StatusBar
                        animated={true}
                        hidden={true} />
                        <View style={{flex:9}}>
                            <View style={{marginLeft:20, marginTop:15}}>
                                <View style={{justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:16}}>THÔNG TIN XE</Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text>Điện thoại:  {this.state.data?.phonenumber} </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text>Biển số: {this.state.data?.code} </Text>
                                </View>
                                <View style={{marginTop:10,marginBottom:20, flexDirection:'row'}}>
                                    { this.state.data?.type == 'motobike'
                                    && <Text style={{marginLeft:20}}>Loại xe: Xe máy </Text>
                                    }
                                     { this.state.data?.type == 'car'
                                    && <Text style={{marginLeft:20}}>Loại xe: Ô tô </Text>
                                    }
                                    <Text>Bạn có muốn tạo vé cho xe này ?</Text>
                                </View>

                                <MaterialButtonViolet
                                    title="Xác nhận"
                                    style={styles.materialButtonViolet1}
                                    onPress={() =>this.createTicket()}
                                ></MaterialButtonViolet>
                            </View>
                        </View>
                    </SafeAreaView>
                        }
                </View>
            );
        }
    }
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height