import React, { Component, useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, StatusBar, ScrollView, TextInput, AsyncStorage, TouchableHighlight, Button } from "react-native";
import { AntDesign, Feather, Foundation, MaterialIcons, Ionicons, EvilIcons, Fontisto } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import faker from 'faker';
import { Picker } from "native-base";
import Dropdown from "react-native-modal-dropdown";
import axios from "axios";

faker.seed(10);
const item_img = `https://cdn1.iconfinder.com/data/icons/avatar-3/512/Security-512.png`;
function EditGuard({navigation,route}) {
    const [user, setUser] = React.useState('');
    const [parkings, setParkings] =  React.useState([]);
    const [username, setusername] = useState('');
    const [userid, setuserid] = useState('');
    const [repassword, setrepassword] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [address, setaddress] = useState('');
    const [email, setemail] = useState('');
    const [parkingid, SetParkingID] = useState(1);

    const parkingName = ["Bãi gửi xe Duy Tân", "Bãi gửi xe Cầu Giấy" ];
    React.useEffect(() => {
        getUser();
        getParking();
        var data = route.params.data;
        setusername(data.username);
        setuserid(data.userid);
        setrepassword(data.password);
        setphonenumber(data.phonenumber);
        setaddress(data.address);
        setemail(data.email);
        SetParkingID(data.parkingid);


      },[]);
    const editGuard = async () => {
        try{
            const ownerid = user.userid;          
            await axios
            .put(`https://project3na.herokuapp.com/api/owner/guard/${userid}`, {
                  username,

                  phonenumber,address,email,ownerid,parkingid
                })
            .then(async function (response) {
              if(response.data.success) {

                navigation.push('ListGuard');
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
    const getParking = async () => {
        try{
            var response = await axios
            .get(`https://project3na.herokuapp.com/api/owner/parkings`);
            setParkings(response.data.data);
        }catch(er){
        }
    }
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
            <TouchableHighlight onPress={() => navigation.push('ListGuard')} style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>
                    <AntDesign name="left" size={24} color="black" />
                </View>
                </TouchableHighlight>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Cập nhật thông tin</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <View style={styles.profile}>
                <View style={styles.avatar}>
                    <Image
                        source={{ uri: item_img }}
                        resizeMode="cover"
                        style={styles.image}
                    ></Image>
                </View>
                <ScrollView style={{ height: height - 120, borderBottomColor: "#CCCCCC" }}>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <AntDesign name="user" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Tên đăng nhập:</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Nhập tên đăng nhập..." onChangeText={username => setusername(username)}
                   defaultValue={username} />
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <EvilIcons name="user" size={24} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Địa chỉ:</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Nhập địa chỉ..." onChangeText={address => setaddress(address)}
                   defaultValue={address}  />
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <Foundation name="telephone" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Số điện thoại:</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Nhập số điện thoại..." onChangeText={phonenumber => setphonenumber(phonenumber)}
                   defaultValue={phonenumber} />
                    </View>
                    <View style={{ height: 90, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingLeft: 20 }}>
                        <Text style={{ marginRight: 10, marginBottom: 10, marginTop: 10}}>Bãi gửi xe:  </Text>
                        <Picker
                            style={{ height: 50, width: 300 }}
                            onValueChange={(itemValue, itemIndex) => {
                                SetParkingID(itemValue)
                            }}
                        >
                            {parkings.map(parking => (
                                <Picker.Item label={parking.parkingname} value={parking.parkingid} />
                            ))}
                        </Picker>
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <MaterialIcons name="alternate-email" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Email:</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Nhập email..."  onChangeText={email => setemail(email)}
                   defaultValue={email} />
                    </View>                   
                    <Button title="Đổi mật khẩu" color="#0496bf" onPress={() => navigation.push("ChangePassword")}/>
                    <View style={{ height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <Button
                        onPress={()=>editGuard()}
                           color="#04bf8b"
                            title="Sửa tài khoản"
                        ></Button>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
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
    buttonAdd: {
        height: 40,
        width: 150,
        borderWidth: 1,
        borderColor: "rgba(35,225,142,1)",
        borderRadius: 6,
    },
    dropdown: {
        borderRadius: 15 / 2,
        borderColor: "gray",
        borderWidth: 1,
        paddingLeft:10,
        paddingTop:10,
        marginRight: 16 / 2,
        width:200,
        height:40
      },
      dropdownStyle: {
        marginLeft: -10,
        paddingHorizontal: 10 / 2,
        marginVertical: -(10 + 1)
      },
});

export default EditGuard;