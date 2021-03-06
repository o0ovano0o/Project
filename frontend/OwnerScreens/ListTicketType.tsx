import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableHighlight, Easing, SafeAreaViewBase, SafeAreaView, AsyncStorage, Button } from 'react-native';
import { AntDesign, Ionicons, Fontisto, FontAwesome } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import axios from 'axios';
import styles1 from '../Style/ListTicketAddNew';
import { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');

const SPACING = 16;
const AVATAR_SIZE = 70;
const BG_IMG = 'https://images.pexels.com/photos/5326901/pexels-photo-5326901.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

function ListTicketType({ navigation }) {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const [refreshPage, setRefreshPage] = useState(true);
    const [tickets, settickets] = useState([]);
    const [total, settotal] = useState(0);
    const [visiable, setCount] = React.useState(0);
    const [user, setUser] = React.useState('');
    React.useEffect(() => {
        getTicket();
        getUser();
    }, []);
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }
    const deleteTicket = async (id:any) => {
        await axios
            .delete(`https://project3na.herokuapp.com/api/owner/ticket/${id}`)
            .then(async function (response) {
                setRefreshPage(false);
                getTicket();
            })
            .catch(function (error) {
            })
            .finally(function () {
            });
    }
    const getTicket = async () => {
        await axios
            .get('https://project3na.herokuapp.com/api/owner/tickets')
            .then(async function (response) {
                if (response.data.success) {
                    settickets(response.data.data);
                    settotal(response.data.data.length);
                }
                setRefreshPage(false);

            })
            .catch(function (error) {
                setRefreshPage(false);
            })
            .finally(function () {
            });
    }
    const refresh = () => {
        setRefreshPage(true);
        getTicket();
    }
    const openModel = (item: any) => {
        setCount(1);
    }
    const DATA = [{
        id: '0',
        ticketTypeName: "V?? ng??y cho xe m??y",
        vehicleType: "Xe m??y",
        cost: "20000",
        timeUnit: "Ng??y",
        parkingName: "B??i g???i xe Duy T??n"
    },
    {
        id: '1',
        ticketTypeName: "V?? ng??y cho ?? t??",
        vehicleType: "?? t??",
        cost: "50000",
        timeUnit: "Ng??y",
        parkingName: "B??i g???i xe Duy T??n"
    },
    {
        id: '2',
        ticketTypeName: "V?? gi??? cho xe m??y",
        vehicleType: "Xe m??y",
        cost: "5000",
        timeUnit: "Gi???",
        parkingName: "B??i g???i xe Duy T??n"
    }
    ];

    const vehicleTYpe = ["?? t??", "Xe m??y"];
    const timeUnit = ["Gi???", "Ng??y"];

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
                <TouchableOpacity onPress={() => navigation.push('CustomerProfile')}  style={{ flex: 1, marginLeft: 10, alignItems: 'center', justifyContent:'center' }}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Danh s??ch lo???i v??</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.push('AddTicketType')} style={{ flexDirection: 'row', justifyContent: "flex-end", marginRight: 10, marginTop: 10, marginBottom: 10 }}>
                <Ionicons name="add-circle-outline" size={35} color="black" />
            </TouchableOpacity>
            <Animated.FlatList
                data={tickets}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                keyExtractor={item => item.ticketid}
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
                            <View style={{ flex: 4, flexDirection: "row" }}>
                                <View style={styles1.itemimage}>
                                    <View style={styles1.circle}>
                                        {
                                            item.typeverhicle == 'car' && <FontAwesome name="car" size={40} color="gray" />
                                        }
                                        {
                                            item.typeverhicle == 'bike' && <MaterialCommunityIcons name="bike" size={40} color="gray" />
                                        }
                                        {
                                            item.typeverhicle == 'motobike' && <Fontisto name="motorcycle" size={40} color="gray" />
                                        }
                                    </View>
                                </View>
                                <View style={{ flex: 5, marginLeft: 15 }}>
                                    <Text numberOfLines={1} style={{ fontSize: 19, fontWeight: '700', flex: 1 }}>{item.name}</Text>

                                    {item.typetime == 0 &&
                                        <Text >V?? theo: l?????t</Text>
                                    }
                                    {item.typetime == 1 &&
                                        <Text >V?? theo: ng??y</Text>
                                    }
                                    {item.typetime == 2 &&
                                        <Text >V?? theo: gi???</Text>
                                    }

                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ flex: 1 }}>M?? t???: {item.drescription}</Text>
                                        {/* <Text numberOfLines={1} style={{ fontSize: 13, opacity: 0.7, flex: 1 }}>Lo???i xe: {item.vehicleType.toString()}</Text> */}
                                        <Text style={{ fontSize: 16, opacity: 0.7, flex: 1, color: '#0099cc' }}>Gi?? v??: {item.price}</Text>
                                    </View>
                                </View>


                            </View>
                            <View style={{ flex: 2, justifyContent: "center", alignContent: "center", flexDirection: 'row' }}>
                                <Button
                                    title="S???a"

                                    color='#FFD700'
                                    onPress={() => navigation.push("EditTicketType", { data: item})}
                                />
                                <View style={{ width: 10 }}></View>
                                <Button
                                    title="X??a"
                                    color='#FF6347'
                                    onPress={() => deleteTicket(item.ticketid)}
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

export default ListTicketType;