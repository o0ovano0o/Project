import React, { Component, useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, StatusBar, ScrollView, TextInput, TouchableHighlight } from "react-native";
import { AntDesign, Feather, FontAwesome, MaterialCommunityIcons, Ionicons, Fontisto } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { Picker } from "native-base";
import QRCodeGen from 'react-native-qrcode-svg';
import CheckBox from "@react-native-community/checkbox";
import { AsyncStorage } from 'react-native';
import axios from "axios";
function Vehicle({ navigation,route }) {
    const { vehicle } = route.params;
    const data = vehicle;
    const [color, setColor] = useState('');
    const [code, setCode] = useState('');
    const [type, setType] = useState('motobike');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [QRCode, setQRCode] = useState('demo');
    const [isDefault, setDefault] = useState(false);
    const [vehicleid, setvehicleid] = useState(0);
    const [user, setUser] = React.useState('');
    React.useEffect(() => {
        var data = route.params.vehicle;
        getUser();
        setColor(data.color);
        setCode(data.code);
        setType(data.type);
        setBrand(data.brand);
        setDescription(data.description);
        setQRCode(data.QRCode);
        setvehicleid(data.vehicleid);
        setDefault(data.isDefault);
    }, []);
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }
    const genCode = () => {
        const data = new Array();
        data.push(user.userid);
        data.push(user.phonenumber);
        data.push(code);
        data.push(type);
        setQRCode(data.join('*'));
        return data.join('*');
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <TouchableHighlight onPress={() => navigation.push('ListVehicle')} style={{ flex: 1, alignItems: 'center' }}>
                    <AntDesign name="left" size={24} color="gray" />
                </TouchableHighlight>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sửa thông tin xe</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <View style={styles.profile}>
                <ScrollView style={{ height: height - 120, borderBottomColor: "#CCCCCC" }}>
                    <View style={styles.item}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={styles.text}>Loại xe</Text>
                        </View>
                        <Picker
                            selectedValue={type}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => {
                                setType(itemValue);
                                genCode();
                            }}
                        >
                            <Picker.Item label="Ô tô" value="car" />
                            <Picker.Item label="Xe máy" value="motobike" />
                            <Picker.Item label="Xe đạp" value="bike" />
                        </Picker>
                    </View>
                    <View style={styles.item}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={styles.text}>Hãng xe</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Nhập tên hãng..." defaultValue={brand} onChangeText={(value) => setBrand(value)} />
                    </View>
                    <View style={styles.item}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={styles.text}>Biển số</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Nhập biển số..." defaultValue={code} onChangeText={(value) => {
                            setCode(value); genCode();
                        }
                        } />
                    </View>
                    <View style={styles.item}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={styles.text}>Màu xe</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Nhập màu xe..." defaultValue={color} onChangeText={(value) => setColor(value)} />
                    </View>
                    <View style={styles.item}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={styles.text}>Mô tả</Text>
                        </View>
                        <TextInput style={styles.btn}
                            placeholder="Nhập mô tả xe..." defaultValue={description} onChangeText={(value) => setDescription(value)} />
                    </View>
                    <View style={styles.item}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <Text style={styles.text}>Chọn làm xe chính</Text>
                        </View>
                        <CheckBox
                            value={isDefault}
                            onValueChange={setDefault} />
                    </View>
                    <View style={{ backgroundColor: 'white', justifyContent: 'center', marginTop: 10, borderColor: '#CCCCCC', borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="qrcode-scan" size={20} color="gray" style={{ marginHorizontal: 20, marginTop: 10 }} />
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, fontFamily: 'sans-serif-light' }}>Mã QR</Text>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 10 }}>
                            <QRCodeGen
                                value={QRCode}
                                size={200}
                                logoBackgroundColor='transparent'
                            />
                        </View>

                    </View>
                    <TouchableHighlight onPress={() => deleteVehicle(navigation, vehicleid)} style={{ backgroundColor: 'white', justifyContent: 'center', marginTop: 10, borderBottomColor: '#CCCCCC', borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 16, color: 'red', fontFamily: 'sans-serif-light',backgroundColor:'white', marginHorizontal: 20, marginTop: 10, marginBottom: 10 }}>Xóa xe</Text>
                        </TouchableHighlight>
                    <View style={{ height: 90, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 10, borderBottomColor: '#CCCCCC', borderBottomWidth: 1 }}>
                        <MaterialButtonViolet
                            onPress={() => editVehicle(navigation, vehicleid,color, code, type, brand, description, QRCode, isDefault)}
                            style={styles.accept}
                            title="Sửa thông tin"
                        ></MaterialButtonViolet>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
async function editVehicle(navigation:any,vehicleid:number, color: string, code: string, type: string, brand: string, description: string, QRCode: string, isDefault: boolean) {
    await axios
    .put(`https://project3na.herokuapp.com/api/customer/vehicle/${vehicleid}`, {
        color, code, type, brand, description, QRCode, isDefault
        })
    .then(async function (response) {
      if(response.data.success) {
        navigation.push('ListVehicle');
      } else {
      }
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
}
const deleteVehicle = async function(navigation:any,vehicleid: number) {

    await axios
    .delete(`https://project3na.herokuapp.com/api/customer/vehicle/${vehicleid}`)
    .then(async function (response) {
      if(response.data.success) {
        navigation.push('ListVehicle');
      } else {
      }
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
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
        backgroundColor: "#EEEEEE"
    },
    accept: {
        height: 40,
        width: width - 20,
        borderWidth: 1,
        borderColor: "rgba(35,225,142,1)",
        borderRadius: 6,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        elevation: 30,
        shadowOpacity: 0.33,
        shadowRadius: 10,
    },
    image: {
        height: 200,
        width: 200,
    },
    btn: {
        height: 50,
        width: 200,
        position: 'absolute',
        right: 10,
        fontSize: 15,
        fontFamily: 'sans-serif-light'
    },
    item: {
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 50,
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1
    },
    text: {
        marginLeft: 20,
        fontSize: 15,
        fontFamily: 'sans-serif-light',
    }
});

export default Vehicle;
