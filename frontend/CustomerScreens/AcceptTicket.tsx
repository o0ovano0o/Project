import React, { Component,useState  } from "react";
import { StyleSheet, View,Image,Text ,Dimensions,SafeAreaView,StatusBar,ScrollView,useWindowDimensions   } from "react-native";
import { AntDesign,Feather,MaterialIcons  ,MaterialCommunityIcons,Ionicons,Fontisto    } from '@expo/vector-icons'; 
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import Modal from "react-native-modal";
import { SearchBar } from 'react-native-elements';
import styles from '../Style/ListTicketStyle';
function AcceptTicket({ navigation: { navigate } }) {
    const [visible, setVisible] = React.useState(true);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
    <SafeAreaView  style={styles.container}>
        <StatusBar
        animated={true}
        hidden={true} />
        
        <Modal
                isVisible={visible} onDismiss={hideModal}
                useNativeDriver
                style={styles.modalContainer}
                backdropColor={"gray"} 
                onBackButtonPress={hideModal}
                onBackdropPress={hideModal}
                onSwipeComplete={hideModal}    
            >
                <View style={styles.modal}>  
                    
                    <ScrollView style={{height:height*0.5, borderBottomColor:"#CCCCCC"}}>
                        <View style={{flex:7, marginLeft:5, marginTop:-2}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={styles.namecar}>Bãi đỗ xe Duy Tân 2</Text>
                            </View>
                            
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                                <Text style={styles.textcar}>Ngõ 12, phố Duy Tân, Cầu Giấy, Hà Nội</Text>
                            </View>
                            <View style={{marginTop:10, marginLeft:-15,width:width, alignItems:'center'}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>VÉ GỬI XE</Text>
                            </View>
                            <View style={{marginTop:10, marginLeft:5,width:width}}>
                                <Text style={{marginTop:5}}>Biển số: 255-448-789</Text>
                                <Text style={{marginTop:5}}>Loại xe: Xe máy</Text>
                                <Text style={{marginTop:5}}>Màu xe: trắng, đỏ</Text>
                                <Text style={{marginTop:5}}>Mô tả: vết xước dài 10 cm đầu xe</Text>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', marginTop:10}}>
                                <MaterialIcons name="date-range" size={20} color="gray" style={{ marginLeft:5}}  />
                                <View style={{flex:2}}>
                                    <Text style={{marginLeft:5, fontSize:13}}>Giờ vào</Text>
                                    <Text style={{marginLeft:5, fontSize:13}}>30/3/2021</Text>
                                    <Text style={{marginLeft:5, fontSize:13}}>14:30</Text>
                                </View>
                                <View style={{flex:1}}>
                                    <AntDesign name="arrowright" size={24} color="#CCCCCC" />
                                </View>
                                <View style={{flex:2}}>
                                    <Text style={{marginLeft:5, fontSize:13}}>Giờ ra</Text>
                                    <Text style={{marginLeft:5, fontSize:13}}>30/3/2021</Text>
                                    <Text style={{marginLeft:5, fontSize:13}}>16:30</Text>
                                </View>  
                            </View>
                            <View style={{marginTop:10, marginLeft:5,width:width}}>
                                <Text style={{marginTop:5}}>Lưu ý: Quý khách không để đồ cá nhân trên xe khi gửi xe trong bãi</Text>
                            </View>
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                                <View style={{height:60, backgroundColor:'white',flexDirection:'row', marginTop:10}}>
                                    <MaterialButtonViolet
                                        onPress={() =>
                                        navigate('Root')
                                        }   
                                        style={styles.accept}                    
                                        title="Từ chối"
                                    ></MaterialButtonViolet>
                                    <MaterialButtonViolet
                                        onPress={() =>
                                        navigate('Root')
                                        }   
                                        style={styles.accept}                    
                                        title="Xác nhận"
                                    ></MaterialButtonViolet>
                                </View> 
                            </View>
                            
                        </View>
                    </ScrollView>
                </View>
            </Modal>
           
    </SafeAreaView>
  );
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


export default AcceptTicket;
