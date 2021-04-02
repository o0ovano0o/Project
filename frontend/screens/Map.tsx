import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, View,Dimensions, ScrollView,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import MapView from "react-native-maps";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
// import Dropdown from "react-native-modal-dropdown";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
// const { Marker } = MapView;
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
function Map({ navigation: { navigate } }) {
    return (
        <View style={styles.container}>
            <MapView initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0121
                    }}
                    style={styles.map}></MapView>
        </View>
        );
}
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
        
    },
    map: {
        flex: 3
        
      },
});
export default Map;