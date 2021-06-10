import React, { Component, useCallback, useState } from "react";
import { StyleSheet, View,Text ,Image,Dimensions,SafeAreaView,StatusBar,ScrollView, TouchableHighlight, RefreshControl  } from "react-native";
import { AntDesign,Feather,FontAwesome ,MaterialCommunityIcons,Ionicons,Fontisto    } from '@expo/vector-icons';
import axios from "axios";

function ListVehicle({ navigation }) {
    const [list, setList] = useState(new Array);
    var ListVehicle = new Array();
    const [refreshPage, setRefreshPage] = useState(true);
    var olist = new Array();
    React.useEffect(() => {
        getVehicle();
        },[]);
    const getVehicle = async () => {
        await axios
        .get('https://project3na.herokuapp.com/api/customer/vehicles')
        .then(async function (response) {
            ListVehicle = response.data.data;
            setRefreshPage(false);
            olist = new Array();
            ListVehicle.forEach((element, index) => {
            olist.push(
                <View key={index} style={styles.item}>
                <View style={styles.itemimage}>
                    <View style={styles.circle}>
                    {element.type=='car' &&
                        <FontAwesome name="car" size={40} color="gray" />
                    }
                    {element.type=='motobike' &&
                            <Fontisto name="motorcycle" size={40} color="gray" />
                    }
                    {element.type=='bike' &&
                            <MaterialCommunityIcons name="bike" size={40} color="gray" />
                    }
                    </View>
                </View>
                <View style={{flex:4}}>

                    {element.type=='car' &&
                    <Text style={styles.namecar}>Xe ô tô {element.brand}</Text>
                    }
                    {element.type=='motobike' &&
                    <Text style={styles.namecar}>Xe máy {element.brand}</Text>
                    }
                    {element.type=='bike' &&
                    <Text style={styles.namecar}>Xe đạp {element.brand}</Text>
                    }
                    <Text style={styles.textcar}>Biển số: {element.code}</Text>
                    <Text style={styles.textcar}>Màu xe: {element.color}</Text>
                </View>
                <TouchableHighlight onPress={()=>deleteVehicle(getVehicle,element.vehicleid)} style={{flex:1}}>
                    <AntDesign name="delete" size={20} color="gray" style={styles.icondelete}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>navigation.navigate('Vehicle', {vehicle:element})} style={{flex:1}}>
                    <AntDesign name="arrowright" size={20} color="gray" style={styles.icondelete}/>
                </TouchableHighlight>
            </View>
            )
        });
        setList(olist);
    })
        .catch(function (error) {
                // alert(error);
        })
        .finally(function () {
        });
    }
    const deleteVehicle = async function(callback:any,vehicleid: number) {
        setRefreshPage(true);
        await axios
        .delete(`https://project3na.herokuapp.com/api/customer/vehicle/${vehicleid}`)
        .then(async function (response) {
          // handle success
          setRefreshPage(false);
          getVehicle();
          if(response.data.success) {
            // alert(response.data.msg);
          } else {
            // alert(response.data.msg);
          }
        })
        .catch(function (error) {
          // handle error
        })
        .finally(function () {
        });
      }
    const refresh = () =>{
        setRefreshPage(true);
        getVehicle();
    }
  return (
    <SafeAreaView  style={styles.container}>
        <StatusBar
        animated={true}
        hidden={true} />
      <View style={styles.tabback}>
            <TouchableHighlight  onPress={() => navigation.push('Root', {screen :"profile"})}   style={{flex:1, alignItems:'center'}}>
                <AntDesign name="left" size={24} color="gray" />
            </TouchableHighlight>
            <View style={{flex:5, alignItems:'center'}}>
                <Text style={{fontSize:16, fontWeight:'bold'}}>Danh sách phương tiện</Text>
            </View>
            <View style={{flex:1}}>
            </View>
      </View>
      <View style={styles.profile}>
            <TouchableHighlight onPress={() => navigation.navigate('AddNewVehicle')} style={{ height:40}}>
                <Ionicons name="md-add-sharp" size={30} color="gray"  style={{position:'absolute', right:5}}/>
            </TouchableHighlight>

            <ScrollView
            style={{height:height-120, borderBottomColor:"#CCCCCC"}} refreshControl={
                <RefreshControl
                  refreshing={refreshPage}
                  onRefresh={()=>refresh()}
                />}>

                {list}
                {/* <View style={styles.item}>
                    <View style={styles.itemimage}>
                        <View style={styles.circle}>
                            <FontAwesome name="car" size={40} color="gray" />
                        </View>
                    </View>
                    <View style={{flex:4}}>
                        <Text style={styles.namecar}>Xe ô tô VinFast</Text>
                        <Text style={styles.textcar}>Biển số: 25-36-6969</Text>
                        <Text style={styles.textcar}>Màu xe: đen</Text>
                    </View>
                    <View style={{flex:1}}>
                        <AntDesign name="delete" size={20} color="gray" style={styles.icondelete}/>
                    </View>
                </View>


                <View style={styles.item}>
                    <View style={styles.itemimage}>
                        <View style={styles.circle}>
                            <MaterialCommunityIcons name="bike" size={40} color="gray" />
                        </View>
                    </View>
                    <View style={{flex:4}}>
                        <Text style={styles.namecar}>Xe đạp mini Nhật</Text>
                        <Text style={styles.textcar}>Biển số: </Text>
                        <Text style={styles.textcar}>Màu xe: đỏ</Text>
                    </View>
                    <View style={{flex:1}}>
                        <AntDesign name="delete" size={20} color="gray" style={styles.icondelete}/>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.itemimage}>
                        <View style={styles.circle}>
                            <Fontisto name="motorcycle" size={40} color="gray" />
                        </View>
                    </View>
                    <View style={{flex:4}}>
                        <Text style={styles.namecar}>Xe máy SH</Text>
                        <Text style={styles.textcar}>Biển số: 25-36-6969</Text>
                        <Text style={styles.textcar}>Màu xe: trắng, đỏ</Text>
                    </View>
                    <View style={{flex:1}}>
                        <AntDesign name="delete" size={20} color="gray" style={styles.icondelete}/>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.itemimage}>
                        <View style={styles.circle}>
                            <Fontisto name="motorcycle" size={40} color="gray" />
                        </View>
                    </View>
                    <View style={{flex:4}}>
                        <Text style={styles.namecar}>Xe máy SH</Text>
                        <Text style={styles.textcar}>Biển số: 25-36-6969</Text>
                        <Text style={styles.textcar}>Màu xe: trắng, đỏ</Text>
                    </View>
                    <View style={{flex:1}}>
                        <AntDesign name="delete" size={20} color="gray" style={styles.icondelete}/>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.itemimage}>
                        <View style={styles.circle}>
                            <FontAwesome name="car" size={40} color="gray" />
                        </View>
                    </View>
                    <View style={{flex:4}}>
                        <Text style={styles.namecar}>Xe ô tô VinFast</Text>
                        <Text style={styles.textcar}>Biển số: 25-36-6969</Text>
                        <Text style={styles.textcar}>Màu xe: đen</Text>
                    </View>
                    <View style={{flex:1}}>
                        <AntDesign name="delete" size={20} color="gray" style={styles.icondelete}/>
                    </View>
                </View> */}
            </ScrollView>
            {/* Khoảng cho menubar */}
            {/* <View style={{height:50, backgroundColor:"gray"}}></View> */}
      </View>
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
  tabback:{
      height: 50,
      width:width,
      backgroundColor: "#16f198"   ,
      justifyContent:'center',
      alignItems:'center',
      borderBottomWidth:1,
      borderBottomColor:"#CCCCCC",
      flexDirection:'row'
  },
  profile:{
      height: height-50,
      width: width,
  },
  image:{
    height:70,
    width:70,
    borderRadius:70,
    marginLeft:20,
  },
  item:{
    height:100,
    flexDirection:'row',
    borderColor:"#CCCCCC",
    borderWidth:1,
    borderRadius:20,
    marginHorizontal:20,
    justifyContent:'center' ,
    marginBottom:10
  },
  itemimage:{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
  },
  namecar:{
    fontWeight:'bold',
    fontSize:16,
    marginTop:10,
    marginLeft:10
  },
  textcar:{
    fontWeight:'normal',
    fontSize:14,
    marginTop:5,
    marginLeft:10
  },
  icondelete:{
    position:'absolute',
    right:10,
    top:10
  },
  circle:{
    height:60,
    width:60,
    borderWidth:1,
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'gray'
  }

});

export default ListVehicle;
