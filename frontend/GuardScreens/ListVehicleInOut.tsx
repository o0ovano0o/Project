import React, { Component,useState } from "react";
import { StyleSheet, View,Text ,TouchableOpacity,Dimensions,SafeAreaView,StatusBar,ScrollView ,useWindowDimensions } from "react-native";
import { AntDesign,Feather,FontAwesome ,MaterialCommunityIcons,Ionicons,Fontisto    } from '@expo/vector-icons'; 
import { TabView, SceneMap } from 'react-native-tab-view';
import Modal from "react-native-modal";
function Item(){
    const [visiable, setCount] = useState(0);
    return(
        <View>
            <TouchableOpacity onPress={()=> setCount(1)}>
                <View style={styles.item}>
                    <View style={styles.itemimage}>
                        <View style={styles.circle}>
                            <FontAwesome name="car" size={40} color="gray" />
                        </View>
                    </View>
                    <View style={{flex:4}}>
                        <Text style={styles.namecar}>Xe ô tô VinFast</Text>
                        <Text style={styles.textcar}>Biển số: 25-36-6969</Text>
                        <Text style={styles.textcar}>Chủ xe: Bùi Hồng</Text>
                    </View>
                </View> 
            </TouchableOpacity>
            <Modal
                isVisible={visiable===1}
                useNativeDriver
                style={{margin: 0,
                        justifyContent: 'center', height:200, alignItems:'center'}}
                backdropColor={"#CCCCCC"}
                onBackButtonPress={() => true}
                onBackdropPress={() => true}
                onSwipeComplete={() => true}
            >
                <View style={{height:200, backgroundColor:'white', borderRadius:20}}>
                    <View style={{alignItems:'flex-end', marginRight:10, marginTop:10}}>
                        <TouchableOpacity onPress={()=> setCount(0)}>
                            <View style={{height:20, width:20, borderColor:'#CCCCCC', borderWidth:1, justifyContent:'center', alignItems:'center'}}>
                                <Text>x</Text>
                            </View> 
                        </TouchableOpacity>
                    </View>
                    <ModalView></ModalView>
                </View>
            </Modal>
        </View>
    );
}
function ItemBike(){
    const [visiable, setCount] = useState(0);
    return(
        <View>
            <TouchableOpacity onPress={()=> setCount(1)}>
                <View style={styles.item}>
                        <View style={styles.itemimage}>
                            <View style={styles.circle}>
                                <MaterialCommunityIcons name="bike" size={40} color="gray" />
                            </View>                      
                        </View>
                        <View style={{flex:4}}>
                            <Text style={styles.namecar}>Xe đạp mini Nhật</Text>
                            <Text style={styles.textcar}>Biển số: </Text>
                            <Text style={styles.textcar}>Chủ xe: Bùi Hồng</Text>
                        </View>
                </View> 
            </TouchableOpacity>
            <Modal
                isVisible={visiable===1}
                useNativeDriver
                style={{margin: 0,
                        justifyContent: 'center', height:200, alignItems:'center'}}
                backdropColor={"#CCCCCC"}
                onBackButtonPress={() => true}
                onBackdropPress={() => true}
                onSwipeComplete={() => true}
            >
                <View style={{height:200, backgroundColor:'white', borderRadius:20}}>
                    <View style={{alignItems:'flex-end', marginRight:10, marginTop:10}}>
                        <TouchableOpacity onPress={()=> setCount(0)}>
                            <View style={{height:20, width:20, borderColor:'#CCCCCC', borderWidth:1, justifyContent:'center', alignItems:'center'}}>
                                <Text>x</Text>
                            </View> 
                        </TouchableOpacity>
                    </View>
                    <ModalView></ModalView>
                </View>
            </Modal>
        </View>
    );
}
function ItemMoto(){
    const [visiable, setCount] = useState(0);
    return(
        <View>
            <TouchableOpacity onPress={()=> setCount(1)}>
                <View style={styles.item}>
                    <View style={styles.itemimage}>
                        <View style={styles.circle}>
                            <Fontisto name="motorcycle" size={40} color="gray" />
                        </View>
                    </View>
                    <View style={{flex:4}}>
                        <Text style={styles.namecar}>Xe máy SH</Text>
                        <Text style={styles.textcar}>Biển số: 25-36-6969</Text>
                        <Text style={styles.textcar}>Chủ xe: Bùi Hồng</Text>
                    </View>
                </View>  
            </TouchableOpacity>
            <Modal
                isVisible={visiable===1}
                useNativeDriver
                style={{margin: 0,
                        justifyContent: 'center', height:200, alignItems:'center'}}
                backdropColor={"#CCCCCC"}
                onBackButtonPress={() => true}
                onBackdropPress={() => true}
                onSwipeComplete={() => true}
            >
                <View style={{height:200, backgroundColor:'white', borderRadius:20}}>
                    <View style={{alignItems:'flex-end', marginRight:10, marginTop:10}}>
                        <TouchableOpacity onPress={()=> setCount(0)}>
                            <View style={{height:20, width:20, borderColor:'#CCCCCC', borderWidth:1, justifyContent:'center', alignItems:'center'}}>
                                <Text>x</Text>
                            </View> 
                        </TouchableOpacity>
                    </View>
                    <ModalView></ModalView>
                </View>
            </Modal>
        </View>
    );
}
function InScreen(){
    return(
        <ScrollView style={{height:height-120, borderBottomColor:"#CCCCCC", marginBottom:10, marginTop:10}}>
            <Item></Item>
            <ItemBike></ItemBike>
            <ItemMoto></ItemMoto>
            <Item></Item>  
            <ItemBike></ItemBike>         
        </ScrollView>
    );
}
function OutScreen(){
    return(
        <ScrollView style={{height:height-120, borderBottomColor:"#CCCCCC", marginBottom:10, marginTop:10}}>
            <Item></Item>   
            <ItemBike></ItemBike>
            <ItemMoto></ItemMoto>
            <Item></Item>  
            <ItemBike></ItemBike>           
        </ScrollView>
    );
}
function ModalView() {
    return(
        <View style={{height:160, width:width-50, backgroundColor:'white', justifyContent:'center', alignItems:'center', borderRadius:20}}>
            <View style={{flex:1, flexDirection:'row', marginTop:-10}}>
                <View style={{  flex:2, 
                                marginTop:20,
                                marginLeft:10,
                                alignItems:'center',}}>
                    <View style={styles.circle}>
                        <FontAwesome name="car" size={40} color="gray" />
                    </View>
                </View>
                <View style={{flex:4, marginRight:15}}>
                    <Text style={styles.namecar}>Xe ô tô VinFast</Text>
                    <Text style={styles.textcar}>Biển số: 25-36-6969</Text>
                    <Text style={styles.textcar}>Chủ xe: Bùi Hồng</Text>
                    <Text style={styles.textcar}>Điện thoại: 0987123314</Text>
                    <Text style={styles.textcar}>Mô tả: Viết xước 10cm đầu xe</Text>
                </View>  
            </View>  
        </View>  
    );
}
function ListVehicleInOut({ navigation: { navigate } }) {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Xe vào' },
        { key: 'second', title: 'Xe ra' },
    ]);
    const renderScene = SceneMap({
        first: InScreen,
        second: OutScreen,
      });
    
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
                <Text style={{fontSize:16, fontWeight:'bold'}}>Danh sách phương tiện vào/ra</Text>
            </View>
            <View style={{flex:1}}>
            </View>
      </View>
      <View style={styles.profile}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: width, height:height-50}}
            />
              
            
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

export default ListVehicleInOut;
