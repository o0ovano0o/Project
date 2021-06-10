import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableHighlight, Easing, SafeAreaViewBase, SafeAreaView, AsyncStorage, Button } from 'react-native';
import { AntDesign, Ionicons, Fontisto } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import axios from 'axios';
const { width, height } = Dimensions.get('screen');

const SPACING = 16;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

function ListParking({ navigation }) {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const [parkings, setParkings] = React.useState([]);
    const [user, setUser] = React.useState('');
    React.useEffect(() => {
        getParking();
        getUser();
    }, []);
    const deleteParking = async (id:any) => {
        await axios
            .delete(`https://project3na.herokuapp.com/api/owner/parking/${id}`)
            .then(async function (response) {
                getParking();
            })
            .catch(function (error) {
            })
            .finally(function () {
            });
    }
    const getParking = async () => {
        await axios
            .get('https://project3na.herokuapp.com/api/owner/parkings')
            .then(async function (response) {
                if (response.data.success) {
                    setParkings(response.data.data);
                }
            })
            .catch(function (error) {
            })
            .finally(function () {
            });
    }
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }
    const DATA = [{
        parkingid: '0',
        parkingname: "Bãi gửi xe Duy Tân",
        address: 'Ngõ 15, Duy Tân, Cầu Giấy, Hà Nội',
        TotalParkingCar: 50,
        TotalParkingBike: 100,
    },
    {
        parkingid: '1',
        parkingname: "Bãi gửi xe Xuân Thủy",
        address: 'Số 144, Xuân Thủy, Cầu Giấy, Hà Nội',
        TotalParkingCar: 50,
        TotalParkingBike: 100,
    }
    ];
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#fff',
            }}>
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <TouchableHighlight onPress={()=> navigation.goBack()} style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableHighlight>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Danh sách bãi gửi xe</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <TouchableOpacity onPress={()=> navigation.push("AddParking")} style={{ flexDirection: 'row', justifyContent: "flex-end", marginRight: 10, marginTop: 10, marginBottom: 10 }}>
                <Ionicons name="add-circle-outline" size={35} color="black" />
            </TouchableOpacity>
            <Animated.FlatList
                data={parkings}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                keyExtractor={item => item.parkingid}
                contentContainerStyle={{
                    padding: SPACING,
                    paddingTop: 20
                }}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 3),
                    ]
                    const opacityInputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 2),
                    ]
                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0]
                    })
                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange: [1, 1, 1, 0]
                    })
                    return (
                        <Animated.View
                            style={{
                                flexDirection: 'row',
                                padding: SPACING,
                                marginBottom: SPACING,
                                backgroundColor: '#f0f0f0',
                                borderRadius: 20,
                                borderColor: 'rgba(120, 122, 122)',
                                shadowColor: "#aaa",
                                shadowOffset: {
                                    width: 0,
                                    height: 10
                                },
                                opacity,
                                shadowOpacity: 0.3,
                                shadowRadius: 20,
                                transform: [{ scale }],
                                alignItems: "center",
                                alignContent: "space-between",
                            }}
                        >
                            <View style={{ flex: 5 }}>
                                <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '700', flex: 1 }}>{item.parkingname}</Text>
                                <Text  style={{ fontSize: 15, opacity: 0.7, flex: 1 }}>Địa chỉ: {item.address}</Text>                  
                                <Text style={{ fontSize: 14, opacity: 0.7, flex: 1, color: '#0099cc' }}>Xe máy: {item.TotalParkingMotoBike ? item.TotalParkingMotoBike : 0} ô</Text>
                                <Text style={{ fontSize: 14, opacity: 0.7, flex: 1 , color: '#0099cc'}}>Ô tô: {item.TotalParkingCar ? item.TotalParkingCar : 0 } ô</Text>
                                <Text  style={{ fontSize: 14, opacity: 0.7, flex: 1 , color: '#0099cc'}}>Xe đạp: {item.TotalParkingBike ? item.TotalParkingBike : 0 } ô</Text>
                            </View>                           
                             <View style={{ flex: 2, justifyContent: "center", alignContent: "center", flexDirection: 'row' }}>                               
                                <View style={{ width: 10 }}></View>
                                <Button
                                    title="Xóa"
                                    color='#FF6347'
                                    onPress={() => deleteParking(item.parkingid)}
                                />
                            </View>
                        </Animated.View>
                    )
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    icondelete: {
        position: 'absolute',
        right: 5,
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
})

export default ListParking;