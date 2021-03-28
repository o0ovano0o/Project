import React, { Component } from "react";
import { StyleSheet, View,Text ,Image,Dimensions,SafeAreaView,StatusBar,ScrollView,TextInput  } from "react-native";
import { AntDesign,Feather,FontAwesome ,MaterialCommunityIcons,Ionicons,Fontisto    } from '@expo/vector-icons'; 
import MaterialButtonViolet from "../components/MaterialButtonViolet";
function Vehicle({ navigation: { navigate } }) {
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
                <Text style={{fontSize:16, fontWeight:'bold'}}>Sửa thông tin xe</Text>
            </View>
            <View style={{flex:1}}>
            </View>
      </View>
      <View style={styles.profile}>
            {/* <View style={{ height:40}}>      
                <Feather name="edit" size={20} color="gray"  style={{position:'absolute', right:10, top:10}}/>   
            </View> */}
            
            <ScrollView style={{height:height-120, borderBottomColor:"#CCCCCC"}}>
                <View style={styles.item}>
                    <View style={{flex:2, justifyContent:'center'}}>
                        <Text style={styles.text}>Tên xe</Text>
                    </View>
                    <TextInput style={styles.btn} placeholder="Nhập tên xe..." value="hhhhhhhhhhhhhhhhhhhhhhhhhhhhh" />
                </View>
                <View style={styles.item}>
                    <View style={{flex:2, justifyContent:'center'}}>
                        <Text style={styles.text}>Loại xe</Text>
                    </View>
                    <TextInput style={styles.btn} placeholder="Nhập loại xe" value="hhhhhhhhhhhhhhhhhhhhhhhhhhhhh" />
                </View>
                <View style={styles.item}>
                    <View style={{flex:2, justifyContent:'center'}}>
                        <Text style={styles.text}>Hãng xe</Text>
                    </View>
                    <TextInput style={styles.btn} placeholder="Nhập tên hãng..." value="hhhhhhhhhhhhhhhhhhhhhhhhhhhhh" />
                </View>  
                <View style={styles.item}>
                    <View style={{flex:2, justifyContent:'center'}}>
                        <Text style={styles.text}>Biển số</Text>
                    </View>
                    <TextInput style={styles.btn} placeholder="Nhập biển số..." value="hhhhhhhhhhhhhhhhhhhhhhhhhhhhh" />
                </View>
                <View style={styles.item}>
                    <View style={{flex:2, justifyContent:'center'}}>
                        <Text style={styles.text}>Màu xe</Text>
                    </View>
                    <TextInput style={styles.btn} placeholder="Nhập màu xe..." value="hhhhhhhhhhhhhhhhhhhhhhhhhhhhh" />
                </View>
                <View style={styles.item}>
                    <View style={{flex:2, justifyContent:'center'}}>
                        <Text style={styles.text}>Mô tả</Text>
                    </View>
                    <TextInput style={styles.btn} 
                    placeholder="Nhập mô tả xe..." value="hhhhhhhhhhhhhhhhhhhh" />
                </View>
                <View style={styles.item}>
                    <View style={{flex:2, justifyContent:'center'}}>
                        <Text style={styles.text}>Số điện thoại</Text>
                    </View>
                    <TextInput style={styles.btn} placeholder="Nhập số điện thoại..." value="hhhhhhhhhhhhhhhhhhhhhhhhhhhhh" />
                </View>
                <View style={{ backgroundColor:'white',justifyContent:'center', marginTop:10, borderColor:'#CCCCCC',  borderBottomWidth:1}}>
                    <View style={{flexDirection:'row'}}>
                        <MaterialCommunityIcons name="qrcode-scan" size={20} color="gray" style={{marginHorizontal:20, marginTop:10}} />
                        <Text style={{fontSize:16, fontWeight:'bold',  marginTop:10,fontFamily:'sans-serif-light'}}>Mã QR</Text>
                    </View>
                    
                    <View style={{justifyContent:'center', alignItems:'center', marginBottom:20, marginTop:10}}>
                        <Image
                        source={require('../assets/images/QRcode.jpg')}
                        resizeMode="cover"
                        style={styles.image}
                        ></Image> 
                    </View>                    
                </View>    
                <View style={{ backgroundColor:'white',justifyContent:'center', marginTop:10, borderBottomColor:'#CCCCCC', borderBottomWidth:1}}>
                    <Text style={{fontSize:16, color:'red',fontFamily:'sans-serif-light', marginHorizontal:20, marginTop:10, marginBottom:10}}>Xóa xe</Text>
                </View> 
                <View style={{height:50, backgroundColor:'white',alignItems:'center',justifyContent:'center', marginTop:10, borderBottomColor:'#CCCCCC', borderBottomWidth:1}}>
                    <MaterialButtonViolet
                        onPress={() =>
                        navigate('Root')
                        }   
                        style={styles.accept}                    
                        title="Xác nhận"
                    ></MaterialButtonViolet>
                </View>                                           
            </ScrollView>
            {/* Khoảng cho menubar */}
            <View style={{height:50, backgroundColor:"gray"}}></View>
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
      backgroundColor: "#EEEEEE"   
  },
  accept:{
    height: 40,
    width: width-20,
    borderWidth: 1,
    borderColor: "rgba(35,225,142,1)",
    borderRadius: 6,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 30,
    shadowOpacity: 0.33,
    shadowRadius: 10,
  },
  image:{
    height:200,
    width:200,
  },
  btn:{
      height:50,
      width:200,
      position:'absolute',
      right:10,
      fontSize:15,
      fontFamily:'sans-serif-light'
  },
  item:{
    backgroundColor:'white',
    flexDirection:'row',
    height:50, 
    borderBottomColor:'#CCCCCC', 
    borderBottomWidth:1
  },
  text:{
    marginLeft:20,
    fontSize:15, 
    fontFamily:'sans-serif-light',
  }
});

export default Vehicle;
