import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, View,Dimensions, Image,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import MapView from "react-native-maps";
import {  Ionicons } from "@expo/vector-icons";

const { Marker } = MapView;
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
