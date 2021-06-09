import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, StatusBar, ScrollView, Button, TouchableHighlight } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { AntDesign, Feather, Foundation, MaterialIcons, SimpleLineIcons, EvilIcons, Ionicons } from '@expo/vector-icons';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { AsyncStorage } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
async function getUser() {
    const value = await AsyncStorage.getItem('user');
    if (value)
        return JSON.parse(value);
    else {
        return {
            login: false,
        }
    }
}
function CustomerProfile({ navigation }) {
    const [user, setUser] = React.useState('');
    React.useEffect(() => {
        getUser();
    }, []);
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }

    const doLogout = () => {
        try {
            AsyncStorage.clear().then(() => {
                navigation.reset({
                    routes: [{ name: "Login" }]
                  });
            });
        } catch (error) {

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Trang cá nhân
                </Text>
                </View>
            </View>
            <View style={styles.profile}>
                <TouchableHighlight onPress={() => navigation.push('EditProfileOwner')}
                    style={{ height: 40, position: 'absolute', right: 10, width: 40, justifyContent: 'center' }}>
                    <Feather name="edit" size={20} color="#222222" style={{ position: 'absolute', right: 10 }} />
                </TouchableHighlight>
                <View style={styles.avatar}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        {
                            user.role == 2 &&
                            <Image
                            source={require('../assets/images/owner.jpg')}
                            resizeMode="cover"
                            style={styles.image}
                        ></Image>
                        }
                        {
                            user.role != 2 &&
                            <Image
                            source={require('../assets/images/ava.jpg')}
                            resizeMode="cover"
                            style={styles.image}
                        ></Image>
                        }
                    </View>
                </View>
                <View style={{ height: 30, marginTop: -5, alignItems: 'center' }}>
                    <Text style={styles.username}>{user.username}</Text>
                </View>


                <ScrollView style={{ height: height - 170, borderBottomColor: "#CCCCCC" }}>
                    <View style={{ height: 70 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <AntDesign name="enviromento"
                                size={22}
                                color="#222222"
                                style={styles.iconstyle} />
                            <Text style={styles.textsize}>Địa chỉ</Text>
                        </View>
                        <Text style={styles.textstyle2}>{user.address}</Text>
                    </View>
                    <View style={{ height: 70 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <SimpleLineIcons name="earphones"
                                size={20}
                                color="#222222"
                                style={styles.iconstyle} />
                            <Text style={styles.textsize}>Số điện thoại</Text>
                        </View>
                        <Text style={styles.textstyle2}>{user.phonenumber}</Text>
                    </View>
                    <View style={{ height: 70 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, marginBottom: 5 }}>
                            <MaterialIcons name="alternate-email" size={20} color="#222222" style={styles.iconstyle} />
                            <Text style={styles.textsize}>Email:</Text>
                        </View>
                        <Text style={styles.textstyle2}>{user.email}</Text>
                    </View>
                    {
                        user.role == 0 &&
                        <View style={{ height: 50, borderColor: "#CCCCCC", borderBottomWidth: 1, flexDirection: 'row', marginTop: 10, borderTopWidth: 1 }}>
                            <View style={{ flex: 6, flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name="car" size={20} color="#222222" style={styles.iconstyle} />
                                <Text style={styles.textsize}>Danh sách xe</Text>
                            </View>
                            <TouchableHighlight onPress={() => navigation.push('ListVehicle')} style={{ flex: 1, paddingTop: 10, position: 'absolute', right: 5 }}>
                                <EvilIcons name="chevron-right" size={30} color="gray" />
                            </TouchableHighlight>

                        </View>
                    }

                    {
                        user.role == 2 &&
                        <View style={{ height: 50, borderColor: "#CCCCCC", borderBottomWidth: 1, flexDirection: 'row', marginTop: 10, borderTopWidth: 1 }}>
                            <View style={{ flex: 6, flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name="car" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                                <Text style={{}}>Bãi:</Text>
                            </View>
                            <TouchableHighlight onPress={() => navigation.push('ListParking')} style={{ flex: 1, paddingTop: 10, position: 'absolute', right: 5 }}>
                                <EvilIcons name="chevron-right" size={30} color="gray" />
                            </TouchableHighlight>

                        </View>
                    }

                    {
                        user.role == 2 &&
                        <View style={{ height: 50, borderColor: "#CCCCCC", borderBottomWidth: 1, flexDirection: 'row', marginTop: 10, borderTopWidth: 1 }}>
                            <View style={{ flex: 6, flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name="car" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                                <Text style={{}}>Bảo vệ:</Text>
                            </View>
                            <TouchableHighlight onPress={() => navigation.push('ListGuard')} style={{ flex: 1, paddingTop: 10, position: 'absolute', right: 5 }}>
                                <EvilIcons name="chevron-right" size={30} color="gray" />
                            </TouchableHighlight>

                        </View>
                    }

                    {
                        user.role == 2 &&
                        <View style={{ height: 50, borderColor: "#CCCCCC", borderBottomWidth: 1, flexDirection: 'row', marginTop: 10, borderTopWidth: 1 }}>
                            <View style={{ flex: 6, flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name="car" size={20} color="gray" style={{ marginRight: 10, marginLeft: 20 }} />
                                <Text style={{}}>Loại vé:</Text>
                            </View>
                            <TouchableHighlight onPress={() => navigation.push('ListTicketType')} style={{ flex: 1, paddingTop: 10, position: 'absolute', right: 5 }}>
                                <EvilIcons name="chevron-right" size={30} color="gray" />
                            </TouchableHighlight>

                        </View>
                    }


                    <View style={{ height: 50, flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flex: 6, flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="md-help-outline" size={20} color="#222222" style={styles.iconstyle} />
                            <Text style={styles.textsize}>Hỗ trợ</Text>
                        </View>
                        <View style={{ flex: 1, paddingTop: 20, position: 'absolute', right: 20 }}>
                            <EvilIcons name="chevron-right" size={30} color="#222222" />
                        </View>
                    </View>
                    <View style={{ height: 60, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{}}>
                            <MaterialButtonViolet
                                onPress={() => doLogout()}
                                style={styles.cancel}
                                title="Đăng xuất"
                            ></MaterialButtonViolet>
                        </View>
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
        backgroundColor: "#16f198"
    },
    cancel: {
        height: 40,
        width: 250,
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
    tabback: {
        height: 50,
        width: width,
        backgroundColor: "#16f198",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    profile: {
        height: height - 100,
        width: width,
    },
    textstyle2: {
        marginRight: 10,
        marginLeft: 60,
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconstyle: {
        marginRight: 10,
        marginLeft: 40
    },
    textsize: {
        fontSize: 16,
        color: "#222222"
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 20,
        marginLeft: 20,
    },
    avatar: {
        justifyContent: "center",
        height: 180,
        alignItems: 'center'
    },
    username: {
        fontSize: 18
    }

});

export default CustomerProfile;
