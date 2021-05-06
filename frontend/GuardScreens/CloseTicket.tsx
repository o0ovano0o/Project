import React from "react";
import { StyleSheet, View,Image,Text ,Dimensions,SafeAreaView,StatusBar,ScrollView, AsyncStorage  } from "react-native";
import { AntDesign,Feather,Ionicons ,MaterialIcons   } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import styles from '../Style/ListTicketStyle';
import Dropdown from "react-native-modal-dropdown";
import { Picker } from "native-base";
import axios from "axios";
import moment from "moment";
export default class Map extends React.Component{
    state = {
        success:false,
        listTicket:new Array(),
        today: moment().format('DD/MM/YYYY'),
        now:moment().format('hh:mm'),
        ticket:{
            price:"",
            ticketid:"",
        },
        user:{},
    }
    async getUser(){
        let value = await AsyncStorage.getItem('user');
        this.setState({ user : JSON.parse(value)});
      }
    async componentDidMount(){
        const me = this;
        var response;
        // alert(1);
        me.getUser();
    }
    async closeTransaction(){
        try {
          var today= moment().format('DD/MM/YYYY');
          var now = moment().format('hh:mm');
            var reponse = await axios
                .post('https://project3na.herokuapp.com/api/guard/transaction/close', {
                    vehicleid: parseInt(this.props.route.params.data.vehicleid),
                    parkingid:  parseInt(this.state.user.parkingid),


                    Timeout:`${now} ${today}`,
                });
            // alert(reponse.data.msg);

            if(reponse.data.success) {
                this.setState({success: true});
                this.state.success = true;
            }
        } catch (error) {
            alert(
                error
            );
        }
    }

    successTicketRender(){
        const availableHours = ["Vé lượt", "Vé ngày" ];
        return(
            <ScrollView style={{flex:1, borderBottomColor:"#CCCCCC", position:'absolute',marginTop:(height-90)/3*2}}>
                <View style={{flex:7, marginLeft:5, marginTop:-5}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={styles.namecar}>Bãi đỗ xe - {this.state.user.parkingname}</Text>
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                            <Text style={styles.textcar}>{this.state.user.parkingaddress}</Text>
                        </View>
                    </View>
                    <View style={{marginTop:10, marginLeft:-15,width:width, alignItems:'center'}}>
                    <Text style={styles.namecar}>Đã trả vé thành công</Text>
                    </View>

                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <View style={{height:60, flexDirection:'row', marginTop:10}}>

                            <MaterialButtonViolet
                                 onPress={() => {
                                    if(this.state.user.role == 2)
                                    this.props.navigation.push("ScanQRCode")
                                    else this.props.navigation.push("ScanQRCodeGuard")

                                }}
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
        return (
            <SafeAreaView  style={styles.container}>
                <StatusBar
                animated={true}
                hidden={true} />
                <View style={{flex:16}}>
                    <View style={styles.tabback}>
                        <View style={{flex:1, alignItems:'center'}}>
                            <AntDesign name="left" size={24} color="black" />
                        </View>
                        <View style={{flex:5, alignItems:'center'}}>
                            <Text style={{fontSize:16, fontWeight:'bold'}}>Trả vé xe</Text>
                        </View>
                        <View style={{flex:1}}>
                        </View>
                    </View>
                    <View style={{marginTop:20 }}>
                            {/* {this.state.success == false && ( */}
                        <View style={ {justifyContent:'center', alignItems:'center'}}>
                            <Image
                                source={require('../assets/images/ticket.png')}
                                resizeMode="cover"
                                style={{height:height-150, width:width-60}}
                                ></Image>
                        </View>



                        <View style={{position:'absolute'}}>
                            <View style={{marginLeft:60, marginTop:10}}>
                                <View style={{ flexDirection:'row'}}>
                                    <MaterialIcons name="local-parking" size={45} color="black" />
                                    <View style={{marginTop:10}}>
                                        <Text style={{fontSize:16}}>Bãi đỗ xe Duy Tân </Text>
                                    </View>
                                </View>
                                <View style={{marginTop:5}}>
                                    <Text style={{}}>Chủ xe: {this.props.route.params.data.username} </Text>
                                </View>
                                <View style={{marginTop:5}}>
                                    <Text>Số điện thoại: {this.props.route.params.data.phonenumber} </Text>
                                </View>
                                <View style={{marginTop:5}}>
                                    <Text>Biển số: {this.props.route.params.data.code} </Text>
                                </View>
                                <View style={{marginTop:5, flexDirection:'row'}}>
                                    <Text>Hãng: {this.props.route.params.data.brand}</Text>
                                </View>
                                <View style={{marginTop:5}}>
                                    {this.props.route.params.data.type=='motobike' &&<Text >Loại xe: Xe máy </Text> }
                                    {this.props.route.params.data.type=='car' &&<Text >Loại xe: Ô tô</Text> }
                                </View>
                                <View style={{marginTop:5}}>
                                    <Text>Màu xe:  {this.props.route.params.data.color} </Text>
                                </View>
                                <View style={{marginTop:5}}>
                                    <Text>Mô tả:  {this.props.route.params.data.description} </Text>
                                </View>
                            </View>
                        </View>


                          {
                              this.state.success == false && (
                        <View style={{position:'absolute',marginTop:(height-150)/3*2-10}}>
                            <View style={{marginLeft:60}}>
                                <View style={{justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:16}}>THÔNG TIN VÉ</Text>
                                </View>
                                <View style={{marginTop:10}}>
                                <Text>Tên vé: {this.props.route.params.data.nameticket} </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text>Thời gian vào: {this.props.route.params.data.Timein} </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{}}>Thời gian ra: {this.state.now} {this.state.today} </Text>
                                </View>
                                <View style={{marginTop:10}}>
                                <Text>Tổng tiền: {this.props.route.params.data.Amount} </Text>
                                </View>
                            </View>
                        </View>
                         )}
                    </View>
                </View>
                {this.state.success == false && (
                <View style={styles.button}>

                       <View style={{alignItems:'center', justifyContent:'center'}}>
                       <View style={{height:60, backgroundColor:'white',flexDirection:'row'}}>
                           <MaterialButtonViolet
                                onPress={() => {
                                    if(this.state.user.role == 2)
                                    this.props.navigation.push("ScanQRCode")
                                    else this.props.navigation.push("ScanQRCodeGuard")

                                }}
                               style={styles.accept}
                               title="Từ chối"
                           ></MaterialButtonViolet>
                           <MaterialButtonViolet
                               onPress={() =>
                                   this.closeTransaction()
                               }
                               style={styles.accept}
                               title="Xác nhận"
                           ></MaterialButtonViolet>
                       </View>
                   </View>
                </View>
                    )}
                    {this.state.success == true && this.successTicketRender()}


            </SafeAreaView>
        );
    }
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height