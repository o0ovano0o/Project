import React, { Component, useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, StatusBar, ScrollView, TextInput, TouchableHighlight } from "react-native";
import { AntDesign, Feather, Foundation, MaterialIcons, Ionicons, EvilIcons, Fontisto } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { AsyncStorage } from 'react-native';
import axios from "axios";

function ChangePassword({ navigation }) {
    const [password, setpassword] = useState('');
    const [repassword, setrepassword] = useState('');
    const [user, setUser] = React.useState('');
    React.useEffect(() => {
        getUser();
    }, []);
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        var user = JSON.parse(value);
        setUser(JSON.parse(value));
    }
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={true} />
                <View style={styles.tabback}>
                    <TouchableHighlight  onPress={() => navigation.push("EditProfileOwner")}   style={{ flex: 1, alignItems: 'center' }}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableHighlight>
                    <View style={{ flex: 5, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Đổi mật khẩu</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                    </View>
                </View>
                <View style={styles.profile}>
                    <View style={styles.avatar}>
                        <Image
                            source={require('../assets/images/ava.jpg')}
                            resizeMode="cover"
                            style={styles.image}
                        ></Image>
                    </View>
                    <ScrollView style={{ height: height - 120, borderBottomColor: "#CCCCCC" }}>

                        <View style={{ height: 70 }}>
                            <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                                <Feather name="key" size={20} color="#222222" style={styles.iconstyle} />
                                <Text style={styles.textsize}>Mật khẩu</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 6 }}>
                                    <TextInput secureTextEntry={true} style={styles.btn} placeholder="Nhập mật khẩu..."  onChangeText={password => setpassword(password)}
                  defaultValue={password} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Feather name="eye" size={20} color="#222222" style={{ position: 'absolute', right: 30 }} />
                                    <Feather name="eye-off" size={20} color="#222222" style={{ position: 'absolute', right: 30 }} />
                                </View>
                            </View>

                        </View>
                        <View style={{ height: 70}}>
                            <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                                <Feather name="key" size={20} color="#222222" style={styles.iconstyle} />
                                <Text style={styles.textsize}>Nhập lại mật khẩu</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 6 }}>
                                    <TextInput secureTextEntry={true} style={styles.btn} placeholder="Nhập lại mật khẩu..." onChangeText={repassword => setrepassword(repassword)}
                 defaultValue={repassword}  />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Feather name="eye" size={20} color="#222222" style={{ position: 'absolute', right: 30 }} />
                                    <Feather name="eye-off" size={20} color="#222222" style={{ position: 'absolute', right: 30 }} />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop:20,height: 60, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ marginRight: 10 }}>
                                <MaterialButtonViolet
                                    onPress={() => navigation.push('Root', {screen :"profile"})}
                                    style={styles.cancel}
                                    title="Hủy bỏ"
                                ></MaterialButtonViolet>
                            </View>

                            <MaterialButtonViolet
                               onPress={() => editPassword(navigation, password,repassword)}
                                style={styles.accept}
                                title="Xác nhận"
                            ></MaterialButtonViolet>
                        </View>
                    </ScrollView>
                    {/* Khoảng cho menubar */}

                </View>
            </SafeAreaView>
        );
    }


async function editPassword(navigation:any,  password: string,repassword :string) {
    var endpoint = 'https://project3na.herokuapp.com/api/user';
    if(password != repassword) {
      return alert('Mật khẩu không khớp. Vui lòng nhập lại.');
    }
    await axios
    .put(endpoint, {

          password,

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
            backgroundColor: "#16f198"
        },
        iconstyle:{
            marginRight: 10, 
            marginLeft: 40
        },
        textsize:{
            fontSize:16,
            color:"#222222"
        },
        tabback: {
            height: 50,
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        },
        profile: {
            height: height - 50,
            width: width,
        },
        image: {
            height: 150,
            width: 150,
            borderRadius: 20,
            marginLeft: 20,
        },
        avatar: {
            justifyContent: "center",
            height: 200,
            alignItems: 'center'
        },
        username: {
            fontSize: 18
        },
        btn: {
            height: 30,
            width: 200,
            marginLeft: 60
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
            //elevation: 30,
            shadowOpacity: 0.33,
            shadowRadius: 10,
            backgroundColor: 'red'
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
            //elevation: 30,
            shadowOpacity: 0.33,
            shadowRadius: 10,
        }

    });

    export default ChangePassword;
