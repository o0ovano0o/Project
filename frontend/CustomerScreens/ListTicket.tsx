import React, { Component } from "react";
import { StyleSheet, View,Text ,Image,Dimensions,SafeAreaView,StatusBar,ScrollView  } from "react-native";
import { AntDesign,Feather,MaterialIcons  ,MaterialCommunityIcons,Ionicons,Fontisto    } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

function ItemPayScreen() {
    return (
        <View style={styles.item}>
        <View style={styles.itemimage}>
            <View style={{flex:6, marginTop:2}}>
                <View style={{ marginLeft:20,borderColor:'#CCCCCC', borderWidth:1, borderRadius:20, height:20, width:160, justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#33CC66'}}>Đã thanh toán</Text>
                </View>
            </View>
            <View style={{flex:1}}>
                <Text style={{position:'absolute', right:15, fontSize:20}}>10$</Text>
            </View>
        </View>
        <View style={{flex:7, marginLeft:5, marginTop:-2}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.namecar}>Bãi đỗ xe Duy Tân</Text>
            </View>
            
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                <Text style={styles.textcar}>Ngõ 12, phố Duy Tân, Cầu Giấy, Hà Nội</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                <MaterialIcons name="date-range" size={20} color="gray" style={{ marginLeft:8}}  />
                <View style={{flex:2}}>
                    <Text style={{marginLeft:5, fontSize:13}}>30/3/2021</Text>
                    <Text style={{marginLeft:5, fontSize:13}}>14:30</Text>
                </View>
                <View style={{flex:1}}>
                    <AntDesign name="arrowright" size={24} color="#CCCCCC" />
                </View>
                <View style={{flex:2}}>
                    <Text style={{marginLeft:5, fontSize:13}}>30/3/2021</Text>
                    <Text style={{marginLeft:5, fontSize:13}}>16:30</Text>
                </View>  
            </View>
        </View>
    </View> 
    );
  }
  function ItemNoPayScreen() {
    return (
        <View style={styles.item}>
        <View style={styles.itemimage}>
            <View style={{flex:6, marginTop:2}}>
                <View style={{ marginLeft:20,borderColor:'#CCCCCC', borderWidth:1, borderRadius:20, height:20, width:160, justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#FFCC66'}}>Chưa thanh toán</Text>
                </View>
            </View>
            <View style={{flex:1}}>
                <Text style={{position:'absolute', right:15, fontSize:20}}>$</Text>
            </View>
        </View>
        <View style={{flex:7, marginLeft:5, marginTop:-2}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.namecar}>Bãi đỗ xe Duy Tân</Text>
            </View>
            
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                <Text style={styles.textcar}>Ngõ 12, phố Duy Tân, Cầu Giấy, Hà Nội</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                <MaterialIcons name="date-range" size={20} color="gray" style={{ marginLeft:8}}  />
                <View style={{flex:2}}>
                    <Text style={{marginLeft:5, fontSize:13}}>30/3/2021</Text>
                    <Text style={{marginLeft:5, fontSize:13}}>14:30</Text>
                </View>
                <View style={{flex:1}}>
                    <AntDesign name="arrowright" size={24} color="#CCCCCC" />
                </View>
                <View style={{flex:2}}>
                    <Text style={{marginLeft:5, fontSize:13}}>30/3/2021</Text>
                    <Text style={{marginLeft:5, fontSize:13}}>16:30</Text>
                </View>  
            </View>
        </View>
    </View>
    );
  }

  function PayScreen() {
    return (
        <View style={styles.profile}>          
            <ScrollView style={{height:height-120, borderBottomColor:"#CCCCCC"}}>
                <ItemPayScreen/> 
                <ItemPayScreen/> 
                <ItemPayScreen/> 
                <ItemPayScreen/> 
                <ItemPayScreen/>         
            </ScrollView>
        </View>
    );
  }
  function NoPayScreen() {
    return (
        <View style={styles.profile}>          
            <ScrollView style={{height:height-120, borderBottomColor:"#CCCCCC"}}>
                <ItemNoPayScreen/>           
            </ScrollView>
        </View>
    );
  }
const Tab = createBottomTabNavigator();


function ListTicket({ navigation: { navigate } }) {
  return (
    <SafeAreaView  style={styles.container}>
        <StatusBar
        animated={true}
        hidden={true} />
        <View style={styles.tabback}>
            <View style={{flex:1, alignItems:'center'}}>
                <AntDesign name="left" size={24} color="gray" />
            </View>
            <View style={{flex:5, alignItems:'center'}}>
                <Text style={{fontSize:16, fontWeight:'bold'}}>Danh sách vé xe</Text>
            </View>
            <View style={{flex:1}}>
            </View>
      </View>
        <Tab.Navigator>
            <Tab.Screen name="ItemNoPayScreen" component={NoPayScreen} />
            <Tab.Screen name="ItemPayScreen" component={PayScreen} />
        </Tab.Navigator>
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
      marginTop:10
  },
  image:{
    height:70,
    width:70,
    borderRadius:70,
    marginLeft:20,   
  },
  item:{
    height:150,
    borderColor:"#CCCCCC", 
    borderWidth:1, 
    borderRadius:20, 
    marginHorizontal:20, 
    marginBottom:10
  },
  itemimage:{
    flex:2, 
    justifyContent:'center', 
    alignItems:'center',
    flexDirection:'row'
  },
  namecar:{
    fontWeight:'bold', 
    fontSize:16, 
    marginTop:10, 
    marginLeft:10
  },
  textcar:{
    fontWeight:'normal', 
    fontSize:12, 
    marginTop:5,
    marginLeft:10,
    color:'gray'
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

export default ListTicket;
