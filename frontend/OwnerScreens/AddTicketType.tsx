import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, StatusBar, ScrollView, TextInput, AsyncStorage, Alert } from "react-native";
import { AntDesign, Feather, Foundation, MaterialIcons, Ionicons, EvilIcons, Fontisto } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import Dropdown from "react-native-modal-dropdown";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "native-base";
import axios from "axios";

function AddTicketType({ navigation }) {
    const [name, setName ] = useState('');

    const [price, setPrice ] = useState('');
    const [typetime, setTypetime ] = useState(1);
    const [typeverhicle, settypeverhicle ] = useState(1);
    const [drescription, setdrescription ] = useState('');
    const [user, setUser ] = useState('');
    React.useEffect(() => {
        getUser();
    },[]);
    const getUser = async () => {
    let value = await AsyncStorage.getItem('user');
    setUser(JSON.parse(value));
    }
    const addTicket = async () => {
        try{
            const ownerid = user.userid;
            await axios
            .post('https://project3na.herokuapp.com/api/owner/ticket', {
                typetime,
                name,
                price: parseInt(price),
                typeverhicle,
                drescription,
                isDefault:0,
                isSystem:0
                })
            .then(async function (response) {
            Alert.alert('Thông báo',response.data.msg)
              if(response.data.success) {
                navigation.push('ListTicketType');
              } else {
              }
            })
            .catch(function (error) {
            })
            .finally(function () {
            });
        }catch(er){
        }
    }
    const vehicle = [
    {
        vehicleid:'motobike',
        id:1,
        name:"Xe máy"
    },

    {
        vehicleid:'bike',
        id:3,
        name:"Xe đạp"
    },
    {
        vehicleid:'car',
        id:2,
        name:"Ô tô"
    },
];
    const timeUnit = [
        {
            name:"Giờ",
            id:2,
        }, {
            name:"Ngày",
        id:1}
    ];
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <TouchableOpacity onPress={() => navigation.push('ListTicketType')} style={{ flex: 1, alignItems: 'center' }}>
                    <AntDesign name="left" size={24} color="gray" />
                </TouchableOpacity>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Thêm loại vé</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <View>
                <ScrollView style={{ height: height - 120, borderBottomColor: "#CCCCCC" }}>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 5 }}>Tên loại vé:</Text>
                        <TextInput placeholder="Nhập tên loại vé" onChangeText={name => setName(name)}
                   defaultValue={name} />
                    </View>
                    <View style={{ height: 90, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20, paddingRight: 20 }}>
                        <Text>Giá vé: </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TextInput style={{ fontSize: 18,width:130 }} keyboardType="numeric" onChangeText={price => setPrice(price)}
                   defaultValue={price} />
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 25, marginTop: 5 }}>/ </Text>

                                <Picker

                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setTypetime(itemValue)
                                }}
                                >
                                {timeUnit.map(item => (
                                <Picker.Item label={item.name} value={item.id} />
                                ))}
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 90, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingLeft: 20 }}>
                        <Text style={{ marginRight: 10, marginBottom: 10, marginTop: 10 }}>Loại xe:  </Text>
                        <Picker

                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setTypetime(itemValue)
                                }}
                                >
                                {vehicle.map(item => (
                                <Picker.Item label={item.name} value={item.id} />
                                ))}
                                </Picker>
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 5 }}>Mô tả:</Text>
                        <TextInput placeholder="Nhập mô tả..."  onChangeText={drescription => setdrescription(drescription)}
                   defaultValue={drescription} />
                    </View>

                    <View style={{ height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <MaterialButtonViolet
                        onPress={()=>addTicket()}
                            style={styles.buttonAdd}
                            title="Thêm loại vé"
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
    btn: {
        height: 30,
        width: 200,
        marginLeft: 20
    },
    buttonAdd: {
        height: 40,
        width: 150,
        borderWidth: 1,
        borderColor: "rgba(35,225,142,1)",
        borderRadius: 6,
    },
    dropdownParkingName: {
        borderRadius: 15 / 2,
        borderColor: "gray",
        borderWidth: 1,
        paddingLeft: 10,
        paddingTop: 10,
        marginRight: 16 / 2,
        width: 200,
        height: 40
    },
    dropdownStyle: {
        marginLeft: -10,
        paddingHorizontal: 10 / 2,
        marginVertical: -(10 + 1)
    },
    dropdownTimeUnit: {
        borderRadius: 15 / 2,
        borderColor: "gray",
        borderWidth: 1,
        paddingLeft: 10,
        paddingTop: 10,
        marginRight: 16 / 2,
        width: 100,
        height: 40
    },
});

export default AddTicketType;