import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, View,Dimensions, ScrollView,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import MapView from "react-native-maps";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Dropdown from "react-native-modal-dropdown";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
const { Marker } = MapView;

const parkings=[
    {
        id: 1,
        title: 'Parking 1',
        price: 5,
        rating:4.2,
        spost: 20,
        free: 10,
        address:'ngõ 9, Duy Tân, Cầu giấy, Hà Nội',
        coordinate: {
            latitude: 37.78735,
            longitude: -122.4334
          },
        description: `Description about this parking lot Description about this parking lot`
    },
    {
        id: 2,
        title: 'Parking 2',
        price: 5,
        rating:4.2,
        spost: 20,
        free: 10,
        address:'ngõ 9, Duy Tân, Cầu giấy, Hà Nội',
        coordinate: {
            latitude: 37.78845,
            longitude: -122.4344
          },
        description: `Description about this parking lot Description about this parking lot`
    },
    {
        id: 3,
        title: 'Parking 3',
        price: 5,
        rating:4.2,
        spost: 20,
        free: 10,
        address:'ngõ 9, Duy Tân, Cầu giấy, Hà Nội',
        coordinate: {
            latitude: 37.78615,
            longitude: -122.4314
          },
        description: `Description about this parking lot Description about this parking lot`
    }
]


