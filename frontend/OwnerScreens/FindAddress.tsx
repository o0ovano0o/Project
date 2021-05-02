import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, View,Dimensions, Image,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import MapView from "react-native-maps";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
// import Geocoder from 'react-native-geocoder';
import Geocoder from 'react-native-geocoding';
const { Marker } = MapView;
import Geocode from "react-geocode";


export default class FindAddress extends Component {
    state={
        region: {
            latitude: 	21.027763,
            longitude:	105.834160,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
            address:''
          }
    }
    onChangeValue=region =>{
        alert(JSON.stringify(region))
        this.setState({
            region
        })
        Geocoder.init("AIzaSyAS2ErV2IUJanRygEZG1G8ML8DxzfMcX4A");
        
        Geocoder.from(this.state.region.latitude, this.state.region.longitude)
		.then(json => {
        		var addressComponent = json.results[0].address_components[0];
                alert(JSON.stringify(addressComponent));
		})
		.catch(error => alert(JSON.stringify(error)));
        this.getAddress()
    }
    getAddress(){
        Geocode.setApiKey('AIzaSyAS2ErV2IUJanRygEZG1G8ML8DxzfMcX4A');
        Geocode.fromLatLng("48.8583701", "2.2922926").then(
            response => {
                const address = response.results[0].formatted_address;
                console.log(address);
            },
            error => {
                console.error(error);
            }
        );
    }
    render(){
        return (
          <View style={{flex:1}}>
            <MapView style={{flex:1}}
                    initialRegion={this.state.region}
                    onRegionChangeComplete={this.onChangeValue}>

            </MapView>
            <View style={{marginTop:DEVICE_HEIGHT/2,marginLeft:DEVICE_WIDTH/2, position:'absolute'}}>
                <Ionicons name="location-outline" size={30} color="red" />
            </View>
          </View>
        );
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
