import React from "react";
import { StyleSheet, View,Image,Text ,Dimensions,SafeAreaView,StatusBar,ScrollView  } from "react-native";
import { AntDesign,Feather,MaterialIcons    } from '@expo/vector-icons'; 
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import Modal from "react-native-modal";
import styles from '../Style/ListTicketStyle';
function SuccessScreen({ navigation: { navigate } }) {
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
                            <View style={{justifyContent:'center', alignItems:'center'}}>
                                <Text style={styles.namecar}>Bãi đỗ xe Duy Tân 2</Text>
                            </View>
                            
                            <View style={{justifyContent:'center', alignItems:'center'}}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Feather name="map-pin" size={14} color="gray" style={{ marginLeft:8}}/>
                                    <Text style={styles.textcar}>Ngõ 12, phố Duy Tân, Cầu Giấy, Hà Nội</Text>
                                </View>
                            </View>
                            <View style={{justifyContent:'center', alignItems:'center', marginTop:20, marginBottom:20}}>
                                <Image
                                    source={require('../assets/images/su.png')}
                                    resizeMode="cover"
                                    style={{height:250, width:250}}
                                ></Image> 
                            </View>
                            
                            
                            
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                                <View style={{height:60, backgroundColor:'white',flexDirection:'row', marginTop:10}}>
                                    
                                    <MaterialButtonViolet
                                        onPress={() =>
                                        navigate('Root')
                                        }   
                                        style={styles.accept2}                    
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


export default SuccessScreen;
