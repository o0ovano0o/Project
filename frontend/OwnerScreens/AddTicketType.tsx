import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, StatusBar, ScrollView, TextInput } from "react-native";
import { AntDesign, Feather, Foundation, MaterialIcons, Ionicons, EvilIcons, Fontisto } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import Dropdown from "react-native-modal-dropdown";

function AddTicketType() {
    const parkingName = ["Bãi gửi xe Duy Tân", "Bãi gửi xe Cầu Giấy"];
    const vehicle = ["Xe máy", "Ô tô"];
    const timeUnit = ["Giờ", "Ngày"];
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
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Thêm loại vé</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <View>
                <ScrollView style={{ height: height - 120, borderBottomColor: "#CCCCCC" }}>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 5 }}>Tên loại vé:</Text>
                        <TextInput placeholder="Nhập tên loại vé" value="Vé gửi xe ô tô theo ngày"></TextInput>
                    </View>

                    <View style={{ height: 90, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingLeft: 20 }}>
                        <Text style={{ marginRight: 10, marginBottom: 10, marginTop: 10 }}>Bãi gửi xe:  </Text>
                        <Dropdown
                            defaultIndex={0}
                            style={styles.dropdownParkingName}
                            options={parkingName}
                            defaultValue={"Bãi gửi xe Duy Tân"}
                            dropdownStyle={styles.dropdownStyle}

                        />
                    </View>

                    <View style={{ height: 90, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20, paddingRight: 20 }}>
                        <Text>Giá vé: </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TextInput style={{ fontSize: 18 }} keyboardType="numeric" value="20000"></TextInput>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 25 }}>/ </Text>

                                <Dropdown
                                    defaultIndex={0}
                                    style={styles.dropdownTimeUnit}
                                    options={timeUnit}
                                    defaultValue={"Giờ"}
                                    dropdownStyle={styles.dropdownStyle}

                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 90, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingLeft: 20 }}>
                        <Text style={{ marginRight: 10, marginBottom: 10, marginTop: 10 }}>Loại xe:  </Text>
                        <Dropdown
                            defaultIndex={0}
                            style={styles.dropdownTimeUnit}
                            options={vehicle}
                            defaultValue={"Xe máy"}
                            dropdownStyle={styles.dropdownStyle}

                        />
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 5 }}>Mô tả:</Text>
                        <TextInput placeholder="Nhập mô tả..." value=""></TextInput>
                    </View>


                    <View style={{ height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <MaterialButtonViolet
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