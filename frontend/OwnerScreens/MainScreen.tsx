import React, { useState } from "react";
import { StyleSheet, TouchableHighlight, TouchableOpacity, View, Image, Text, Dimensions, SafeAreaView, StatusBar, ScrollView, RefreshControl, AsyncStorage } from "react-native";
import { AntDesign, Ionicons, EvilIcons, Feather, MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import axios from "axios";
// import {} from "react-native-gesture-handler";
function MainScreenOwner({ navigation }) {
    const [refreshPage, setRefreshPage] = useState(true);
    const [user, setUser] = React.useState('');
    const [listParking, setListParking] = useState({});
    React.useEffect(() => {
        getListParking();
        getUser();
        },[]);
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }
    const getListParking = async () => {
        await axios
        .get('https://project3na.herokuapp.com/api/owner/parkings')
        .then(async function (response) {
            if(response.data.success)
                setListParking(response.data.data);

            setRefreshPage(false);
        })
        .catch(function (error) {
        })
        .finally(function () {
        });
    }
    const refresh = () =>{
        setRefreshPage(true);
        getListParking();
    }
    const goToList = (pid) => {
        navigation.push("ListVehicleInOut", { data: {
            parkingid: pid
        }});
    }
    const goToAddParking = () => {
        navigation.push("AddParking");
    }
    const goToStatistic = () => {
        navigation.push("Statistic");
    }

    const data = [
            {
            parkingid: '1',
            parkingname: 'Bãi gửi xe Duy Tân',
            address: '15 Duy Tân, Cầu Giấy',
            totalamount: 20000,
            totalticket: 50,
            TotalParkingMotoBike: 50,
            UsedParkingMotoBike: 10,
            TotalParkingBike: 20,
            UsedParkingBike: 5,
            TotalParkingCar: 30,
            UsedParkingCar: 13,
        },
        {
            parkingid: '2',
            parkingname: 'Bãi gửi xe Duy Tân',
            address: '15 Duy Tân, Cầu Giấy',
            totalamount: 20000,
            totalticket: 50,
            TotalParkingMotoBike: 50,
            UsedParkingMotoBike: 10,
            TotalParkingBike: 20,
            UsedParkingBike: 5,
            TotalParkingCar: 30,
            UsedParkingCar: 13,
        },
        {
            parkingid: '3',
            parkingname: 'Bãi gửi xe Duy Tân',
            address: '15 Duy Tân, Cầu Giấy',
            totalamount: 20000,
            totalticket: 50,
            TotalParkingMotoBike: 50,
            UsedParkingMotoBike: 10,
            TotalParkingBike: 20,
            UsedParkingBike: 50,
            TotalParkingCar: 30,
            UsedParkingCar: 13,
        },
        {
            parkingid: '4',
            parkingname: 'Bãi gửi xe Duy Tân',
            address: '15 Duy Tân, Cầu Giấy',
            totalamount: 20000,
            totalticket: 50,
            TotalParkingMotoBike: 50,
            UsedParkingMotoBike: 10,
            TotalParkingBike: 20,
            UsedParkingBike: 5,
            TotalParkingCar: 30,
            UsedParkingCar: 13,
        }
    ]
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                hidden={true} />
            <ScrollView  refreshControl={
                <RefreshControl
                  refreshing={refreshPage}
                  onRefresh={()=>refresh()}
                />}>
                <View style={styles.backgoundheader}>
                    <Image
                        source={require('../assets/images/parking.jpg')}
                        resizeMode="cover"
                        style={styles.imageparking}
                    ></Image>
                </View>
                <View style={{ flex: 4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <Image
                            source={require('../assets/images/gu.jpg')}
                            resizeMode="cover"
                            style={styles.image}
                        ></Image>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{}}>Chủ bãi: {user.username}</Text>
                            </View>

                        </View>
                    </View>

                </View>
                <View style={{ marginTop: 170 }}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ padding: 30 }}>

                            {listParking.length > 0 &&
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                    height: 40, width: width - 60, marginBottom: 5,
                                    borderRadius: 10, backgroundColor: '#F4D03F'
                                }}>
                                    <TouchableOpacity onPress={() => goToStatistic()} style={{ height: 40, width: width - 60, justifyContent: 'center', alignItems: 'center', }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                            <AntDesign name="piechart" size={24} color="white" />

                                            <Text style={{ color: 'white', fontSize: 14, marginLeft: 30 }}>Xem thống kê</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            <View style={{
                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                height: 40, width: width - 60,
                                borderRadius: 10, backgroundColor: "#23A67E"
                            }}>
                                <TouchableOpacity style={{ height: 40, width: width - 60, justifyContent: 'center', alignItems: 'center', }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                        <MaterialIcons name="add-a-photo" size={20} color="white" />
                                        <Text style={{ color: 'white', fontSize: 14, marginLeft: 30 }}>Tạo vé tay</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {listParking.length > 0 ?
                    <View style={{ padding: 10, backgroundColor: "#F1EFEF" }}>
                        <View style={{ backgroundColor: 'white', height: 50, flexDirection: 'row', padding: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Danh sách bãi gửi xe</Text>

                        </View>
                        {listParking.map((item, index) => (
                            <View key={item.parkingid} style={{ backgroundColor: 'white', height: 95, flexDirection: 'row', marginTop: 2, alignItems: 'center' }}>
                                <View style={{ flex: 8, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                    <MaterialCommunityIcons name="car-brake-parking" size={36} color="#23A67E" />
                                    <View style={{ paddingLeft: 10, paddingTop: 5, paddingBottom: 5, flex: 1 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Bãi gửi xe: {item.parkingname}</Text>
                                        <Text numberOfLines={1} style={{ color: 'black' }} >Địa chỉ: {item.address}</Text>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                            <Text style={{ fontSize: 14, opacity: 0.7, color: '#0099cc', marginRight: 20 }}>Xe máy: {item.UsedPackingMotoBike}/{item.TotalParkingMotoBike}</Text>
                                            <Text style={{ fontSize: 14, opacity: 0.7, color: '#0099cc', marginRight: 20  }}>Xe đạp: {item.UsedPackingBike}/{item.TotalParkingBike}</Text>
                                            <Text style={{ fontSize: 14, opacity: 0.7, color: '#0099cc', marginRight: 20  }}>Ô tô: {item.UsedPackingCar}/{item.TotalParkingCar}</Text>

                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity  onPress={() => goToList(item.parkingid)} style={{ flex: 1 }}>
                                    <EvilIcons name="chevron-right" size={30} color="gray" />
                                </TouchableOpacity>

                            </View>
                        ))}
                    </View>
                    :
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -10 }}>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                            height: 40, width: width - 60, marginBottom: 5,
                            borderRadius: 10, backgroundColor: '#F4D03F'
                        }}>
                            <TouchableOpacity onPress={ () => goToAddParking()} style={{ height: 40, width: width - 60, justifyContent: 'center', alignItems: 'center', }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <MaterialCommunityIcons name="car-brake-parking" size={24} color="white" />

                                    <Text style={{ color: 'white', fontSize: 14, marginLeft: 30 }}>Thêm bãi gửi xe</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </ScrollView>


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
    image: {
        height: 50,
        width: 50,
        borderRadius: 40,
        marginLeft: 20,
        marginRight:10
    },
    imageparking: {
        height: height/3,
        width: width,
    },
    backgoundheader:{
        height:height/3,
        position:'absolute',
        backgroundColor:"#16f198",
        width:width,
    }



});
export default MainScreenOwner;
