import React, { Component } from "react";
import { StyleSheet, View,Text ,Image,Dimensions,SafeAreaView,StatusBar,ScrollView  } from "react-native";
import { AntDesign,Feather,FontAwesome ,MaterialCommunityIcons,Ionicons,Fontisto    } from '@expo/vector-icons'; 

function ListVehicle({ navigation: { navigate } }) {
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
                <Text style={{fontSize:16, fontWeight:'bold'}}>Danh sách phương tiện</Text>
            </View>
            <View style={{flex:1}}>
            </View>
      </View>
      <View style={styles.profile}>
            <View style={{ height:40}}>
                <Ionicons name="md-add-sharp" size={30} color="gray"  style={{position:'absolute', right:5}}/>   
            </View>
            
            <ScrollView style={{height:height-120, borderBottomColor:"#CCCCCC"}}>
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
