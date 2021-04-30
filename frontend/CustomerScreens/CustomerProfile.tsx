import React, { Component } from "react";
import { StyleSheet, View,Text ,Image,Dimensions,SafeAreaView,StatusBar,ScrollView,Button, TouchableHighlight  } from "react-native";
import { AntDesign,Feather,Foundation,MaterialIcons,Ionicons,EvilIcons    } from '@expo/vector-icons';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { AsyncStorage } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
async function getUser() {
    const value = await AsyncStorage.getItem('user');
    if(value)
    return JSON.parse(value);
    else {
      return {
        login: false,
      }
    }
  }
 function CustomerProfile({ navigation })  {
    const [user, setUser] = React.useState('');
    React.useEffect(() => {
      getUser();
    },[]);
    const getUser = async () => {
      let value = await AsyncStorage.getItem('user');
      setUser(JSON.parse(value));
    }

  return (
    <SafeAreaView  style={styles.container}>
        <StatusBar
        animated={true}
        hidden={true} />
      <View style={styles.tabback}>
            {/* <View style={{flex:1, alignItems:'center'}}>
                <AntDesign name="left" size={24} color="gray" />
            </View> */}
            <View style={{flex:5, alignItems:'center'}}>
                <Text style={{fontSize:16, fontWeight:'bold'}}>Trang cá nhân

                </Text>
            </View>
            <View style={{flex:1}}>
            </View>
      </View>
      <View style={styles.profile}>
            <View style={styles.avatar}>
                <View style={{flex:2,justifyContent:'center'}}>
                    <Image
                        source={require('../assets/images/start.png')}
                        resizeMode="cover"
                        style={styles.image}
                    ></Image>
                </View>
                <View style={{flex:4,justifyContent:'center'}}>
                    <Text style={styles.username}>{user.username}</Text>
                </View>

                <TouchableHighlight onPress={()=> navigation.push('EditProfileOwner')} style={{flex:1,justifyContent:'center'}}>
                    <Feather name="edit" size={20} color="gray" style={{position:'absolute', right:10}} />
                </TouchableHighlight>
            </View>
            <ScrollView style={{height:height-120, borderBottomColor:"#CCCCCC"}}>
                <View style={{height:70, borderBottomColor:"#CCCCCC", borderBottomWidth:1}}>
                    <View style={{flexDirection:'row', paddingTop:10, marginBottom:5}}>
                        <EvilIcons name="user" size={24} color="gray" style={{marginRight:10, marginLeft:20}}/>
                        <Text style={{ }}>Địa chỉ:</Text>
                    </View>
                    <Text style={{marginRight:10, marginLeft:20, fontSize:16, fontWeight:'bold'}}>{user.address}</Text>
                </View>
                <View style={{height:70, borderBottomColor:"#CCCCCC", borderBottomWidth:1}}>
                    <View style={{flexDirection:'row', paddingTop:10, marginBottom:5}}>
                        <Foundation name="telephone" size={20} color="gray"  style={{marginRight:10, marginLeft:20}}/>
                        <Text style={{ }}>Số điện thoại:</Text>
                    </View>
                    <Text style={{marginRight:10, marginLeft:20, fontSize:16, fontWeight:'bold'}}>{user.phonenumber}</Text>
                </View>
                <View style={{height:70, borderBottomColor:"#CCCCCC", borderBottomWidth:1}}>
                    <View style={{flexDirection:'row', paddingTop:10, marginBottom:5}}>
                        <MaterialIcons name="alternate-email" size={20} color="gray" style={{marginRight:10, marginLeft:20}} />
                        <Text style={{ }}>Email:</Text>
                    </View>
                    <Text style={{marginRight:10, marginLeft:20, fontSize:16, fontWeight:'bold'}}>{user.email}</Text>
                </View>
                {/* <View style={{height:70, borderBottomColor:"#CCCCCC", borderBottomWidth:1}}>
                    <View style={{flexDirection:'row', paddingTop:10, marginBottom:5}}>
                        <Feather name="key" size={20} color="gray" style={{marginRight:10, marginLeft:20}}/>
                        <Text style={{ }}>Mật khẩu:</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:6}}>
                            <Text style={{marginRight:10, marginLeft:20, fontSize:16, fontWeight:'bold'}}>123456789</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Feather name="eye" size={24} color="gray" style={{position:'absolute', right:10}} />
                            <Feather name="eye-off" size={24} color="gray" style={{position:'absolute', right:10}} />
                        </View>
                    </View>

                </View> */}
                {
                    user.role==0 &&
                    <View style={{height:50, borderColor:"#CCCCCC", borderBottomWidth:1,flexDirection:'row',marginTop:10, borderTopWidth:1}}>
                    <View style={{flex:6,flexDirection:'row', alignItems:'center'}}>
                        <AntDesign name="car" size={20} color="gray" style={{marginRight:10, marginLeft:20}}/>
                        <Text style={{ }}>Danh sách xe:</Text>
                    </View>
                    <TouchableHighlight  onPress={() => navigation.push('ListVehicle')} style={{flex:1, paddingTop:10,position:'absolute', right:5}}>
                        <EvilIcons  name="chevron-right" size={30} color="gray" />
                    </TouchableHighlight>

                </View>
                }

                {
                    user.role==2 &&
                    <View style={{height:50, borderColor:"#CCCCCC", borderBottomWidth:1,flexDirection:'row',marginTop:10, borderTopWidth:1}}>
                    <View style={{flex:6,flexDirection:'row', alignItems:'center'}}>
                        <AntDesign name="car" size={20} color="gray" style={{marginRight:10, marginLeft:20}}/>
                        <Text style={{ }}>Bãi:</Text>
                    </View>
                    <TouchableHighlight  onPress={() => navigation.push('ListGuard')} style={{flex:1, paddingTop:10,position:'absolute', right:5}}>
                        <EvilIcons  name="chevron-right" size={30} color="gray" />
                    </TouchableHighlight>

                </View>
                }

                {
                    user.role==2 &&
                    <View style={{height:50, borderColor:"#CCCCCC", borderBottomWidth:1,flexDirection:'row',marginTop:10, borderTopWidth:1}}>
                    <View style={{flex:6,flexDirection:'row', alignItems:'center'}}>
                        <AntDesign name="car" size={20} color="gray" style={{marginRight:10, marginLeft:20}}/>
                        <Text style={{ }}>Bảo vệ:</Text>
                    </View>
                    <TouchableHighlight  onPress={() => navigation.push('ListGuard')} style={{flex:1, paddingTop:10,position:'absolute', right:5}}>
                        <EvilIcons  name="chevron-right" size={30} color="gray" />
                    </TouchableHighlight>

                </View>
                }

                {
                    user.role==2 &&
                    <View style={{height:50, borderColor:"#CCCCCC", borderBottomWidth:1,flexDirection:'row',marginTop:10, borderTopWidth:1}}>
                    <View style={{flex:6,flexDirection:'row', alignItems:'center'}}>
                        <AntDesign name="car" size={20} color="gray" style={{marginRight:10, marginLeft:20}}/>
                        <Text style={{ }}>Loại vé:</Text>
                    </View>
                    <TouchableHighlight  onPress={() => navigation.push('ListTicketAddNew')} style={{flex:1, paddingTop:10,position:'absolute', right:5}}>
                        <EvilIcons  name="chevron-right" size={30} color="gray" />
                    </TouchableHighlight>

                </View>
                }


                <View style={{height:50, borderColor:"#CCCCCC", borderBottomWidth:1,flexDirection:'row', marginTop:10, borderTopWidth:1}}>
                    <View style={{flex:6,flexDirection:'row', alignItems:'center'}}>
                        <Feather name="help-circle" size={24} color="gray" style={{marginRight:10, marginLeft:20}}/>
                        <Text style={{ }}>Hỗ trợ:</Text>
                    </View>
                    <View style={{flex:1, paddingTop:10,position:'absolute', right:5}}>
                        <EvilIcons name="chevron-right" size={30} color="gray" />
                    </View>
                </View>

            </ScrollView>

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
  avatar:{
    borderBottomWidth:1,
    borderBottomColor:"#CCCCCC",
    justifyContent:"center",
    height:100,
    flexDirection:'row'
  },
  username:{
      fontSize:18
  }

});

export default CustomerProfile ;
