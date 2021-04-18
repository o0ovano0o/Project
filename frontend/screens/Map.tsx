import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, View,Dimensions, ScrollView,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import MapView from "react-native-maps";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Dropdown from "react-native-modal-dropdown";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import styles from '../Style/MapStyle';
import axios from 'axios';
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
            latitude: 	21.027763,
            longitude: 105.835160
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
          latitude: 	21.027763,
          longitude: 105.834190
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
          latitude: 	21.027763,
          longitude: 105.834260
          },
        description: `Description about this parking lot Description about this parking lot`
    }
]

const latitudeDeltaE = 0.0122;
const longitudeDeltaE = 0.0121;
// https://hoanguyenit.com/create-login-in-react-native-and-nodejs.html
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parkings:new Array(),
      hours: {},
      region:{
        latitude: 	21.027763,
        longitude:	105.834160,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121
      },
      currentregion:{
        latitude: 	21.027799,
        longitude:	105.834160,
      },
      active: null,
      activeModal: null,
      ref:null
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }
  async getParking(){
    const me = this;
    var response = await axios
    .get('https://project3na.herokuapp.com/api/parkings');
    me.setState({
      parkings : response.data.data
    });
      }
  async componentDidMount() {
    const me = this;
    var response = await axios
    .get('https://project3na.herokuapp.com/api/parkings');
    response = response.data.data.map(item => {
      return {
        ...item,
        coordinate: {
          longitude: parseFloat(item.longitude),
          latitude: parseFloat(item.latitude)
        }
      }
    })
    me.setState({
      parkings : response
    });
    // alert(JSON.stringify(me.state.parkings));
    navigator.geolocation.getCurrentPosition((data) => {
      me.setState({currentregion :data.coords});
    }, ((error) => alert('Lấy vị trí hiện tại thất bại')))
  }
  currenlocation() {
    const me = this;
    navigator.geolocation.getCurrentPosition((data) => {
      me.setState({currentregion :data.coords});
      me.setState({
        region: {
          latitude: me.state.currentregion.latitude,
          longitude: me.state.currentregion.longitude,
          longitudeDelta:longitudeDeltaE,
          latitudeDelta:latitudeDeltaE,
          active:true
        }
      });
      // alert(JSON.stringify(region));
      me.state.ref.animateToRegion(
        // (new Array()).push(me.state.region),
        me.state.region,
        true, // not animated
      );
      me.setState({region});
    }, ((error) => {
      var me = this;
      var region = me.state.region;
      // alert(JSON.stringify(me.state));
      region=Object.assign(region,);
      // alert(JSON.stringify(region));
      me.setState({
        region: {
          latitude: me.state.currentregion.latitude,
          longitude: me.state.currentregion.longitude,
          longitudeDelta:longitudeDeltaE,
          latitudeDelta:latitudeDeltaE,
          active:true
        }
      });
      me.state.ref.animateToRegion(
        // (new Array()).push(me.state.region),
        me.state.region,
        1000, // not animated
      );
      // alert('Lấy vị trí hiện tại thất bại');

    }))
      me.setState({ active: 'current' })

  }


    onRegionChange(region) {
      this.setState({ region });
    }
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
            <TouchableWithoutFeedback key={`parking-${item.parkingid}`} onPress={() => this.setState({active:item.parkingid})}>
                <View  style={styles.parking} >
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text>{item.parkingname}</Text>
                        <Text>x {item.TotalParkingCar}</Text>
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
                                    {item.TotalParkingBike}
                                </Text>
                            </View>
                            <View style={styles.parkingIcon}>
                                <Ionicons name="ios-star"  size={15} color={"gray"}/>
                                <Text style={{ marginLeft: 10}}>
                                    {item.TotalPackingTime}
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
                                    <Text style={styles.buyTotalPrice}>{item.UsedPackingBike}</Text>
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
                {this.state.parkings.map(parking => this.renderParking(parking))}
            </ScrollView>
        );
    }
    render(){
        return (
          <View style={styles.container}>
            {/* {this.renderHeader()} */}
            <MapView initialRegion={this.state.region}
                    mapPadding={{ top: 0, right: 0, bottom: 500, left: 0 }}
                    onRegionChange={this.onRegionChange}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
                    ref={(ref) => { this.state.ref = ref }}
                    style={styles.map}>
                      <Marker
                  coordinate={this.state.currentregion}
                  title="title"
                  key='current'
                  description="description"
                />
                 {this.state.parkings.map(parking => (
                    <Marker
                        key={`marker-${parking.parkingid}`}
                        coordinate={parking.coordinate}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => this.setState({ active: parking.parkingid })}
                        >
                            <View style={[styles.marker, this.state.active === parking.parkingid ? styles.active : null]}>
                            <Text style={styles.markerPrice}>{parking.parkingname}</Text>
                            <Text style={styles.markerStatus}>{"Xe ô tô "}({parking.TotalParkingCar}/{parking.UsedPackingCar})</Text>
                            <Text style={styles.markerStatus}>{"Xe máy/đạp "}({parking.TotalParkingBike}/{parking.UsedPackingBike})</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </Marker>
                ))}
            </MapView>
            <TouchableWithoutFeedback

                  style={{elevation: 3,height:40,width:40,backgroundColor:'#d3d7de'}}
                            onPress={() => this.currenlocation()}
                        >
                         <MaterialCommunityIcons name="map-marker-radius" size={38} color="black" style={{position:'absolute', right:30, bottom:140, display:'flex'}} />
                        </TouchableWithoutFeedback >

                  {  this.renderParkings()}
            { this.renderModal()}
          </View>

        );
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
