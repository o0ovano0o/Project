import React, { useState } from "react";
import { StyleSheet, TouchableHighlight, TouchableOpacity , View,Image,Text ,Dimensions,SafeAreaView,StatusBar,ScrollView, RefreshControl, AsyncStorage  } from "react-native";
import { EvilIcons,Feather,MaterialIcons ,MaterialCommunityIcons,FontAwesome5   } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import styles from '../Style/MainScreenGuardStyle';
import axios from "axios";
// import {} from "react-native-gesture-handler";
function MainScreen({ navigation}) {
    const [refreshPage, setRefreshPage] = useState(true);
    const [parking, setParking] = useState({});
    const [user, setUser] = React.useState('');
    React.useEffect(() => {
        getVehicle();
        getUser();
        },[]);
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }
    const getVehicle = async () => {
        await axios
        .get('https://project3na.herokuapp.com/api/guard/parking')
        .then(async function (response) {
            if(response.data.success)
            setParking(response.data.data);
            else alert(response.data.msg)
            setRefreshPage(false);
            alert(JSON.stringify(parking));
        })
        .catch(function (error) {
                alert(error);
        })
        .finally(function () {
        });
    }
    const refresh = () =>{
        setRefreshPage(true);
        getVehicle();
    }
    const goToList = () => {
        navigation.push("ListVehicleInOut");
    }
  return (
    <SafeAreaView  style={styles.container}>
        <StatusBar
        animated={true}
        hidden={true} />
        <ScrollView contentContainerStyle={{flex: 1}} style={{height:height-50}} refreshControl={
                <RefreshControl
                  refreshing={refreshPage}
                  onRefresh={()=>refresh()}
                />}>
            <View style={ styles.backgoundheader}>
                <Image
                    source={require('../assets/images/parking.jpg')}
                    resizeMode="cover"
                    style={styles.imageparking}
                ></Image>
            </View>
            <View style={{flex:3}}>
                <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
                    <Image
                        source={require('../assets/images/gu.jpg')}
                        resizeMode="cover"
                        style={styles.image}
                    ></Image>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{ }}>Bảo vệ: {user.username}</Text>
                        </View>
                        
                    </View>
                </View>
                <View style={{bottom:0, position:'absolute', left:20, }}>
                    <Text style={{fontSize:14,color: "black"}}>ĐIỂM GỬI XE - {parking.parkingname}</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Feather name="map-pin" size={14} color="gray" style={{ }}/>
                        <Text style={styles.textcar}>{parking.address}</Text>
                    </View>
                </View>
            </View>
            <View style={{flex:4}}>
                <View style={styles.box}>
                    <View style={styles.boxmain}>
                        <View style={{  flexDirection:'row',justifyContent:'center', alignItems:'center',
                                        height:40, width:width-60, marginBottom:5,
                                        borderRadius:10, backgroundColor:'#F1EFEF'}}>
                            <MaterialIcons name="attach-money" size={24} color="#00ff40" />
                            <Text style={{marginBottom:5}}>Thu nhập</Text>
                            <Text style={{fontSize:14, marginLeft:30}}>{parking.totalamount}</Text>
                        </View>
                        <View style={{  flexDirection:'row',justifyContent:'center', alignItems:'center',
                                        height:40, width:width-60, marginBottom:5,
                                        borderRadius:10, backgroundColor:'#F1EFEF'}}>
                            <MaterialIcons name="timeline" size={24} color="#0080ff" style={{marginRight:15}} />
                            <Text style={{marginBottom:5}}>Lượt</Text>
                            <Text style={{fontSize:14, marginLeft:30}}>{parking.totalticket}</Text>
                        </View>
                        <View style={{  flexDirection:'row',justifyContent:'center', alignItems:'center',
                                        height:40, width:width-60, marginBottom:5,
                                        borderRadius:10, backgroundColor:"#23A67E"}}>
                            <TouchableOpacity  onPress={() => goToList()} style={{height:40, width:width-60,justifyContent:'center', alignItems:'center',}}>
                                <View style ={{flexDirection:'row',justifyContent:'center', alignItems:'center',}}>
                                    <MaterialCommunityIcons name="ticket-confirmation-outline" size={24} color="white" />
                                    <Text style={{color:'white',fontSize:14, marginLeft:30}}>Xe vào/ra</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{  flexDirection:'row',justifyContent:'center', alignItems:'center',
                                        height:40, width:width-60, marginBottom:5,
                                        borderRadius:10, backgroundColor:"#23A67E"}}>
                            <TouchableOpacity  onPress={() => goToList()} style={{height:40, width:width-60,justifyContent:'center', alignItems:'center',}}>
                                <View style ={{flexDirection:'row',justifyContent:'center', alignItems:'center',}}>
                                    <MaterialIcons name="add-a-photo" size={20} color="white" />
                                    <Text style={{color:'white',fontSize:14, marginLeft:30}}>Tạo vé tay</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {parking.TotalParkingMotoBike &&
                        <TouchableOpacity  onPress={() => goToList()}>
                            <View style={styles.item} key='1'>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{ justifyContent:'center', alignItems:'center'}}>
                                        <View style={{}}>
                                            <MaterialCommunityIcons name="motorbike" size={20} color="#CCCCCC" />
                                        </View>
                                    </View>
                                    <View style={{marginLeft:10, flexDirection:'row'}}>
                                        <Text style={{fontSize:14}}>Xe máy</Text>
                                        <Text style={{fontSize:14, marginLeft:10}}>{parking.UsedPackingMotoBike}/{parking.TotalParkingMotoBike}</Text>
                                    </View>
                                </View>
                            </View> 
                        </TouchableOpacity>}
                          {parking.TotalParkingBike &&
                          <View style={styles.item}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{ justifyContent:'center', alignItems:'center'}}>
                                        <View style={{}}>
                                            <MaterialCommunityIcons name="bike" size={20} color="black" />
                                        </View>
                                    </View>
                                    <View style={{marginLeft:10, flexDirection:'row'}}>
                                        <Text style={{fontSize:14}}>Xe đạp</Text>
                                        <Text style={{fontSize:14, marginLeft:10}}>{parking.UsedPackingBike}/{parking.TotalParkingBike}</Text>
                                    </View>
                                </View>
                          </View>
                        }
                         {parking.TotalParkingCar &&
                          <View style={styles.item}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{ justifyContent:'center', alignItems:'center'}}>
                                        <View style={{}}>
                                            <FontAwesome5 name="car-side" size={20} color="black" />
                                        </View>
                                    </View>
                                    <View style={{marginLeft:10, flexDirection:'row'}}>
                                        <Text style={{fontSize:14}}>Xe ô tô</Text>
                                        <Text style={{fontSize:14, marginLeft:10}}>{parking.UsedPackingCar}/{parking.TotalParkingCar}</Text>
                                    </View>
                                </View>
                          </View>
                        }
                    </View>
                </View>
            </View>

        </ScrollView>


    </SafeAreaView>
  );
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


export default MainScreen;
