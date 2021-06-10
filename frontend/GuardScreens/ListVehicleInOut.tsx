import React, { Component,useState } from "react";
import { StyleSheet,Image, View,Text ,TouchableOpacity,Dimensions,SafeAreaView,StatusBar,ScrollView ,useWindowDimensions, AsyncStorage, RefreshControl, Alert } from "react-native";
import { AntDesign,Feather,FontAwesome ,MaterialCommunityIcons,Ionicons,Fontisto    } from '@expo/vector-icons';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Modal from "react-native-modal";
import axios from "axios";
import ListVehicle from "../CustomerScreens/ListVehicle";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import moment from "moment";

function InScreen(props){
    const [refreshPage, setRefreshPage] = useState(true);
    const [transaction, setTransaction] = useState({});
    const [NotPaidtransactions, setNotPaidtransactions] = useState([]);
    const [visiable, setCount] = useState(0);
    const [user, setUser] = React.useState('');
    React.useEffect(() => {
        getUser();
        getTransactions();
        },[]);
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }
    const ReturnTicket = async(transactionid: string, parkingid: string) =>{
        var hour = moment().format('hh:mm');
        var date = moment().format('DD/MM/YYYY');
        var data = {
          parkingid: parseInt(parkingid),
            Timeout: `${hour.toString()} ${date.toString()}`
        }
        await axios
        .post('https://project3na.herokuapp.com/api/guard/transaction/close-trans/'+transactionid, data)
        .then(async function (response) {
            Alert.alert("Thông báo", response.data.msg);
            await getTransactions();
            closeModel();
        })
        .catch(function (error) {

        });
    }
    const getTransactions = async () => {
        await axios
            .get('https://project3na.herokuapp.com/api/guard/transactions')
            .then(async function (response) {
                if(response.data.success)
               {
                if(props?.props?.route?.params?.data?.parkingid) {
                    setNotPaidtransactions(response.data.transactionNotPaid.filter(item => item.parkingid == props.props.route.params.data.parkingid));
                }
                else {
                    setNotPaidtransactions(response.data.transactionNotPaid);
                }

               }
                setRefreshPage(false);
            })
            .catch(function (error) {
            });

    }
    const refresh = () =>{
        setRefreshPage(true);
        getTransactions();
    }
    const openModel = (item:any) => {
        setTransaction(item);
        setCount(1);
    }
    const closeModel = () => {
        getTransactions();
        setCount(0);
    }
    return(
        <ScrollView style={{height:height-120, marginBottom:10, marginTop:10}}
        refreshControl={
            <RefreshControl
              refreshing={refreshPage}
              onRefresh={()=>refresh()}
            />}>
            {
                NotPaidtransactions.map((item) => {
                    return (
                        <View>
                            <TouchableOpacity onPress={()=> openModel(item)}>
                                <View style={styles.item}>
                                    <View style={styles.itemimage}>
                                        <View style={styles.circle}>
                                        {
                                            item.type == 'car' && <Image
                                                                        source={require('../assets/images/car.png')}
                                                                        resizeMode="cover"
                                                                        style={styles.image}
                                                                    ></Image>
                                        }
                                        {
                                            item.type == 'bike' && <Image
                                                                        source={require('../assets/images/bike.jpg')}
                                                                        resizeMode="cover"
                                                                        style={styles.image}
                                                                    ></Image>
                                        }
                                        {
                                            item.type == 'motobike' && <Image
                                                                            source={require('../assets/images/moto.png')}
                                                                            resizeMode="cover"
                                                                            style={styles.image}
                                                                        ></Image>
                                        }

                                        </View>
                                    </View>
                                    <View style={{flex:4}}>
                                        {
                                            item.type == 'car' && <Text style={styles.namecar}>Xe ô tô {item.brand} {item.color} </Text>
                                        }
                                        {
                                            item.type == 'bike' && <Text style={styles.namecar}>Xe đạp {item.brand} {item.color} </Text>
                                        }
                                        {
                                            item.type == 'motobike' && <Text style={styles.namecar}>Xe máy {item.brand} {item.color} </Text>
                                        }
                                        <Text style={styles.textcar}>Biển số: {item.code}</Text>
                                        <Text style={styles.textcar}>{item.Timein}</Text>
                                    </View>
                                    <View style={{flex:2}}>
                                        <Image
                                            source={require('../assets/images/unoaid.png')}
                                            resizeMode="cover"
                                            style={{height:100, width:200, position:'absolute', right:-20, bottom:15}}
                                        ></Image>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                })
            }
            <Modal
                isVisible={visiable==1}
                useNativeDriver
                style={{margin: 0,
                        justifyContent: 'center', height:200, alignItems:'center'}}
                backdropColor={"#CCCCCC"}
                onBackButtonPress={() => true}
                onBackdropPress={() => true}
                onSwipeComplete={() => true}
            >
                {
                    (transaction.pictureUrl !=null && transaction.pictureUrl !="") &&
                    <View style={{height:400, backgroundColor:'white', borderRadius:20}}>
                        <View style={{alignItems:'flex-end', marginRight:10, marginTop:10}}>
                            <TouchableOpacity onPress={()=> setCount(0)}>
                                <View style={{height:20, width:20,  justifyContent:'center', alignItems:'center'}}>
                                    <Ionicons name="close" size={20} color="black" />
                                </View>
                            </TouchableOpacity>

                            </View>
                            {
                            transaction.Status == '1' &&

                            <MaterialButtonViolet
                                onPress={() => {
                                    ReturnTicket(transaction.transactionid, transaction.parkingid);
                                }

                                }
                                style={styles.accept}
                                title="Trả vé"
                            ></MaterialButtonViolet>

                        }


                        <ModalViewImage item={transaction}></ModalViewImage>

                    </View>
                }
                {
                    (transaction.pictureUrl==null || transaction.pictureUrl=="") &&
                    <View style={{height:200, backgroundColor:'white', borderRadius:20}}>
                        <View style={{alignItems:'flex-end', marginRight:10, marginTop:10}}>
                            <TouchableOpacity onPress={()=> setCount(0)}>
                                <View style={{height:20, width:20,  justifyContent:'center', alignItems:'center'}}>
                                    <Ionicons name="close" size={20} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {
                            transaction.Status == '1' &&

                            <MaterialButtonViolet
                                onPress={() =>{
                                    ReturnTicket(transaction.transactionid, transaction.parkingid);
                                }
                                }
                                style={styles.accept}
                                title="Trả vé"
                            ></MaterialButtonViolet>

                        }
                        <ModalView item={transaction}></ModalView>

                    </View>
                }
            </Modal>
        </ScrollView>
    );
}
function OutScreen(props){
    const [refreshPage, setRefreshPage] = useState(true);
    const [transaction, setTransaction] = useState({});
    const [PaidTransaction, setPaidTransaction] = useState([]);
    const [visiable, setCount] = useState(0);
    const [user, setUser] = React.useState('');
    React.useEffect(() => {
        getUser();
        getTransactions();
        },[]);
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }
    const getTransactions = async () => {
        await axios
        .get('https://project3na.herokuapp.com/api/guard/transactions')
        .then(async function (response) {
            if(response.data.success)
           {
               if(props?.props?.route?.params?.data?.parkingid) {
                setPaidTransaction(response.data.transactionPaid.filter(item => item.parkingid == props.props.route.params.data.parkingid));
               }
               else {
                setPaidTransaction(response.data.transactionPaid);
               }
           }
            setRefreshPage(false);
        })
        .catch(function (error) {
        })
        .finally(function () {
        });
    }
    const refresh = () =>{
        setRefreshPage(true);
        getTransactions();
    }
    const openModel = (item:any) => {
        setTransaction(item);
        setCount(1);
    }
    return(
        <ScrollView style={{height:height-120, marginBottom:10, marginTop:10}}
        refreshControl={
            <RefreshControl
              refreshing={refreshPage}
              onRefresh={()=>refresh()}
            />}>
            {
                PaidTransaction.map((item) => {
                    return (
                        <View>
                            <TouchableOpacity onPress={()=> openModel(item)}>
                                <View style={styles.item}>
                                    <View style={styles.itemimage}>
                                        <View style={styles.circle}>
                                        {
                                            item.type == 'car' && <Image
                                                                        source={require('../assets/images/car.png')}
                                                                        resizeMode="cover"
                                                                        style={styles.image}
                                                                    ></Image>
                                        }
                                        {
                                            item.type == 'bike' && <Image
                                                                        source={require('../assets/images/bike.jpg')}
                                                                        resizeMode="cover"
                                                                        style={styles.image}
                                                                    ></Image>
                                        }
                                        {
                                            item.type == 'motobike' && <Image
                                                                            source={require('../assets/images/moto.png')}
                                                                            resizeMode="cover"
                                                                            style={styles.image}
                                                                        ></Image>
                                        }

                                        </View>
                                    </View>
                                    <View style={{flex:4}}>
                                        {
                                            item.type == 'car' && <Text style={styles.namecar}>Xe ô tô {item.brand} {item.color} </Text>
                                        }
                                        {
                                            item.type == 'bike' && <Text style={styles.namecar}>Xe đạp {item.brand} {item.color} </Text>
                                        }
                                        {
                                            item.type == 'motobike' && <Text style={styles.namecar}>Xe máy {item.brand} {item.color} </Text>
                                        }
                                        <Text style={styles.textcar}>Biển số: {item.code}</Text>
                                        <Text style={styles.textcar}>{item.Timein}</Text>
                                        {/* <Text style={styles.textcar}>Chủ xe: {item.username}</Text> */}
                                    </View>
                                    <View style={{flex:2, justifyContent:'center'}}>
                                    <Image
                                        source={require('../assets/images/paided.png')}
                                        resizeMode="cover"
                                        style={{height:100, width:200, position:'absolute', right:35, bottom:25}}
                                    ></Image>
                                        <Text style={{fontSize:12, marginLeft:10}}>Giá</Text>
                                        <Text style={{color:'#00ff40', fontSize:14, marginLeft:10}}>$20.000</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                })
            }
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
                {
                    (transaction.pictureUrl !=null && transaction.pictureUrl !="") &&
                    <View style={{height:400, backgroundColor:'white', borderRadius:20}}>
                        <View style={{alignItems:'flex-end', marginRight:10, marginTop:10}}>
                            <TouchableOpacity onPress={()=> setCount(0)}>
                                <View style={{height:20, width:20,  justifyContent:'center', alignItems:'center'}}>
                                    <Ionicons name="close" size={20} color="black" />
                                </View>
                            </TouchableOpacity>

                        </View>

                        <ModalViewImage item={transaction}></ModalViewImage>
                    </View>
                }
                {
                    (transaction.pictureUrl==null || transaction.pictureUrl=="") &&
                    <View style={{height:200, backgroundColor:'white', borderRadius:20}}>
                        <View style={{alignItems:'flex-end', marginRight:10, marginTop:10}}>
                            <TouchableOpacity onPress={()=> setCount(0)}>
                                <View style={{height:20, width:20,  justifyContent:'center', alignItems:'center'}}>
                                    <Ionicons name="close" size={20} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <ModalView item={transaction}></ModalView>
                    </View>
                }
            </Modal>
        </ScrollView>
    );
}
async function returnTicket(transactionid: string, parkingid: string) {
    var hour = moment().format('hh:mm');
    var date = moment().format('DD/MM/YYYY');
    var data = {
      parkingid: parseInt(parkingid),
        Timeout: `${hour.toString()} ${date.toString()}`
    }
    await axios
    .post('https://project3na.herokuapp.com/api/guard/transaction/close-trans/'+transactionid, data)
    .then(async function (response) {
        Alert.alert("Thông báo", response.data.msg);
    })
    .catch(function (error) {

    });
}
function ModalViewImage({item}) {
    return(
        <View style={{height:360, width:width-50, backgroundColor:'white',  borderRadius:20}}>
            <View style={{height:190, width:width-50, backgroundColor:'white',  borderRadius:20}}>
                <View style={{flex:1, flexDirection:'row', marginTop:-20}}>
                    <View style={{  flex:2,
                                    marginTop:20,
                                    marginLeft:10,
                                    alignItems:'center',}}>
                        <View style={styles.circle}>
                        {
                            item.type == 'car' && <Image
                                                        source={require('../assets/images/car.png')}
                                                        resizeMode="cover"
                                                        style={styles.image}
                                                    ></Image>
                        }
                        {
                            item.type == 'bike' && <Image
                                                        source={require('../assets/images/bike.jpg')}
                                                        resizeMode="cover"
                                                        style={styles.image}
                                                    ></Image>
                        }
                        {
                            item.type == 'motobike' && <Image
                                                            source={require('../assets/images/moto.png')}
                                                            resizeMode="cover"
                                                            style={styles.image}
                                                        ></Image>
                        }
                        </View>
                    </View>
                    <View style={{flex:4, marginRight:15, justifyContent:'center'}}>
                        {
                            item.type == 'car' && <Text style={styles.namecar}>Xe ô tô {item.brand} {item.color} </Text>
                        }
                        {
                            item.type == 'bike' && <Text style={styles.namecar}>Xe đạp {item.brand} {item.color} </Text>
                        }
                        {
                            item.type == 'motobike' && <Text style={styles.namecar}>Xe máy {item.brand} {item.color} </Text>
                        }
                        <Text style={styles.textcar}>Chủ xe: {item.username}</Text>
                    </View>
                </View>

                <View style={{flex:1, marginLeft:20}}>
                    <Text style={styles.textcar}>Biển số: {item.code}</Text>
                    <Text style={styles.textcar}>Điện thoại: {item.phonenumber}</Text>
                    <Text style={styles.textcar}>Mô tả: {item.description}</Text>


                    {item.Status == "2" &&
                    <Image
                    source={require('../assets/images/paided.png')}
                    resizeMode="cover"
                    style={{height:100, width:200, position:'absolute', right:15, bottom:15}}
                ></Image>
                    }
                    {item.Status == "1" &&
                    <Image
                    source={require('../assets/images/unoaid.png')}
                    resizeMode="cover"
                    style={{height:100, width:200, position:'absolute', right:15, bottom:15}}
                ></Image>
                    }
                </View>
            </View>
            <View style={{height:180, width:width-50, backgroundColor:'white',  borderRadius:20, alignItems:'center', justifyContent:'center'}}>
                <Image
                    source={{uri:item.pictureUrl}}
                    resizeMode="cover"
                    style={{height:150, width:width-90}}
                ></Image>
            </View>


        </View>
    );
}
function ModalView({item}) {
    return(
        <View style={{height:160, width:width-50, backgroundColor:'white',  borderRadius:20}}>
            <View style={{flex:1, flexDirection:'row', marginTop:-20}}>
                <View style={{  flex:2,
                                marginTop:20,
                                marginLeft:10,
                                alignItems:'center',}}>
                    <View style={styles.circle}>
                    {
                        item.type == 'car' && <Image
                                                    source={require('../assets/images/car.png')}
                                                    resizeMode="cover"
                                                    style={styles.image}
                                                ></Image>
                    }
                    {
                        item.type == 'bike' && <Image
                                                    source={require('../assets/images/bike.jpg')}
                                                    resizeMode="cover"
                                                    style={styles.image}
                                                ></Image>
                    }
                    {
                        item.type == 'motobike' && <Image
                                                        source={require('../assets/images/moto.png')}
                                                        resizeMode="cover"
                                                        style={styles.image}
                                                    ></Image>
                    }
                    </View>
                </View>
                <View style={{flex:4, marginRight:15, justifyContent:'center'}}>
                    {
                        item.type == 'car' && <Text style={styles.namecar}>Xe ô tô {item.brand} {item.color} </Text>
                    }
                    {
                        item.type == 'bike' && <Text style={styles.namecar}>Xe đạp {item.brand} {item.color} </Text>
                    }
                    {
                        item.type == 'motobike' && <Text style={styles.namecar}>Xe máy {item.brand} {item.color} </Text>
                    }
                    <Text style={styles.textcar}>Chủ xe: {item.username}</Text>
                </View>
            </View>
            <View style={{flex:1, marginLeft:20}}>
                <Text style={styles.textcar}>Biển số: {item.code}</Text>
                <Text style={styles.textcar}>Điện thoại: {item.phonenumber}</Text>
                <Text style={styles.textcar}>Mô tả: {item.description}</Text>
                {item.Status == "2" &&
                <Image
                source={require('../assets/images/paided.png')}
                resizeMode="cover"
                style={{height:100, width:200, position:'absolute', right:15, bottom:15}}
            ></Image>
                }
                {item.Status == "1" &&
                <Image
                source={require('../assets/images/unoaid.png')}
                resizeMode="cover"
                style={{height:100, width:200, position:'absolute', right:15, bottom:15}}
            ></Image>
                }
            </View>
        </View>
    );
}
function ListVehicleInOut(props) {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Xe vào' },
        { key: 'second', title: 'Xe ra' },
    ]);
    const renderScene = SceneMap({
        first: () => <InScreen props={props} />,
        second: () => <OutScreen props={props} />,
      });
    const [user, setUser] = React.useState('');
    React.useEffect(() => {

        getUser();
        },[]);
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }
      const goToList = () => {
        if (user.role == 2 || user.role == "2") {
            props.navigation.goBack();
        }
        else {
            props.navigation.goBack();
        }
    }
  return (
    <SafeAreaView  style={styles.container}>
        <StatusBar
        animated={true}
        hidden={true} />
      <View style={styles.tabback}>
            <TouchableOpacity onPress={() => goToList()} style={{flex:1, alignItems:'center'}}>
                <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <View style={{flex:5, alignItems:'center'}}>
                <Text style={{fontSize:16, fontWeight:'bold'}}>Danh sách phương tiện vào/ra</Text>
            </View>
            <View style={{flex:1}}>
            </View>
      </View>
      <View style={styles.profile}>
            <TabView
                renderTabBar={props => (
                    <TabBar
                      {...props}
                      renderLabel={({ route, color }) => (
                        <Text style={{ color: 'black'}}>
                          {route.title}
                        </Text>
                      )}
                      style={{backgroundColor: "#16f198", height:40}}
                    />
                  )}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: width, height:height-50}}
            />
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

    justifyContent:'center' ,
    marginBottom:10
  },
  itemimage:{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
  },
  accept:{
    height: 30,
    width: 120,
    borderWidth: 1,
    borderColor: "rgba(35,225,142,1)",
    borderRadius: 6,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    margin:10
  },
  namecar:{
    fontWeight:'bold',
    fontSize:14,
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
    justifyContent:'center',
    alignItems:'center',
    borderColor:'gray'
  }

});

export default ListVehicleInOut;
