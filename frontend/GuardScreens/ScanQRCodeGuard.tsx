import React, { Component } from "react";
import { StyleSheet, View,Text ,Image,Dimensions,SafeAreaView,StatusBar,ScrollView,TextInput, AsyncStorage } from "react-native";
import {Camera} from 'expo-camera'
import styles from '../Style/ListTicketStyle';
import * as Permissions from 'expo-permissions';
import Dropdown from "react-native-modal-dropdown";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { AntDesign, Feather } from "@expo/vector-icons";
import axios from "axios";
import moment from "moment";
export default class ScanQRCodeGuard extends React.Component{
    state={
        hasCameraPermission:true,
        type:Camera.Constants.Type.back,
        data:null,
        user:{}
    };
    async getUser(){
        let value = await AsyncStorage.getItem('user');
        this.setState({ user : JSON.parse(value)});
      }
    async componentDidMount(){
        this.getUser();
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
        try {
          var reponse = await axios
          .post('https://project3na.herokuapp.com/api/vehicle', {
              QRCode: this.state.data?.QRCode
          });
          var hour = moment().format('hh:mm');
          var date = moment().format('DD/MM/YYYY');
          var data = {
            vehicleid: parseInt(reponse.data.data.vehicleid),
              parkingid: parseInt(this.state.user.parkingid),
              Timeout: `${hour.toString()} ${date.toString()}`
          }
          alert(JSON.stringify(data));
          var check = await axios
          .post('https://project3na.herokuapp.com/api/guard/transaction/active', data,{
            headers: {
                'Content-Type': 'application/json',
            }
        });
          alert(JSON.stringify(check));
          if(!check.data.success){

            this.props.navigation.push('AddTicket', { data: reponse.data.data });
          }
          else {
              alert(JSON.stringify(check));

              this.props.navigation.push('CloseTicket', { data: {
                  ...reponse.data.data,
                  ...check.data.data
              } });
          }
        } catch (error) {
          alert("Đã có lỗi xảy ra"+ JSON.stringify(error))
        }

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
                <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#283747'}}>

                    <Text style={{marginBottom:20, fontSize:16, color:'white'}}>Quét mã tại đây</Text>
                    <Camera style={{ height:height - 100, width:width-40}} type={this.state.type}
                            flashMode = {Camera.Constants.FlashMode.auto}
                            whiteBalance = {Camera.Constants.WhiteBalance.auto}
                            zoom = {0}
                            onBarCodeScanned={({ type, data }) => {
                                        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
                                        this.getdataTicket(data);
                                    }}
                            >
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
                                    <View style={{marginTop:10,marginBottom:20}}>
                                        { this.state.data?.type == 'motobike'
                                        && <Text style={{}}>Loại xe: Xe máy </Text>
                                        }
                                        { this.state.data?.type == 'car'
                                        && <Text style={{}}>Loại xe: Ô tô </Text>
                                        }
                                        <View style={{marginTop:15, width:width-40, justifyContent:'center', alignItems:'center'}}>
                                            <Text style={{}}>Bạn đang muốn xử lý giao dịch cho xe này ?</Text>
                                        </View>
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