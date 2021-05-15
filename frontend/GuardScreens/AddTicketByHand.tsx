import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, View,Image,Button,Platform,Text ,Dimensions,SafeAreaView,StatusBar,ScrollView ,AsyncStorage } from "react-native";
import { AntDesign,Feather,MaterialIcons    } from '@expo/vector-icons'; 
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import styles from '../Style/ListTicketStyle';
import Dropdown from "react-native-modal-dropdown";
import axios from "axios";
import moment from "moment";
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



export default function AddTicketByHand() {
    const [image, setImage] = useState(null); 
    const [code, setcode] =useState(1);
    function SuccessTicketRender(){
        return(
            <ScrollView style={{flex:1, borderBottomColor:"#CCCCCC"}}>
                <View style={{flex:7, marginLeft:5, marginTop:-5}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={styles.namecar}>Bãi đỗ xe Duy Tân 2</Text>
                    </View>
                    
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                            <Text style={styles.textcar}>Ngõ 12, phố Duy Tân, Cầu Giấy, Hà Nội</Text>
                        </View>
                    </View>
                    <View style={{marginTop:10, marginLeft:-15,width:width, alignItems:'center'}}>
                        <Image
                            source={require('../assets/images/su.png')}
                            resizeMode="cover"
                            style={{height:180, width:180}}
                        ></Image>
                    </View>
                    
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <View style={{height:60, backgroundColor:'white',flexDirection:'row', marginTop:10}}>
                            
                            <MaterialButtonViolet
                                onPress={() =>
                                    setcode(1)
                                }   
                                style={styles.accept2}                    
                                title="Tạo vé mới"
                            ></MaterialButtonViolet>
                        </View> 
                    </View>
                    
                </View>
            </ScrollView>
        );
    }
    function AddTicketRender(){
        const availableHours = ["Vé lượt", "Vé ngày" ];
        const availableVihecle = ["Xe máy", "Xe ô tô","Xe đạp" ];
        const [vehicleid, setvehicleid] = useState('');
        const [parkingid, setparkingid] = useState('');
        const [Timeout, setTimeout] = useState('');
        // const [status, setstatus] =useState(1);
        return(
            <ScrollView style={{height:height*0.5, borderBottomColor:"#CCCCCC"}}>
                <View style={{flex:7, marginLeft:5, marginTop:-2}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={styles.namecar}>Bãi đỗ xe Duy Tân 2</Text>
                    </View>
                    
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                            <Text style={styles.textcar}>Ngõ 12, phố Duy Tân, Cầu Giấy, Hà Nội</Text>
                        </View>
                    </View>
                    <View style={{marginTop:10, marginLeft:-15,width:width, alignItems:'center'}}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>TẠO VÉ</Text>
                    </View>
                    <View style={{}}>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center'}}>
                            <Text>Loại vé:  </Text>
                            <Dropdown
                                defaultIndex={0}
                                options={availableHours}
                                style={styles.hoursDropdown}
                                defaultValue={ "Vé lượt"}
                                dropdownStyle={styles.hoursDropdownStyle}
                                
                            />
                        </View>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center'}}>
                            <Text>Loại xe:  </Text>
                            <Dropdown
                                defaultIndex={0}
                                options={availableVihecle}
                                style={styles.hoursDropdown}
                                defaultValue={ "Xe máy"}
                                dropdownStyle={styles.hoursDropdownStyle}
                                
                            />
                        </View>
                        <View style={{marginTop:10}}>
                            <Text>Giá vé: 20.000 đ </Text>
                        </View>
                        <View style={{marginTop:10, flexDirection:'row'}}>
                            <Text>Ngày gửi: {moment().format('DD/MM/YYYY')} </Text>
                            <Text style={{marginLeft:20}}>Giờ vào: {moment().format('hh:mm')} </Text>
                        </View>
                        
                    </View>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                        <View style={{height:60, backgroundColor:'white',flexDirection:'row', marginTop:10}}>
                            <MaterialButtonViolet
                                // onPress={() =>
                                
                                // }   
                                style={styles.accept}                    
                                title="Từ chối"
                            ></MaterialButtonViolet>
                            <MaterialButtonViolet
                                onPress={() => register( 1,2)}  
                                style={styles.accept}                    
                                title="Xác nhận"
                            ></MaterialButtonViolet>
                        </View> 
                    </View>
                    
                </View>
            </ScrollView>
        );
    }
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
        //   alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

    const pickImage = async () => {
        if (code==1){
            let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
            setImage(result.uri);
            }
        }
        else {
            alert("Bạn cần tạo vé mới");
        }
    };
  const register = async( vehicleid: int, parkingid: int) =>{
    var endpoint = '';
    endpoint = 'https://project3na.herokuapp.com/api/guard/transaction/active';
    var today= moment().format('DD/MM/YYYY');
    var now = moment().format('hh:mm');
    var Timeout=`${now} ${today}`;
    
    await axios
    .post(endpoint, {
        vehicleid,
        parkingid,Timeout
        })
    .then(async function (response) {
      // handle success
      setcode(2);
      if(response.data.success) {
        var data = JSON.stringify(response.data.data);
      } else {
      //  alert(response.data.msg);
      }
    })
    .catch(function (error) {
      // handle error
       alert('Tạo vé thất bại');
     //setstatus(3);
    })
    .finally(function () {
    });
  }
  return (
    
    <SafeAreaView  style={styles.container}>
        <StatusBar
            animated={true}
            hidden={true} />
        <View style={{flex:9}}>
            <View style={styles.tabback}>
                <View style={{flex:1, alignItems:'center'}}>
                    <AntDesign name="left" size={24} color="black" />
                </View>
                <View style={{flex:5, alignItems:'center'}}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>Tạo vé xe</Text>
                </View>
                <View style={{flex:1}}>
                </View>
            </View>
            <View style={{marginLeft:20, marginTop:15}}>
                <View style={{height:20, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:16}}>THÔNG TIN XE</Text>
                </View>
                <View style={{ height:150,width:width-40, marginTop:10}}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button title="Pick an image from camer" onPress={pickImage} />
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            
                    </View>
                </View>
            </View>
        </View>
        <View style={styles.modeladd}>      
            {/* {this.addTicketRender()} */}
            {
                code==1 && 
                <AddTicketRender></AddTicketRender>
            }
            {
                code==2 && 
                <SuccessTicketRender></SuccessTicketRender>
            }
            {/* <SuccessTicketRender></SuccessTicketRender> */}
        </View>
    </SafeAreaView>
  );
}