// https://hoanguyenit.com/create-login-in-react-native-and-nodejs.html
export default class Map extends Component {
    state = {
        hours: {},
        active: null,
        activeModal: null
      };
    
    
    renderHeader(){
        return(
            <View style={styles.header}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={styles.headerTitle}>Detected location</Text>
                    <Text style={styles.headerLocation}>San Francisco, US</Text>
                </View>
                <View
                style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
                >
                    <TouchableWithoutFeedback>
                        <Ionicons name="ios-menu" size={30} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            
        );
    }
    renderParking(item){
        return(
            <TouchableWithoutFeedback key={`parking-${item.id}`} onPress={() => this.setState({active:item.id})}>
                <View  style={styles.parking} >
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text>{item.title}</Text>
                        <Text>x {item.spost}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {/* {this.renderHours(item.id)} */}
                            <Text style={{ color: "gray" }}>hrs</Text>
                        </View>
                    </View>
                    <View style={{flex:1.25, flexDirection:'row'}}>
                        <View style={styles.parkingInfo}>
                            <View style={styles.parkingIcon}>
                                <Ionicons name="ios-pricetag" size={15} color={"gray"} />
                                <Text >                    
                                    ${item.price}
                                </Text>
                            </View>
                            <View style={styles.parkingIcon}>
                                <Ionicons name="ios-star"  size={15} color={"gray"}/>
                                <Text style={{ marginLeft: 10}}>
                                    {item.rating}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.buy} 
                             onPress={() => this.setState({ activeModal: item })}
                        >
                            <View style={styles.buyTotal}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <FontAwesome
                                        name="dollar"
                                        size={15 * 1.25}
                                        color={'white'}
                                    />
                                    <Text style={styles.buyTotalPrice}>{item.price}</Text>
                                </View>
                                <Text style={{ color: 'white' }}>
                                    /hr
                                </Text>
                            </View>
                            <View style={styles.buyBtn}>
                                <FontAwesome name="angle-right" size={40} color={'white'}/>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableWithoutFeedback>
             
        );
    }
    renderHours(id) {
        const { hours } = this.state;
        const availableHours = [1, 2, 3, 4, 5, 6];
    
        return (
          <Dropdown
            defaultIndex={0}
            options={availableHours}
            style={styles.hoursDropdown}
            defaultValue={ "Vé lượt"}
            dropdownStyle={styles.hoursDropdownStyle}
            option={["Vé lượt","Vé giờ"]}
          />
        );
      }
    renderModal() {
        const { activeModal, hours } = this.state;
    
        if (!activeModal) return null;
    
        return (
          <Modal
            isVisible
            useNativeDriver
            style={styles.modalContainer}
            backdropColor={"gray"}
            onBackButtonPress={() => this.setState({ activeModal: null })}
            onBackdropPress={() => this.setState({ activeModal: null })}
            onSwipeComplete={() => this.setState({ activeModal: null })}
          >
            <View style={styles.modal}>
              <View>
                <Text style={{ fontSize: 20 }}>
                  {activeModal.title}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 14 }}>
                  {activeModal.address}
                </Text>
              </View>
              <View style={{ paddingVertical: 14 }}>
                <Text style={{color: "gray",fontSize: 15}}>
                  {activeModal.description}
                </Text>
              </View>
              <View style={styles.modalInfo}>
                <View style={[styles.parkingIcon, { justifyContent: "flex-start" }]}>
                  <Ionicons name="ios-pricetag" size={20} color={"gray"}/>
                  <Text style={{ fontSize: 14 }}>
                        {" "}${activeModal.price}
                  </Text>
                </View>
                <View style={[styles.parkingIcon, { justifyContent: "flex-start" }]}>
                  <Ionicons name="ios-star" size={20} color={"gray"}/>
                  <Text style={{ fontSize: 14 }}>
                    {" "} {activeModal.rating}
                  </Text>
                </View>
                <View style={[styles.parkingIcon, { justifyContent: "flex-start" }]}>
                  <Ionicons name="ios-pin" size={20} color={"gray"}/>
                  <Text style={{ fontSize: 14 }}>
                    {" "}{activeModal.price}km
                  </Text>
                </View>
                <View style={[styles.parkingIcon, { justifyContent: "flex-start" }]} >
                  <Ionicons name="ios-car" size={20} color={"gray"}/>
                  <Text style={{ fontSize: 14 }}>
                    {" "} {activeModal.free}/{activeModal.spost}
                  </Text>
                </View>
              </View>
              <View style={styles.modalHours}>
                <Text style={{ textAlign: "center", fontWeight: "500" }}>
                  Choose your Booking Period:
                </Text>  
                <Dropdown
                    defaultIndex={0}                    
                    style={styles.hoursDropdown}
                    defaultValue={ 'Vé lượt'}
                    dropdownStyle={styles.hoursDropdownStyle}
                    options={['Vé lượt','Vé giờ']}
                />
              </View>
              <View>
                <TouchableOpacity style={styles.payBtn}>
                  <Text style={styles.payText}>
                    Proceed to pay ${activeModal.price}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        );
      }
    renderParkings(){
        return(
            <ScrollView horizontal
                        pagingEnabled
                        scrollEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        snapToAlignment="center" 
                        // keyExtractor={(item, index) => `${item.id}`}
                        // renderItem={({ item }) => this.renderParking(item)}
                        style={styles.parkings}>
                {parkings.map(parking => this.renderParking(parking))}
            </ScrollView>
        );
    }
    render(){
        return (
          <View style={styles.container}> 
            {this.renderHeader()}     
            <MapView initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0121
                    }}
                    style={styles.map}>
                {parkings.map(parking => (
                    <Marker
                        key={`marker-${parking.id}`}
                        coordinate={parking.coordinate}
                    > 
                        <TouchableWithoutFeedback
                            onPress={() => this.setState({ active: parking.id })}
                        >
                            <View style={[styles.marker, this.state.active === parking.id ? styles.active : null]}>
                            <Text style={styles.markerPrice}>${parking.price}</Text> 
                            <Text style={styles.markerStatus}>{" "}({parking.free}/{parking.spost})</Text>
                            </View>  
                        </TouchableWithoutFeedback>                 
                    </Marker>
                ))}
            </MapView>
            {this.renderParkings()}
            {this.renderModal()}
          </View>

        );
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
        
    },
    headerTitle: {
        color: "gray"
    },
    headerLocation: {
        fontSize: 14,
        fontWeight: "500",
        paddingVertical: 15 / 3
    },
    active: {
        borderColor: "red"
      },
    markerPrice: { color: "red", fontWeight: "bold" },
    markerStatus: { color: "gray" },
    map: {
        flex: 3
        
      },
    header:{
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 15 * 2,
        paddingTop: 15 * 2.5,
        paddingBottom: 10 * 1.5
    },
    parkings:{
        position: 'absolute',
        right:2,
        left:6,
        bottom:24
    },
    parking:{
        backgroundColor:'white',       
        borderRadius:6,
        padding:12,
        marginHorizontal:24,
        width: DEVICE_WIDTH-60,
        height:100,
        flexDirection:'row'
    },
    hoursDropdown: {
        borderRadius: 15 / 2,
        borderColor: "gray",
        borderWidth: 1,
        padding: 15,
        marginRight: 16 / 2
    },
    
    logo:{
        width:70,
        height:70
    },
    parkingIcon: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buy: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 10 * 1.5,
        paddingVertical: 15,
        backgroundColor: 'red',
        borderRadius: 6
    },
    buyTotal: {
        flex: 1,
        justifyContent: "space-evenly"
    },
        buyTotalPrice: {
        color: 'white',
        fontSize: 20,
        fontWeight: "600",
        paddingLeft: 20 / 4
    },
    buyBtn: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    parkingInfo: {
        justifyContent: "space-evenly",
        marginHorizontal: 5 * 1.5
    },
    hoursDropdown: {
        borderRadius: 10 / 2,
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        marginRight: 10 / 2
      },
    hoursDropdownOption: {
        padding: 5,
        fontSize: 14 * 0.8
    },
    hoursDropdownStyle: {
        marginLeft: -10,
        paddingHorizontal: 10 / 2,
        marginVertical: -(10 + 1)
    },
    marker:{
        backgroundColor:"white",
        shadowColor: "black",
        shadowOffset: {
        width: 0,
        height: 6
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderRadius:24,
        padding:8,
        flex:1,
        flexDirection:'row'  ,
        borderWidth: 1, 
        borderColor: "white"     
    },
    modalContainer: {
        margin: 0,
        justifyContent: "flex-end"
    },
    modal: {
        flexDirection: "column",
        height:  DEVICE_HEIGHT* 0.75,
        padding: 15 * 2,
        backgroundColor: "white",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    modalInfo: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: "gray",
        borderBottomColor: "gray"
    },
    modalHours: {
        paddingVertical: 15
    },
    modalHoursDropdown: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15
    },
    payBtn: {
        borderRadius: 6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15 * 1.5,
        backgroundColor: "red"
    },
    payText: {
        fontWeight: "600",
        fontSize: 15 * 1.5,
        color: "white"
    }
});
