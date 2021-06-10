import React, { Component, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, SafeAreaView, StatusBar, ScrollView, useWindowDimensions, RefreshControl, AsyncStorage } from "react-native";
import { AntDesign, Feather, FontAwesome, MaterialCommunityIcons, Ionicons, Fontisto } from '@expo/vector-icons';
import { TabView, SceneMap } from 'react-native-tab-view';
import Modal from "react-native-modal";
import { SearchBar } from 'react-native-elements';
import styles from '../Style/ListTicketAddNew';
import axios from "axios";
import { TouchableHighlight } from "react-native-gesture-handler";
function Item() {
    const [visiable, setCount] = useState(0);
    return (
        <View>
            <TouchableOpacity onPress={() => setCount(1)}>
                <View style={styles.item}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.namecar}>Vé BKS 02642211</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={styles.itemimage}>
                            <View style={styles.circle}>
                                <FontAwesome name="car" size={30} color="gray" />
                            </View>
                        </View>
                        <View style={{ flex: 4 }}>
                            <Text style={styles.textcar}>Biển số: 25-36-6969</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        // <Modal
        //     isVisible={visiable===1}
        //     useNativeDriver
        //     style={{margin: 0,
        //             justifyContent: 'center', height:200, alignItems:'center'}}
        //     backdropColor={"#CCCCCC"}
        //     onBackButtonPress={() => true}
        //     onBackdropPress={() => true}
        //     onSwipeComplete={() => true}
        // >
        //     <View style={{height:200, backgroundColor:'white', borderRadius:20}}>
        //         <View style={{alignItems:'flex-end', marginRight:10, marginTop:10}}>
        //             <TouchableOpacity onPress={()=> setCount(0)}>
        //                 <View style={{height:20, width:20, borderColor:'#CCCCCC', borderWidth:1, justifyContent:'center', alignItems:'center'}}>
        //                     <Text>x</Text>
        //                 </View>
        //             </TouchableOpacity>
        //         </View>
        //         <ModalView></ModalView>
        //     </View>
        // </Modal>
    );
}
function ItemBike() {
    const [visiable, setCount] = useState(0);
    return (
        <View>
            <TouchableOpacity onPress={() => setCount(1)}>
                <View style={styles.item}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.namecar}>Vé BKS 02642211</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={styles.itemimage}>
                            <View style={styles.circle}>
                                <MaterialCommunityIcons name="bike" size={30} color="gray" />
                            </View>
                        </View>
                        <View style={{ flex: 4 }}>
                            <Text style={styles.textcar}>Biển số: 25-36-6969</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <Modal
                isVisible={visiable === 1}
                useNativeDriver
                style={{
                    margin: 0,
                    justifyContent: 'center', height: 200, alignItems: 'center'
                }}
                backdropColor={"#CCCCCC"}
                onBackButtonPress={() => true}
                onBackdropPress={() => true}
                onSwipeComplete={() => true}
            >
                <View style={{ height: 200, backgroundColor: 'white', borderRadius: 20 }}>
                    <View style={{ alignItems: 'flex-end', marginRight: 10, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => setCount(0)}>
                            <View style={{ height: 20, width: 20, borderColor: '#CCCCCC', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
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
function ItemMoto() {
    const [visiable, setCount] = useState(0);
    return (
        <View>
            <TouchableOpacity onPress={() => setCount(1)}>
                <View style={styles.item}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.namecar}>Vé BKS 02642211</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={styles.itemimage}>
                            <View style={styles.circle}>
                                <Fontisto name="motorcycle" size={30} color="gray" />
                            </View>
                        </View>
                        <View style={{ flex: 4 }}>
                            <Text style={styles.textcar}>Biển số: 25-36-6969</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <Modal
                isVisible={visiable === 1}
                useNativeDriver
                style={{
                    margin: 0,
                    justifyContent: 'center', height: 200, alignItems: 'center'
                }}
                backdropColor={"#CCCCCC"}
                onBackButtonPress={() => true}
                onBackdropPress={() => true}
                onSwipeComplete={() => true}
            >
                <View style={{ height: 200, backgroundColor: 'white', borderRadius: 20 }}>
                    <View style={{ alignItems: 'flex-end', marginRight: 10, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => setCount(0)}>
                            <View style={{ height: 20, width: 20, borderColor: '#CCCCCC', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
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
function InScreen() {
    const [refreshPage, setRefreshPage] = useState(true);
    const [systems, setsystems] = useState([]);
    const [system, setsystem] = useState({});
    const [total, settotal] = useState(0);
    const [visiable, setCount] = useState(0);
    const [user, setUser] = React.useState('');
    React.useEffect(() => {
        getTicket();
        getUser();
    }, []);
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }
    const getTicket = async () => {
        await axios
            .get('https://project3na.herokuapp.com/api/owner/tickets')
            .then(async function (response) {
                if (response.data.success) {
                    setsystems(response.data.ticketSystem);
                    settotal(response.data.ticketSystem.length);
                }
                setRefreshPage(false);
            })
            .catch(function (error) {
                setRefreshPage(false);
            })
            .finally(function () {
            });
    }
    const refresh = () => {
        setRefreshPage(true);
        getTicket();
    }
    const openModel = (item: any) => {
        setsystem(item);
        setCount(1);
    }
    return (
        <View style={{}}>
            <View style={{ height: 40, justifyContent: 'center' }}>
                <Text style={{ marginLeft: 10 }}>Tổng: {total} vé</Text>
            </View>           
            <ScrollView style={{ height: height - 250, borderBottomColor: "#CCCCCC", marginBottom: 10, marginTop: 10 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshPage}
                        onRefresh={() => refresh()}
                    />}>              
                {
                    systems.map((item, index) => {
                        return (
                            <View key={index} style={{ flexBasis: '50%', flex: 1, flexWrap: 'wrap', flexDirection: "row" }}>                          
                                <View style={styles.item}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.namecar}>{item.name}</Text>
                                    </View>
                                    <View style={{ flex: 2, flexDirection: 'row' }}>
                                        <View style={styles.itemimage}>
                                            <View style={styles.circle}>
                                                {
                                                    item.typeverhicle == 'car' && <FontAwesome name="car" size={40} color="gray" />
                                                }
                                                {
                                                    item.typeverhicle == 'bike' && <MaterialCommunityIcons name="bike" size={40} color="gray" />
                                                }
                                                {
                                                    item.typeverhicle == 'motobike' && <Fontisto name="motorcycle" size={40} color="gray" />
                                                }
                                            </View>
                                        </View>
                                        <View style={{ flex: 5 }}>
                                            <Text style={styles.textcar}>Giá: {item.price}</Text>
                                            {item.typetime == 0 &&
                                                <Text style={styles.textcar}>Vé theo: lượt</Text>
                                            }
                                            {item.typetime == 1 &&
                                                <Text style={styles.textcar}>Vé theo: ngày</Text>
                                            }
                                            {item.typetime == 2 &&
                                                <Text style={styles.textcar}>Vé theo: giờ</Text>
                                            }

                                            <Text style={styles.textcar}>Mô tả: {item.drescription}</Text>                                       
                                        </View>
                                    </View>
                                </View>
                            </View>
                        );
                    })
                }
            </ScrollView>
        </View>
    );
}
function OutScreen() {
    const [refreshPage, setRefreshPage] = useState(true);
    const [normal, setnormal] = useState([]);
    const [total, settotal] = useState(0);
    const [visiable, setCount] = useState(0);
    const [user, setUser] = React.useState('');
    React.useEffect(() => {
        getTicket();
        getUser();
    }, []);
    const getUser = async () => {
        let value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
    }
    const getTicket = async () => {
        await axios
            .get('https://project3na.herokuapp.com/api/owner/tickets')
            .then(async function (response) {
                if (response.data.success) {
                    setnormal(response.data.ticketNormal);
                    settotal(response.data.ticketNormal.length);
                }
                setRefreshPage(false);
            })
            .catch(function (error) {
                setRefreshPage(false);
            })
            .finally(function () {
            });
    }
    const refresh = () => {
        setRefreshPage(true);
        getTicket();
    }
    const openModel = (item: any) => {
        setnormal(item);
        setCount(1);
    }
    return (
        <View style={{}}>
            <View style={{ height: 40, justifyContent: 'center' }}>
                <Text style={{ marginLeft: 10 }}>Tổng: {total} vé</Text>
            <TouchableHighlight onPress={()=>navigation.push("AddTicket")}>
                <Ionicons name="md-add-sharp" size={30} color="gray" style={{ position: 'absolute', right: 5 }} />
            </TouchableHighlight>
            </View>
            <View style={{ height: 40, alignItems: 'center', marginBottom: 10 }}>
                <SearchBar lightTheme={true}
                    containerStyle={styles.searchstyle}
                    inputContainerStyle={{ height: 30 }}
                    placeholder="Tìm kiếm..."
                ></SearchBar>
            </View>

            <ScrollView style={{ height: height - 250, borderBottomColor: "#CCCCCC", marginBottom: 10, marginTop: 10 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshPage}
                        onRefresh={() => refresh()}
                    />}>
               {
                    normal.map((item, index) => {
                        return (
                            <View key={index} style={{ flexBasis: '50%', flex: 1, flexWrap: 'wrap', flexDirection: "row" }}>                            
                                <View style={styles.item}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.namecar}>{item.name}</Text>
                                    </View>
                                    <View style={{ flex: 2, flexDirection: 'row' }}>
                                        <View style={styles.itemimage}>
                                            <View style={styles.circle}>
                                                {
                                                    item.typeverhicle == 'car' && <FontAwesome name="car" size={40} color="gray" />
                                                }
                                                {
                                                    item.typeverhicle == 'bike' && <MaterialCommunityIcons name="bike" size={40} color="gray" />
                                                }
                                                {
                                                    item.typeverhicle == 'motobike' && <Fontisto name="motorcycle" size={40} color="gray" />
                                                }
                                            </View>
                                        </View>
                                        <View style={{ flex: 5 }}>
                                            <Text style={styles.textcar}>Giá: {item.price}</Text>
                                            {item.typetime == 0 &&
                                                <Text style={styles.textcar}>Vé theo: lượt</Text>
                                            }
                                            {item.typetime == 1 &&
                                                <Text style={styles.textcar}>Vé theo: ngày</Text>
                                            }
                                            {item.typetime == 2 &&
                                                <Text style={styles.textcar}>Vé theo: giờ</Text>
                                            }

                                            <Text style={styles.textcar}>Mô tả: {item.drescription}</Text>                                      
                                        </View>
                                    </View>
                                </View>
                            </View>
                        );
                    })
                }
            </ScrollView>
        </View>
    );
}
function ModalView({ item }) {
    return (
        <View style={{ height: 160, width: width - 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: -10 }}>
                <View style={{
                    flex: 2,
                    marginTop: 20,
                    marginLeft: 10,
                    alignItems: 'center',
                }}>
                    <View style={styles.circle}>
                        <FontAwesome name="car" size={40} color="gray" />
                    </View>
                </View>
                <View style={{ flex: 4, marginRight: 15 }}>
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
function ListTicket_AddNew(props) {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Vé hệ thống' },
        { key: 'second', title: 'Vé thường' },
    ]);
    const renderScene = SceneMap({
        first: InScreen,
        second: OutScreen,
    });

    const renderScene1 = ({ route }) => {
        switch (route.key) {
          case 'first':
             return <InScreen {...props}/>;
          case 'second':
            return <OutScreen {...props}/>;
          default:
            return null;
      }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <AntDesign name="left" size={24} color="gray" />
                </View>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Danh sách vé</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <View style={styles.profile}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: width, height: height - 50 }}
                />
            </View>
        </SafeAreaView>
    );
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default ListTicket_AddNew;
