import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, View,Dimensions, ScrollView,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import MapView from "react-native-maps";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Dropdown from "react-native-modal-dropdown";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import styles from '../Style/MapStyle';
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

