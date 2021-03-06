import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, StatusBar, ScrollView, TextInput, AsyncStorage } from "react-native";
import { AntDesign, Feather, Foundation, MaterialIcons, Ionicons, EvilIcons, Fontisto } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import Dropdown from "react-native-modal-dropdown";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "native-base";
import axios from "axios";

function EditTicketType({navigation,route}) {
    const [name, setName ] = useState('');
    const [price, setPrice ] = useState('');
    const [typetime, setTypetime ] = useState(1);
    const [typeverhicle, settypeverhicle ] = useState(1);
    const [drescription, setdrescription ] = useState('');
    const [user, setUser ] = useState('');
    const [ticketid, setTicketid ] = useState('');
    React.useEffect(() => {
        getUser();
        var data = route.params.data;
        setName(data.name);
        setPrice(data.price);
        setTypetime(parseInt(data.typetime));
        var typever = 0;
        if(data.typeverhicle == 'car') typever = 2;
        if(data.typeverhicle == 'motobike') typever = 1;
        if(data.typeverhicle == 'bike') typever = 3;
        settypeverhicle(typever);
        setdrescription(data.drescription);
        setTicketid(data.ticketid);
    },[]);
    const getUser = async () => {
    let value = await AsyncStorage.getItem('user');
    setUser(JSON.parse(value));
    }
    const putTicket = async () => {
        try{

            await axios
            .put(`https://project3na.herokuapp.com/api/owner/ticket/${ticketid}`, {
                typetime,
                name,
                price: parseInt(price),
                typeverhicle,
                drescription,
                isDefault:0,
                isSystem:0
                })
            .then(async function (response) {
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
        name:"Xe m??y"
    },

    {
        vehicleid:'bike',
        id:3,
        name:"Xe ?????p"
    },
    {
        vehicleid:'car',
        id:2,
        name:"?? t??"
    },
];
    const timeUnit = [
        {
            name:"Gi???",
            id:2,
        }, {
            name:"Ng??y",
        id:1}
    ];
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <TouchableOpacity onPress={() => navigation.push('ListTicketType')} style={{ flex: 1, alignItems: 'center', paddingTop: 10, marginLeft:10 }}>
                    <AntDesign name="left" size={24} color="gray" />
                </TouchableOpacity>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>S???a lo???i v??</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <View>
                <ScrollView style={{ height: height - 120, borderBottomColor: "#CCCCCC" }}>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 5 }}>T??n lo???i v??:</Text>
                        <TextInput placeholder="Nh???p t??n lo???i v??" onChangeText={name => setName(name)}
                   defaultValue={name} />
                    </View>
                    <View style={{ height: 90, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20, paddingRight: 20 }}>
                        <Text>Gi?? v??: </Text>
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
                        <Text style={{ marginRight: 10, marginBottom: 10, marginTop: 10 }}>Lo???i xe:  </Text>
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
                        <Text style={{ marginBottom: 5 }}>M?? t???:</Text>
                        <TextInput placeholder="Nh???p m?? t???..."  onChangeText={drescription => setdrescription(drescription)}
                   defaultValue={drescription} />
                    </View>


                    <View style={{ height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <MaterialButtonViolet
                        onPress={()=>putTicket()}
                            style={styles.buttonAdd}
                            title="S???a th??ng tin v??"
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

export default EditTicketType;