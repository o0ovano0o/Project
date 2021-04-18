import React from "react";
import { StyleSheet, View,Image,Text ,Dimensions,SafeAreaView,StatusBar,ScrollView, AsyncStorage  } from "react-native";
import { AntDesign,Feather,MaterialIcons    } from '@expo/vector-icons';
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
        try{
            response = await axios
            .get(`https://project3na.herokuapp.com/api/default-ticket/${this.props.route.params.data.type}`);
            response = response.data.data;
            me.setState({
                listTicket : response
            });
            // alert(JSON.stringify(response));
        }catch(er){
            alert(er);
        }
    }
    async createTransaction(){
        try {
            var reponse = await axios
                .post('https://project3na.herokuapp.com/api/guard/transaction', {
                    vehicleid: parseInt(this.props.route.params.data.vehicleid),
                    parkingid:  parseInt(this.state.user.parkingid),
                    ticketID:  parseInt(this.state.ticket.ticketid),
                    Timein: `${this.state.now} ${this.state.today}`,
                    Timeout:"",
                    TotalAmount:0,
                    Status :1,
                     userid:  parseInt(this.props.route.params.data.userid)
                });
            alert(reponse.data.msg);

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
    addTicketRender(){
        const availableHours = ["Vé lượt", "Vé ngày" ];
        return(
            <ScrollView style={{height:height*0.5, borderBottomColor:"#CCCCCC"}}>
                <View style={{flex:7, marginLeft:5, marginTop:-2}}>
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
                        <Text style={{fontSize:20, fontWeight:'bold'}}>TẠO VÉ</Text>
                    </View>
                    <View style={{}}>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center'}}>
                            <Text>Loại vé:  </Text>
                            <Picker

                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({
                                        ticket:this.state.listTicket.find(item => item.ticketid == itemValue)
                                    })
                                }}
                            >
                                 {this.state.listTicket.map(ticket => (
                                <Picker.Item label={ticket.name} value={ticket.ticketid} />
                                ))}
                            </Picker>
                            {/* <Dropdown
                                defaultIndex={0}
                                options={availableHours}
                                style={styles.hoursDropdown}
                                defaultValue={ "Vé lượt"}
                                dropdownStyle={styles.hoursDropdownStyle}

                            /> */}
                        </View>
                        <View style={{marginTop:10}}>
                            <Text>Giá vé: {this.state.ticket.price} đ </Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text>Ngày gửi: {this.state.today} </Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text>Giờ vào: {this.state.now} </Text>
                        </View>
                    </View>



                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <View style={{height:60, backgroundColor:'white',flexDirection:'row', marginTop:10}}>
                            <MaterialButtonViolet
                                onPress={() =>
                                    this.props.navigation.push("ScanQRCode")
                                }
                                style={styles.accept}
                                title="Từ chối"
                            ></MaterialButtonViolet>
                            <MaterialButtonViolet
                                onPress={() =>
                                    this.createTransaction()
                                }
                                style={styles.accept}
                                title="Xác nhận"
                            ></MaterialButtonViolet>
                        </View>
                    </View>

                </View>
            </ScrollView>
        );
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
                                onPress={() =>
                                    this.props.navigation.push("ScanQRCode")
                                }
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
                <View style={{flex:9}}>
                    <View style={styles.tabback}>
                        <View style={{flex:1, alignItems:'center'}}>
                            <AntDesign name="left" size={24} color="gray" />
                        </View>
                        <View style={{flex:5, alignItems:'center'}}>
                            <Text style={{fontSize:16, fontWeight:'bold'}}>Tạo vé xe</Text>
                        </View>
                        <View style={{flex:1}}>
                        </View>
                    </View>
                    <View style={{marginLeft:20, marginTop:15}}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:16}}>THÔNG TIN XE</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text>Chủ xe: {this.props.route.params.data.username} </Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text>Biển số: {this.props.route.params.data.code} </Text>
                        </View>
                        <View style={{marginTop:10, flexDirection:'row'}}>
                            <Text>Hãng: {this.props.route.params.data.brand}</Text>
                            {this.props.route.params.data.type=='motobike' &&<Text style={{marginLeft:20}}>Loại xe: Xe máy </Text> }
                            {this.props.route.params.data.type=='car' &&<Text style={{marginLeft:20}}>Loại xe: Ô tô</Text> }
                        </View>
                        <View style={{marginTop:10}}>
                            <Text>Màu xe:  {this.props.route.params.data.color} </Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text>Mô tả:  {this.props.route.params.data.description} </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.modeladd}>
                    {this.state.success == false && this.addTicketRender()}
                    {this.state.success == true && this.successTicketRender()}
                </View>


            </SafeAreaView>
        );
    }
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height