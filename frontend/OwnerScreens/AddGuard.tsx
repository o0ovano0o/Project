import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, StatusBar, ScrollView, TextInput } from "react-native";
import { AntDesign, Feather, Foundation, MaterialIcons, Ionicons, EvilIcons, Fontisto } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import faker from 'faker';
import Dropdown from "react-native-modal-dropdown";

faker.seed(10);
const item_img = `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`;
function AddGuard() {
    const parkingName = ["Bãi gửi xe Duy Tân", "Bãi gửi xe Cầu Giấy" ];
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <AntDesign name="left" size={24} color="gray" />
                </View>
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
                        <TextInput style={styles.btn} placeholder="Nhập tên đăng nhập..." value="" />
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <EvilIcons name="user" size={24} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Họ và tên:</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Nhập họ và tên..." value="" />
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <Fontisto name="date" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Ngày tháng năm sinh:</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Nhập ngày tháng năm sinh..." value="" />
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <Foundation name="telephone" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Số điện thoại:</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Nhập số điện thoại..." value="" />
                    </View>
                    <View style={{ height: 90, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingLeft: 20 }}>
                        <Text style={{ marginRight: 10, marginBottom: 10, marginTop: 10}}>Bãi gửi xe:  </Text>
                        <Dropdown
                            defaultIndex={0}
                            style={styles.dropdown}
                            options={parkingName}
                            defaultValue={ "Bãi gửi xe Duy Tân"}
                            dropdownStyle={styles.dropdownStyle}
                            
                        />
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <MaterialIcons name="alternate-email" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Email:</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Nhập email..." value="" />
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <Feather name="key" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Mật khẩu:</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 6 }}>
                                <TextInput secureTextEntry={true} style={styles.btn} placeholder="Nhập mật khẩu..." value="" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Feather name="eye" size={24} color="gray" style={{ position: 'absolute', right: 10 }} />
                                <Feather name="eye-off" size={24} color="gray" style={{ position: 'absolute', right: 10 }} />
                            </View>
                        </View>

                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <Feather name="key" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Nhập lại mật khẩu:</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 6 }}>
                                <TextInput secureTextEntry={true} style={styles.btn} placeholder="Nhập lại mật khẩu..." value="" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Feather name="eye" size={24} color="gray" style={{ position: 'absolute', right: 10 }} />
                                <Feather name="eye-off" size={24} color="gray" style={{ position: 'absolute', right: 10 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <MaterialButtonViolet
                            style={styles.buttonAdd}
                            title="Thêm tài khoản"
                        ></MaterialButtonViolet>
                    </View>
                </ScrollView>
                {/* Khoảng cho menubar */}
                <View style={{ height: 50, backgroundColor: "gray" }}></View>
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

export default AddGuard;