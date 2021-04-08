import React from "react";
import { StyleSheet, View,Image,Text ,Dimensions,SafeAreaView,StatusBar,ScrollView  } from "react-native";
import { AntDesign,Feather,MaterialIcons    } from '@expo/vector-icons'; 
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import styles from '../Style/ListTicketStyle';
import Dropdown from "react-native-modal-dropdown";
export default class Map extends React.Component{
    addTicketRender(){
        const availableHours = ["Vé lượt", "Vé ngày" ];
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
                        <View style={{marginTop:10}}>
                            <Text>Giá vé: 20.000 đ </Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text>Ngày gửi: 9/4/2021 </Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text>Giờ vào: 19h </Text>
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
                                // onPress={() =>
                                
                                // }   
                                style={styles.accept}                    
                                title="Xác nhận"
                            ></MaterialButtonViolet>
                        </View> 
                    </View>
                    
                </View>
            </ScrollView>
        );
    }
    successTicketRender(){
        const availableHours = ["Vé lượt", "Vé ngày" ];
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
                                // onPress={() =>
                                
                                // }   
                                style={styles.accept2}                    
                                title="Tạo vé mới"
                            ></MaterialButtonViolet>
                        </View> 
                    </View>
                    
                </View>
            </ScrollView>
        );
    }
    render(){   
        return (
            <SafeAreaView  style={styles.container}>
                <StatusBar
                animated={true}
                hidden={true} />
                <View style={{flex:9}}>
                    <View style={styles.tabback}>
                        <View style={{flex:1, alignItems:'center'}}>
                            <AntDesign name="left" size={24} color="gray" />
                        </View>
                        <View style={{flex:5, alignItems:'center'}}>
                            <Text style={{fontSize:16, fontWeight:'bold'}}>Tạo vé xe</Text>
                        </View>
                        <View style={{flex:1}}>
                        </View>
                    </View>
                    <View style={{marginLeft:20, marginTop:15}}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:16}}>THÔNG TIN XE</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text>Chủ xe: Đỗ Minh Anh </Text>
                        </View>                        
                        <View style={{marginTop:10}}>
                            <Text>Biển số: 666-8997-888 </Text>
                        </View>
                        <View style={{marginTop:10, flexDirection:'row'}}>
                            <Text>Hãng: Honda</Text>
                            <Text style={{marginLeft:20}}>Loại xe: Xe máy </Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text>Màu xe: trắng pha đỏ </Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text>Mô tả: Vết xước 10 cm đầu xe </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.modeladd}>      
                    {this.successTicketRender()}
                </View>
                <View style={{height:50, backgroundColor:"gray"}}></View>
                
            </SafeAreaView>
        );
    }
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height