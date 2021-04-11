import React from "react";
import { StyleSheet, View,Image,Text ,Dimensions,SafeAreaView,StatusBar,ScrollView  } from "react-native";
import { EvilIcons,Feather,MaterialIcons ,MaterialCommunityIcons,AntDesign   } from '@expo/vector-icons'; 
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import styles from '../Style/MainScreenGuardStyle';
function MainScreen({ navigation: { navigate } }) {
    
  return (
    <SafeAreaView  style={styles.container}>
        <StatusBar
        animated={true}
        hidden={true} />
        <View style={{height:height-50}}>
            <View style={ styles.backgoundheader}></View>
            <View style={{flex:1}}>
                <View style={{justifyContent:'center', alignItems:'center', marginTop:20}}>
                    <Text style={{fontSize:20}}>ĐIỂM GỬI XE DUY TÂN</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                        <Text style={styles.textcar}>Ngõ 12, phố Duy Tân, Cầu Giấy, Hà Nội</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', paddingTop:10, marginBottom:5}}>
                    <EvilIcons name="user" size={24} color="gray" style={{marginRight:10, marginLeft:20}}/>
                    <Text style={{ }}>Bảo vệ: Bùi Trung Hải</Text>
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
                                    <Text style={{fontSize:20}}>10.000.000</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.boxtime}>
                            <View style={{flexDirection:'row'}}>
                                <MaterialIcons name="timeline" size={40} color="#CCCCCC" style={{marginRight:15}} />
                                <View>
                                    <Text style={{marginBottom:5}}>Lượt</Text>
                                    <Text style={{fontSize:20}}>50</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                      <ScrollView style={{flex:1}}>
                          <View style={styles.item}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                                        <View style={styles.circle}>
                                            <MaterialCommunityIcons name="motorbike" size={70} color="#CCCCCC" />
                                        </View>
                                    </View>
                                    <View style={{flex:3}}>
                                        <Text style={{fontSize:20}}>Xe máy</Text>
                                        <Text style={{fontSize:40}}>50/100</Text>
                                    </View>
                                </View>    
                          </View>
                          <View style={styles.item}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                                        <View style={styles.circle}>
                                            <MaterialCommunityIcons name="bike" size={60} color="#CCCCCC" />
                                        </View>
                                    </View>
                                    <View style={{flex:3}}>
                                        <Text style={{fontSize:20}}>Xe đạp</Text>
                                        <Text style={{fontSize:40}}>50/100</Text>
                                    </View>
                                </View>    
                          </View>
                          <View style={styles.item}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                                        <View style={styles.circle}>
                                            <AntDesign name="car" size={65} color="#CCCCCC" />
                                        </View>
                                    </View>
                                    <View style={{flex:3}}>
                                        <Text style={{fontSize:20}}>Xe ô tô</Text>
                                        <Text style={{fontSize:40}}>50/100</Text>
                                    </View>
                                </View>    
                          </View>
                          
                          
                      </ScrollView>  
                    </View>
                </View>
            </View>
            
        </View>
        <View style={{height:50, backgroundColor:"gray"}}></View>
           
    </SafeAreaView>
  );
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


export default MainScreen;
