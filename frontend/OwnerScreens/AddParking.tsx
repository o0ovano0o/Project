import React, { useState, Component, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, SafeAreaView, StatusBar, ScrollView, TextInput, TouchableHighlight, Alert } from "react-native";
import { AntDesign, Feather, Foundation, MaterialIcons, Ionicons, EvilIcons, Fontisto } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import axios from "axios";
function timeInput() {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [chosenTime, setChosenTime] = useState('00:00');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setChosenTime(moment(date).format('HH:mm'));
        hideDatePicker();
    };
    return {
        chosenTime,
        isDatePickerVisible,
        showDatePicker,
        handleConfirm,
        hideDatePicker
    }
}

function AddParking(props) {
    const inputOpenTime = timeInput();
    const inputCloseTime = timeInput();
    const [parkingname, setparkingname] = useState('');
    const [TotalParkingCar, setTotalParkingCar] = useState('');
    const [TotalParkingBike, setTotalParkingBike] = useState('');
    const [TotalParkingMotoBike, setTotalParkingMotoBike] = useState('');
    const [address, setaddress] = useState('');
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [description, setdescription] = useState('');
    const [region, setRegion] = useState({
        latitude:0,
        longitude:0,
        latitudeDelta: 0.0122,
                longitudeDelta: 0.0121,
    });
    const [getaddress, setgetAddress] = useState('');
    React.useEffect(() => {
        getData();
      },[]);

    const register = async () => {
        let endpoint = 'https://project3na.herokuapp.com/api/owner/parking';
          await axios
          .post(endpoint, {
                parkingname,
                TotalParkingCar:parseInt(TotalParkingCar),
                TotalParkingBike:parseInt(TotalParkingBike),
                TotalParkingMotoBike: parseInt(TotalParkingMotoBike),
                address,latitude,longitude,description
              })
          .then(async function (response) {
            Alert.alert('Th??ng b??o',response.data.msg)
            if(response.data.success) {
              props.navigation.push("ListParking");
            } else {
            }
          })
          .catch(function (error) {
          })
          .finally(function () {
          });
        }
    const getData = () =>{
        if(!props?.route?.params) return;
        if(props?.route.params.data?.obj) {
            setparkingname(props?.route.params.data?.obj.parkingname);
            setTotalParkingCar(props?.route.params.data?.obj.TotalParkingCar);
            setTotalParkingBike(props?.route.params.data?.obj.TotalParkingBike);
            setTotalParkingMotoBike(props?.route.params.data?.obj.TotalParkingMotoBike);
            setdescription(props?.route.params.data?.obj.description);
        }
        if(props?.route.params.data?.region) {
            setlatitude(props.route.params.data.region.latitude);
            setlongitude(props.route.params.data.region.longitude);
            setRegion(props.route.params.data.region);
        }
        if(props?.route.params.data?.address) {
            setaddress(props.route.params.data.address);
        }
      }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <TouchableOpacity onPress={()=> props.navigation.push("ListParking")} style={{ flex: 1, alignItems: 'center' }}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Th??m b??i g???i xe</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <View style={styles.profile}>
                <ScrollView style={{ height: height - 120, borderBottomColor: "#CCCCCC" }}>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 5 }}>T??n b??i g???i xe</Text>
                        <TextInput placeholder="Nh???p t??n b??i g???i xe"
                            onChangeText={parkingname => setparkingname(parkingname)}
                            defaultValue={parkingname}
                        ></TextInput>
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 10 }}>S??? ?? g???i xe</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5, flex: 1 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5, flex: 1 }}>
                                <Text>?? t??: </Text>
                                <TextInput keyboardType="numeric"
                                        onChangeText={TotalParkingCar => setTotalParkingCar(TotalParkingCar)}
                                        defaultValue={TotalParkingCar}></TextInput>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5, flex: 1 }}>
                                <Text>Xe m??y: </Text>
                                <TextInput keyboardType="numeric"
                                        onChangeText={TotalParkingMotoBike => setTotalParkingMotoBike(TotalParkingMotoBike)}
                                        defaultValue={TotalParkingMotoBike}></TextInput>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5, flex: 1 }}>
                                <Text>Xe ?????p: </Text>
                                <TextInput keyboardType="numeric"
                                        onChangeText={TotalParkingBike => setTotalParkingBike(TotalParkingBike)}
                                        defaultValue={TotalParkingBike}></TextInput>
                            </View>
                        </View>

                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 5 }}>Gi??? m???</Text>
                        <TouchableHighlight onPress={inputOpenTime.showDatePicker} underlayColor='white' style={{ backgroundColor: 'white', marginTop: 10 }}>
                            <Text style={{ color: 'black' }}>{inputOpenTime.chosenTime} </Text>
                        </TouchableHighlight>
                        {inputOpenTime.isDatePickerVisible && (
                            <DateTimePickerModal
                                isVisible={inputOpenTime.isDatePickerVisible}
                                mode="time"
                                onConfirm={inputOpenTime.handleConfirm}
                                onCancel={inputOpenTime.hideDatePicker}
                            />
                        )}
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 5 }}>Gi??? ????ng</Text>
                        <TouchableHighlight onPress={inputCloseTime.showDatePicker} underlayColor='white' style={{ backgroundColor: 'white', marginTop: 10 }}>
                            <Text style={{ color: 'black' }}>{inputCloseTime.chosenTime} </Text>
                        </TouchableHighlight>
                        {inputCloseTime.isDatePickerVisible && (
                            <DateTimePickerModal
                                isVisible={inputCloseTime.isDatePickerVisible}
                                mode="time"
                                onConfirm={inputCloseTime.handleConfirm}
                                onCancel={inputCloseTime.hideDatePicker}
                            />
                        )}
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                        <Text style={{ marginBottom: 5 }}>M?? t???:</Text>
                        <TextInput placeholder="Nh???p m?? t??? b??i g???i xe"
                            onChangeText={description => setdescription(description)}
                            defaultValue={description}
                        ></TextInput>
                    </View>
                    <View style={{ height: 70, borderBottomColor: "#CCCCCC", borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>

                            <Text style={{ marginBottom: 5 }}>Gi??p ?????a ch??? ???????c ch??nh x??c nh???t:</Text>
                            <View style={{flexDirection:'row'}}>
                                <Ionicons name="location-sharp" size={20} color="red" />
                                <TextInput placeholder="?????a ch??? c??? th???"
                                    onChangeText={address => setaddress(getaddress)}
                                    defaultValue={address}
                                ></TextInput>
                            </View>
                    </View>
                    <View style={{ height: 50, borderBottomColor: "#CCCCCC",backgroundColor:'#CCCCCC', borderBottomWidth: 1, paddingTop: 10, paddingLeft: 20 }}>
                            <TouchableOpacity style={{flex:1, flexDirection:'row'}} onPress={() =>
                                                    props.navigation.push('FindAddress',{
                                                        data: {
                                                            parkingname,
                                                            TotalParkingCar,
                                                            TotalParkingBike,
                                                            TotalParkingMotoBike,

                                                            description
                                                        }
                                                    })
                                                    }>
                                                        <Ionicons name="search" size={30} color="green" />
                                                        <Text style={{lineHeight:30}}>T??m ?????a ch??? tr??n map</Text>
                        </TouchableOpacity>
                        </View>
                    <View style={{ height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <MaterialButtonViolet
                            onPress={() => register()}
                            style={styles.button}
                            title="Th??m b??i g???i xe"
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
        elevation: 30,
        shadowOpacity: 0.33,
        shadowRadius: 10,
        backgroundColor: 'red'
    },
    button: {
        height: 40,
        width: 250,
        borderWidth: 1,
        borderColor: "rgba(35,225,142,1)",
        borderRadius: 6,
    }

});

export default AddParking;
