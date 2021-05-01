import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableHighlight, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
import { AntDesign, Ionicons, Fontisto } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
const { width, height } = Dimensions.get('screen');

const SPACING = 16;
const AVATAR_SIZE = 70;
const BG_IMG = 'https://images.pexels.com/photos/5326901/pexels-photo-5326901.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

function ListParking() {
    const scrollY = React.useRef(new Animated.Value(0)).current;

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
            
            <Image
                source={{ uri: BG_IMG }}
                style={StyleSheet.absoluteFillObject}
                blurRadius={80}
            />
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <AntDesign name="left" size={24} color="gray" />
                </View>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Danh sách bãi gửi xe</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: "flex-end", marginRight: 10, marginTop: 10, marginBottom: 10 }}>
                <Ionicons name="add-circle-outline" size={35} color="black" />
            </View>
            <Animated.FlatList
                data={DATA}
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
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: 20,
                                shadowColor: "#000",
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
                            <View style={{ flex: 4 }}>
                                <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '700', flex: 1 }}>{item.parkingname}</Text>
                                <Text numberOfLines={1} style={{ fontSize: 15, opacity: 0.7, flex: 1 }}>Địa chỉ: {item.address}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text numberOfLines={1} style={{ fontSize: 14, opacity: 0.7, flex: 1, color: '#0099cc' }}>Xe máy: {item.TotalParkingBike.toString()} ô</Text>
                                    <Text numberOfLines={1} style={{ fontSize: 14, opacity: 0.7, flex: 1 , color: '#0099cc'}}>Ô tô: {item.TotalParkingCar.toString() } ô</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                                <AntDesign name='delete' size={25} style={styles.icondelete} />
                            </View>

                        </Animated.View>
                    )
                }}
            />
            <View style={{ height: 50, backgroundColor: "gray" }}></View>

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