import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, StatusBar, ScrollView, TextInput, AsyncStorage, Alert } from "react-native";
import { Camera } from 'expo-camera'
import { Picker } from "native-base";
import styles from '../Style/ListTicketStyle';
import * as Permissions from 'expo-permissions';
import Dropdown from "react-native-modal-dropdown";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { AntDesign, Feather } from "@expo/vector-icons";
import axios from "axios";
import moment from "moment";
export default class ScanQRCode extends React.Component {
    state = {
        hasCameraPermission: true,
        type: Camera.Constants.Type.back,
        data: null,
        user: {},
        parkings: [],
        parking: {}
    };
    async getUser() {
        let value = await AsyncStorage.getItem('user');
        this.setState({ user: JSON.parse(value) });
    }
    async componentDidMount() {
        this.getUser();
        this.getParking()
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' })
    }
    async getParking() {
        try {
            var response = await axios
                .get(`https://project3na.herokuapp.com/api/owner/parkings`);
            this.setState({ parkings: response.data.data })
            this.setState({ parking: response.data.data[0] })
        } catch (er) {

        }
    }
    getdataTicket(data: any) {
        var datas = data.split('*');
        var user = datas[0];
        var phonenumber = datas[1];
        var code = datas[2];
        var type = datas[3];
        this.setState({
            data: {
                userid: user,
                phonenumber,
                code,
                type,
                QRCode: data
            }
        });
    }
    async createTicket() {
        if (!this.state.data?.QRCode) return alert('Chưa nhận được thông tin');
        var reponse = await axios
            .post('https://project3na.herokuapp.com/api/vehicle', {
                QRCode: this.state.data?.QRCode
            });
        var hour = moment().format('hh:mm');
        var date = moment().format('DD/MM/YYYY');
        if(!this.state.parking || !this.state.parking.parkingid) {
            return Alert.alert("Cảnh báo","Không thấy tin bãi đỗ để tạo vé.");
        }
        var check = await axios
            .post('https://project3na.herokuapp.com/api/guard/transaction/active', {
                vehicleid: parseInt(reponse.data.data.vehicleid),
                parkingid: parseInt(this.state.parking.parkingid),
                Timeout: `${hour} ${date}`

            });
        if (!check.data.success)
            this.props.navigation.push('AddTicket', { data:{
                ...reponse.data.data,
                parking:this.state.parking
            }  });
        else {
            this.props.navigation.push('CloseTicket', {
                data: {
                    ...reponse.data.data,
                    ...check.data,
                    parking:this.state.parking

                }
            });
        }
    }
    successTicketRender() {
        const availableHours = ["Vé lượt", "Vé ngày"];
        return (
            <ScrollView style={{ flex: 1, borderBottomColor: "#CCCCCC" }}>
                <View style={{ flex: 7, marginLeft: 5, marginTop: -5 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.namecar}>Bãi đỗ xe Duy Tân 2</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="map-pin" size={14} color="gray" style={{ marginLeft: 8 }} />
                            <Text style={styles.textcar}>Ngõ 12, phố Duy Tân, Cầu Giấy, Hà Nội</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: -15, width: width, alignItems: 'center' }}>
                        <Image
                            source={require('../assets/images/su.png')}
                            resizeMode="cover"
                            style={{ height: 180, width: 180 }}
                        ></Image>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 60, backgroundColor: 'white', flexDirection: 'row', marginTop: 10 }}>
                            <MaterialButtonViolet
                                style={styles.accept2}
                                title="Tạo vé mới"
                            ></MaterialButtonViolet>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View></View>
        }
        else if (hasCameraPermission === false) {
            return <Text>No access</Text>
        } else {
            return (
                <View style={{ flex: 5,alignItems: 'center', backgroundColor: '#283747' }}>
                    <View style={{ height:80, marginTop: 40, borderRadius:10,  }}>
                            <Text style={{ marginBottom: 5, fontSize: 17, color: 'white', marginLeft: 30 }}>Chọn bãi đỗ</Text>
                        <Picker

                            style={styles.hoursDropdownScan}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({
                                    parking: itemValue
                                })
                            }}
                        >
                            {this.state.parkings.map(parking => (
                                <Picker.Item label={parking.parkingname} value={parking} />
                            ))}
                        </Picker>
                    </View>
                    <View>
                    <Text style={{ marginBottom: 20,alignItems:'center',justifyContent:"center",display:'flex', fontSize: 16, color: 'white' }}>Quét mã tại đây</Text>
                    <Camera style={{ height: 400, width: width - 40 }} type={this.state.type}
                        flashMode={Camera.Constants.FlashMode.auto}
                        whiteBalance={Camera.Constants.WhiteBalance.auto}
                        zoom={0}
                        onBarCodeScanned={({ type, data }) => {
                            this.getdataTicket(data);
                        }}
                    >
                    </Camera>
                    </View>
                    { this.state.data != null
                        &&
                        <SafeAreaView style={styles.container}>
                            <StatusBar
                                animated={true}
                                hidden={true} />
                            <View style={{ flex: 9 }}>
                                <View style={{ marginLeft: 20, marginTop: 25 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>THÔNG TIN XE</Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text>Điện thoại:  {this.state.data?.phonenumber} </Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text>Biển số: {this.state.data?.code} </Text>
                                    </View>
                                    <View style={{ marginTop: 10, marginBottom: 20 }}>
                                        {this.state.data?.type == 'motobike'
                                            && <Text style={{}}>Loại xe: Xe máy </Text>
                                        }
                                        {this.state.data?.type == 'car'
                                            && <Text style={{}}>Loại xe: Ô tô </Text>
                                        }
                                        <View style={{ marginTop: 15, width: width - 40, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{}}>Bạn có muốn xử lý giao dịch cho xe này ?</Text>
                                        </View>
                                    </View>

                                    <MaterialButtonViolet
                                        title="Xác nhận"
                                        style={styles.materialButtonViolet1}
                                        onPress={() => this.createTicket()}
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