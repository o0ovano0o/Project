import React, { Component, useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, StatusBar, ScrollView, TextInput, TouchableHighlight } from "react-native";
import { AntDesign, Feather, Foundation, MaterialIcons, Ionicons, EvilIcons, Fontisto } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { AsyncStorage } from 'react-native';
import axios from "axios";

function EditProfileOwner({ navigation }) {
    const [username, setusername] = useState('');

    const [phonenumber, setphonenumber] = useState('');
    const [address, setaddress] = useState('');
    const [email, setemail] = useState('');
    const [isSelected, setisSelected] = useState(false);
    const [user, setUser] = React.useState('');
    React.useEffect(() => {
        getUser();
    }, []);
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        var user = JSON.parse(value);
        setUser(JSON.parse(value));
        setusername(user.username);

        setphonenumber(user.phonenumber);
        setaddress(user.address);
        setemail(user.email);

    }
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={true} />
                <View style={styles.tabback}>
                    <TouchableHighlight  onPress={() => navigation.push('Root', {screen :"profile"})}   style={{ flex: 1, alignItems: 'center' }}>
                        <AntDesign name="left" size={24} color="gray" />
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
                            source={require('../assets/images/start.png')}
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
                            <TextInput style={styles.btn} placeholder="Nhập tên đăng nhập..."  onChangeText={username => setusername(username)}
                   defaultValue={username} />
                        </View>
                        <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                            <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                                <EvilIcons name="user" size={24} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                                <Text style={{}}>Địa chỉ:</Text>
                            </View>
                            <TextInput style={styles.btn} placeholder="Nhập họ và tên..."                 onChangeText={address => setaddress(address)}
                defaultValue={address} />

                        </View>

                        <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                            <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                                <Foundation name="telephone" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                                <Text style={{}}>Số điện thoại:</Text>
                            </View>
                            <TextInput style={styles.btn} placeholder="Nhập số điện thoại..."  onChangeText={phonenumber => setphonenumber(phonenumber)}
                 keyboardType = 'numeric'
                 defaultValue={phonenumber}/>
                        </View>
                        <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                            <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                                <MaterialIcons name="alternate-email" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                                <Text style={{}}>Email:</Text>
                            </View>
                            <TextInput style={styles.btn} placeholder="Nhập email..." onChangeText={email => setemail(email)}
                defaultValue={email} />
                        </View>

                        <View style={{ height: 60, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ marginRight: 10 }}>
                                <MaterialButtonViolet
                                    onPress={() => navigation.push('Root', {screen :"profile"})}
                                    style={styles.cancel}
                                    title="Hủy bỏ"
                                ></MaterialButtonViolet>
                            </View>

                            <MaterialButtonViolet
                               onPress={() => editProfile(navigation, username,phonenumber,address,email)}
                                style={styles.accept}
                                title="Xác nhận"
                            ></MaterialButtonViolet>
                        </View>
                        <View style={{ height: 60, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <MaterialButtonViolet
                               onPress={() => navigation.push('ChangePassword')}
                                style={styles.change}
                                title="Đổi mật khẩu"
                            ></MaterialButtonViolet>
                    </View>
                    </ScrollView>
                    {/* Khoảng cho menubar */}
                </View>
            </SafeAreaView>
        );
    }


async function editProfile(navigation:any, username: string,phonenumber :string,address: string,email:string) {
    var endpoint = 'https://project3na.herokuapp.com/api/user';
    await axios
    .put(endpoint, {
          username,
          phonenumber,address,email
        })
    .then(async function (response) {
      // handle success
      if(response.data.success) {
        alert('Cập nhật tài khoản thành công');
        var data = JSON.stringify(response.data.data);

        await AsyncStorage.setItem(
            'user',
            data
          );
        navigation.push('Root', {screen :"profile"})
      } else {
        alert(response.data.msg);
      }
    })
    .catch(function (error) {
      // handle error
      alert(error);
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
        change:{
            height: 40,
            width: 160,
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
        accept: {
            height: 40,
            width: 120,
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
        }

    });

    export default EditProfileOwner;
