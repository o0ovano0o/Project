import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, View,Dimensions, Image,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import MapView from "react-native-maps";
import {  Ionicons,AntDesign } from "@expo/vector-icons";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
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
            <View style={styles.tabback}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <AntDesign name="left" size={24} color="black" />
                </View>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tìm địa chỉ</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <MapView style={{flex:1}}
                    initialRegion={this.state.region}
                    onRegionChangeComplete={this.onChangeValue}>

            </MapView>
            <View style={{marginTop:DEVICE_HEIGHT/2,marginLeft:DEVICE_WIDTH/2, position:'absolute'}}>
                <Ionicons name="location-sharp" size={30} color="red" />
            </View>
            <View style={{ height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <MaterialButtonViolet
                    // onPress={() => }
                    style={styles.button}
                    title="Xác nhận địa chỉ"
                ></MaterialButtonViolet>
            </View>
          </View>
        );
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    tabback: {
        height: 50,
        width: DEVICE_WIDTH,
        backgroundColor: "#16f198",
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#CCCCCC",
        flexDirection: 'row'
    },
    button: {
        height: 40,
        width: 250,
        borderWidth: 1,
        borderColor: "rgba(35,225,142,1)",
        borderRadius: 6,
    }
})