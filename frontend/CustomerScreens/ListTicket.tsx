import React, { Component,useState  } from "react";
import { StyleSheet, View,Image,Text ,Dimensions,SafeAreaView,StatusBar,ScrollView,useWindowDimensions   } from "react-native";
import { AntDesign,Feather,MaterialIcons  ,MaterialCommunityIcons,Ionicons,Fontisto    } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabView, SceneMap } from 'react-native-tab-view';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { SearchBar } from 'react-native-elements';
//giao diện vé đã thanh toán
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
//   giao diện vé chưa thanh toán
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
                <Text style={styles.namecar}>Bãi đỗ xe Duy Tân 2</Text>
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
    // state = {
    //     search: '',
    //   };
    
    //   updateSearch = (search) => {
    //     this.setState({ search });
    //   };
    // giao diện trang đã thanh toán
    return (
        <View style={styles.profile}>  
            <View style={styles.find}>
                <SearchBar
                    round     
                    placeholder="Tìm kiếm..."
                    
                />
            </View>
            
            <ScrollView style={{height:height-150, borderBottomColor:"#CCCCCC"}}>
                <ItemPayScreen/> 
                <ItemPayScreen/> 
                <ItemPayScreen/> 
                <ItemPayScreen/> 
                <ItemPayScreen/>         
            </ScrollView>
        </View>
    );
  }
  //tham khảo thanh tìm kiếm
//   https://snack.expo.io/embedded/@aboutreact/example-of-search-bar-in-react-native?iframeId=2k48h7eupo&preview=true&platform=ios&theme=dark
  function NoPayScreen() {
    //   giao diện trang chưa thanh toán
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    return (
        <View style={styles.profile}>   
            <View style={styles.find}>
                <SearchBar
                    round     
                    placeholder="Tìm kiếm..."   
                />
            </View>   
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
                    <View style={{margin:10, flexDirection:'row'}}> 
                        <View style={{ marginLeft:20,borderColor:'#CCCCCC', borderWidth:1, borderRadius:20, height:20, width:160, justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#FFCC66'}}>Chưa thanh toán</Text>
                        </View> 
                        <View style={{position:'absolute', right:10}}>
                            <Feather name="map-pin" size={20} color="#00CCFF" style={{ marginLeft:8}}/>
                        </View>
                    </View>
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
                            <View style={{flexDirection:'row'}}>
                                <MaterialCommunityIcons name="qrcode-scan" size={20} color="gray" style={{marginRight:10, marginTop:10}} />
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
                    </ScrollView>
                </View>
            </Modal>
            <ScrollView style={{height:height-100, borderBottomColor:"#CCCCCC"}}>
            <TouchableWithoutFeedback
                onPress={showModal}
            >
                <ItemNoPayScreen/>     
            </TouchableWithoutFeedback>      
            </ScrollView>
        </View>
    );
  }
const Tab = createBottomTabNavigator();


function ListTicket({ navigation: { navigate } }) {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Chưa thanh toán' },
        { key: 'second', title: 'Đã thanh toán' },
    ]);
    const renderScene = SceneMap({
        first: NoPayScreen,
        second: PayScreen,
      });
  return (
    <SafeAreaView  style={styles.container}>
        <StatusBar
        animated={true}
        hidden={true} />
        
      <View style={{height: height-50}}>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: width, height:height-50}}
            />
      </View>
      
        <View style={{height:50, backgroundColor:"gray"}}></View>
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
  find:{
    marginTop:-10,
    marginBottom:10
  },
  modalContainer:{
    margin: 0,
    justifyContent: "flex-end"
  },
  modal:{
    flexDirection: "column",
    height:  height* 0.75,
    padding: 15 ,
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  tabback:{
      height: 50,
      width:width,
      backgroundColor: "#16f198"   ,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row'
  },
  profile:{
      height: height-110,
      width: width,     
      marginTop:10
  },
  image:{
    height:200,
    width:200,
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
