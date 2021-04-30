import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableHighlight, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
import { AntDesign, Ionicons, Fontisto } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
const { width, height } = Dimensions.get('screen');

const SPACING = 16;
const AVATAR_SIZE = 70;
const BG_IMG = 'https://images.pexels.com/photos/5326901/pexels-photo-5326901.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

function ListGuard() {
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const DATA = [{
        id: '0',
        ticketTypeName: "Vé ngày cho xe máy",
        vehicleType: "Xe máy",
        cost: "20000",
        timeUnit: "Ngày",
        parkingName: "Bãi gửi xe Duy Tân"
    },
    {
        id: '1',
        ticketTypeName: "Vé ngày cho ô tô",
        vehicleType: "Ô tô",
        cost: "50000",
        timeUnit: "Ngày",
        parkingName: "Bãi gửi xe Duy Tân"
    },
    {
        id: '2',
        ticketTypeName: "Vé giờ cho xe máy",
        vehicleType: "Xe máy",
        cost: "5000",
        timeUnit: "Giờ",
        parkingName: "Bãi gửi xe Duy Tân"
    }
    ];

    const vehicleTYpe = ["Ô tô", "Xe máy"];
    const timeUnit = ["Giờ", "Ngày"];

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
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Danh sách loại vé</Text>
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
                keyExtractor={item => item.id}
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
                                <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '700', flex: 1 }}>{item.ticketTypeName}</Text>
                                <Text numberOfLines={1} style={{ fontSize: 14, opacity: 0.7, flex: 1 }}>Bãi gửi xe: {item.parkingName}</Text>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text numberOfLines={1} style={{ fontSize: 13, opacity: 0.7, flex: 1 }}>Loại xe: {item.vehicleType.toString()}</Text>
                                    <Text numberOfLines={1} style={{ fontSize: 13, opacity: 0.7, flex: 1, color: '#0099cc' }}>Giá vé: {item.cost.toString() + "/" + item.timeUnit.toString()}</Text>
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

export default ListGuard;