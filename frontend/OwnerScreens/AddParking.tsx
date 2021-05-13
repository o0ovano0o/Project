import React, { useState, Component } from "react";
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, StatusBar, ScrollView, TextInput, TouchableHighlight } from "react-native";
import { AntDesign, Feather, Foundation, MaterialIcons, Ionicons, EvilIcons, Fontisto } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import axios from "axios";
function timeInput() {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [chosenTime, setChosenTime] = useState('00:00');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setChosenTime(moment(date).format('HH:mm'));
        hideDatePicker();
    };
    return {
        chosenTime,
        isDatePickerVisible,
        showDatePicker,
        handleConfirm,
        hideDatePicker
    }
}

function AddParking() {
    const inputOpenTime = timeInput();
    const inputCloseTime = timeInput();
    const [parkingname, setparkingname] = useState('');
    const [TotalParkingCar, setTotalParkingCar] = useState('');
    const [TotalParkingBike, setTotalParkingBike] = useState('');
    const [TotalParkingMotoBike, setTotalParkingMotoBike] = useState('');
    const [address, setaddress] = useState('');
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [description, setdescription] = useState('');


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <AntDesign name="left" size={24} color="black" />
                </View>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Thêm bãi gửi xe</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <View style={styles.profile}>
                <ScrollView style={{ height: height - 120, borderBottomColor: "#CCCCCC" }}>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 5 }}>Tên bãi gửi xe</Text>
                        <TextInput placeholder="Nhập tên bãi gửi xe"
                            onChangeText={parkingname => setparkingname(parkingname)}
                            defaultValue={parkingname}
                        ></TextInput>
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 5 }}>Địa chỉ</Text>
                        <TextInput placeholder="Nhập địa chỉ"
                            onChangeText={address => setaddress(address)}
                            defaultValue={address}></TextInput>
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 10 }}>Số ô gửi xe</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5, flex: 1 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5, flex: 1 }}>
                                <Text>Ô tô: </Text>
                                <TextInput keyboardType="numeric"
                                        onChangeText={TotalParkingCar => setTotalParkingCar(TotalParkingCar)}
                                        defaultValue={TotalParkingCar}></TextInput>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5, flex: 1 }}>
                                <Text>Xe máy: </Text>
                                <TextInput keyboardType="numeric"
                                        onChangeText={TotalParkingMotoBike => setTotalParkingMotoBike(TotalParkingMotoBike)}
                                        defaultValue={TotalParkingMotoBike}></TextInput>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5, flex: 1 }}>
                                <Text>Xe đạp: </Text>
                                <TextInput keyboardType="numeric"
                                        onChangeText={TotalParkingBike => setTotalParkingMotoBike(TotalParkingBike)}
                                        defaultValue={TotalParkingBike}></TextInput>
                            </View>
                        </View>

                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 5 }}>Giờ mở</Text>
                        <TouchableHighlight onPress={inputOpenTime.showDatePicker} underlayColor='white' style={{ backgroundColor: 'white', marginTop: 10 }}>
                            <Text style={{ color: 'black' }}>{inputOpenTime.chosenTime} </Text>
                        </TouchableHighlight>
                        {inputOpenTime.isDatePickerVisible && (
                            <DateTimePickerModal
                                isVisible={inputOpenTime.isDatePickerVisible}
                                mode="time"
                                onConfirm={inputOpenTime.handleConfirm}
                                onCancel={inputOpenTime.hideDatePicker}
                            />
                        )}
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 5 }}>Giờ đóng</Text>
                        <TouchableHighlight onPress={inputCloseTime.showDatePicker} underlayColor='white' style={{ backgroundColor: 'white', marginTop: 10 }}>
                            <Text style={{ color: 'black' }}>{inputCloseTime.chosenTime} </Text>
                        </TouchableHighlight>
                        {inputCloseTime.isDatePickerVisible && (
                            <DateTimePickerModal
                                isVisible={inputCloseTime.isDatePickerVisible}
                                mode="time"
                                onConfirm={inputCloseTime.handleConfirm}
                                onCancel={inputCloseTime.hideDatePicker}
                            />
                        )}
                    </View>
                    <View style={{ height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <MaterialButtonViolet
                            onPress={() => register( parkingname, TotalParkingCar,TotalParkingBike ,TotalParkingMotoBike ,address)}
                            style={styles.button}
                            title="Thêm bãi gửi xe"
                        ></MaterialButtonViolet>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView >
    );
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    tabback: {
        height: 50,
        width: width,
        backgroundColor: "#16f198",
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#CCCCCC",
        flexDirection: 'row'
    },
    profile: {
        height: height - 50,
        width: width,
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 70,
        marginLeft: 20,
    },
    avatar: {
        borderBottomWidth: 1,
        borderBottomColor: "#CCCCCC",
        justifyContent: "center",
        height: 100,
        alignItems: 'center'
    },
    username: {
        fontSize: 18
    },
    btn: {
        height: 30,
        width: 200,
        marginLeft: 20
    },
    cancel: {
        height: 40,
        width: 120,
        borderWidth: 1,
        borderColor: "red",
        borderRadius: 6,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        elevation: 30,
        shadowOpacity: 0.33,
        shadowRadius: 10,
        backgroundColor: 'red'
    },
    button: {
        height: 40,
        width: 250,
        borderWidth: 1,
        borderColor: "rgba(35,225,142,1)",
        borderRadius: 6,
    }

});
async function register( parkingname: string, TotalParkingCar: int,TotalParkingBike :int,TotalParkingMotoBike :int,address: string) {
  var endpoint = '';
  endpoint = 'https://project3na.herokuapp.com/api/owner/parking';
  var latitude,longitude,description;
//   if(password != repassword) {
//     return alert('Mật khẩu không khớp. Vui lòng nhập lại.');
//   }
longitude="12.1232";
description="a";
latitude="10.3123";
  await axios
  .post(endpoint, {
        parkingname,
        TotalParkingCar,TotalParkingBike,TotalParkingMotoBike,
        address,latitude,longitude,description
      })
  .then(async function (response) {
    // handle success
    alert('Tạo bãi đỗ thành công');
    if(response.data.success) {
      var data = JSON.stringify(response.data.data);
    } else {
      alert(response.data.msg);
    }
  })
  .catch(function (error) {
    // handle error
    alert('error');
  })
  .finally(function () {
  });
}
export default AddParking;
