import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, View,Dimensions, Image,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import MapView from "react-native-maps";
import {  Ionicons,AntDesign } from "@expo/vector-icons";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { ListItem, SearchBar } from "react-native-elements";
const { Marker } = MapView;
export default class FindAddress extends Component {
    state={
        region: {  
            latitude: 	21.027763,
            longitude:	105.834160,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
            address:''
          },
        search: '',
    }
    onChangeValue=region =>{
        alert(JSON.stringify(region))
        this.setState({
            region
        })
    }
    updateSearch = search => {
        this.setState({ search }, () => {
            if (search.length < 1) {
                this.setState({
                    data: []
                });
                return;
            }

            
        });
    };
    render(){
        return (
          <View style={{flex:1}}>
            <View style={styles.tabback}>
                <SearchBar placeholder="Tìm kiếm"
                    lightTheme round editable={true}
                    inputContainerStyle={{height:30, backgroundColor:'white'}}
                    value={this.state.search}
                    containerStyle={styles.searchstyle} 
                    onChangeText={this.updateSearch} />
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
        justifyContent: 'center',
        alignItems: 'center',               
    },
    button: {
        height: 40,
        width: 250,
        borderWidth: 1,
        borderColor: "rgba(35,225,142,1)",
        borderRadius: 6,
    },
    searchstyle:{
        height:45, 
        borderRadius:10,
        backgroundColor:'white', 
        borderColor:'white', 
        width:DEVICE_WIDTH-20,
        marginTop:25, 
        marginLeft: 10,
        marginBottom:10
      },
      image:{
        height:100,
        width:100,
        borderRadius:70,
        marginLeft:-10,
      },
      hoursDropdown: {
          borderRadius: 5,
          borderColor: "#e0e0d1",
          borderWidth: 1,
          padding: 5,
          marginRight: 5,
          marginLeft:10,
          marginBottom:10,
          width:100
        },
      hoursDropdownOption: {
          padding: 5,
          fontSize: 14 * 0.8
      },
      hoursDropdownStyle: {
          marginVertical: -20
      },
})