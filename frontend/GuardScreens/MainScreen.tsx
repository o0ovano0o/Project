import React, { useState } from "react";
import { StyleSheet, TouchableHighlight, TouchableOpacity , View,Image,Text ,Dimensions,SafeAreaView,StatusBar,ScrollView, RefreshControl, AsyncStorage  } from "react-native";
import { EvilIcons,Feather,MaterialIcons ,MaterialCommunityIcons,AntDesign   } from '@expo/vector-icons';
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
            <View style={ styles.backgoundheader}></View>
            <View style={{flex:1}}>
                <View style={{justifyContent:'center', alignItems:'center', marginTop:20}}>
                    <Text style={{fontSize:20}}>ĐIỂM GỬI XE - {parking.parkingname}</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                        <Text style={styles.textcar}>{parking.address}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', paddingTop:10, marginBottom:5}}>
                    <EvilIcons name="user" size={24} color="gray" style={{marginRight:10, marginLeft:20}}/>
                    <Text style={{ }}>Bảo vệ: {user.username}</Text>
                </View>
            </View>
            <View style={{flex:4}}>
                <View style={styles.box}>
                    <View style={styles.boxmain}>
                        <View style={styles.boxprice}>
                            <View style={{flexDirection:'row'}}>
                                <MaterialIcons name="attach-money" size={40} color="#CCCCCC" />
                                <View>
                                    <Text style={{marginBottom:5}}>Thu nhập</Text>
                                    <Text style={{fontSize:20}}>{parking.totalamount}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.boxtime}>
                            <View style={{flexDirection:'row'}}>
                                <MaterialIcons name="timeline" size={40} color="#CCCCCC" style={{marginRight:15}} />
                                <View>
                                    <Text style={{marginBottom:5}}>Lượt</Text>
                                    <Text style={{fontSize:20}}>{parking.totalticket}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                      <ScrollView style={{flex:1}}>
                          {parking.TotalParkingMotoBike &&
                          <TouchableHighlight  onPress={() => goToList()}>
                          <View style={styles.item} key='1'>


                                <View style={{flexDirection:'row'}}>
                                    <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                                    <View
                                    style={styles.circle}

                              ><TouchableHighlight  onPress={() => goToList()}>
                                        {/* <View > */}
                                            <MaterialCommunityIcons name="motorbike" size={70} color="#CCCCCC" />
                                        {/* </View> */}
                                        </TouchableHighlight>
                                        </View>
                                    </View>
                                    <View style={{flex:3}}>
                                        <Text style={{fontSize:20}}>Xe máy</Text>
                                        <Text style={{fontSize:40}}>{parking.UsedPackingMotoBike}/{parking.TotalParkingMotoBike}</Text>
                                    </View>
                                </View>
                          </View> </TouchableHighlight>}
                          {parking.TotalParkingBike &&
                          <View style={styles.item}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                                        <View style={styles.circle}>
                                            <MaterialCommunityIcons name="bike" size={60} color="#CCCCCC" />
                                        </View>
                                    </View>
                                    <View style={{flex:3}}>
                                        <Text style={{fontSize:20}}>Xe đạp</Text>
                                        <Text style={{fontSize:40}}>{parking.UsedPackingBike}/{parking.TotalParkingBike}</Text>
                                    </View>
                                </View>
                          </View>
                        }
                         {parking.TotalParkingCar &&
                          <View style={styles.item}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                                        <View style={styles.circle}>
                                            <AntDesign name="car" size={65} color="#CCCCCC" />
                                        </View>
                                    </View>
                                    <View style={{flex:3}}>
                                        <Text style={{fontSize:20}}>Xe ô tô</Text>
                                        <Text style={{fontSize:40}}>{parking.UsedPackingCar}/{parking.TotalParkingCar}</Text>
                                    </View>
                                </View>
                          </View>
                        }


                      </ScrollView>
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
