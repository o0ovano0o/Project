import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, StatusBar, ScrollView, TextInput } from "react-native";
import { AntDesign, Feather, Foundation, MaterialIcons, Ionicons, EvilIcons, Fontisto } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import faker from 'faker';
faker.seed(10);
item_img = `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`;
function AddGuard() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>
                    <AntDesign name="left" size={24} color="black" />
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
                        <TextInput style={styles.btn} placeholder="Tên đăng nhập..." value="baove1" />
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <EvilIcons name="user" size={24} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Họ và tên:</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Họ và tên..." value="Nguyễn Văn A" />
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <Fontisto name="date" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Ngày tháng năm sinh:</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Ngày tháng năm sinh..." value="" />
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <Foundation name="telephone" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Số điện thoại:</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Số điện thoại..." value="0123456789" />
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <MaterialIcons name="alternate-email" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Email:</Text>
                        </View>
                        <TextInput style={styles.btn} placeholder="Email..." value="" />
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <Feather name="key" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                            <Text style={{}}>Mật khẩu:</Text>
                        </View>
                    </View>
                    <View style={{ height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <MaterialButtonViolet
                            style={styles.button}
                            title="Cập nhật"
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
    button: {
        height: 40,
        width: 150,
        borderWidth: 1,
        borderColor: "rgba(35,225,142,1)",
        borderRadius: 6,
    }

});

export default AddGuard;
