import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, View,Dimensions, ScrollView,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import MapView from "react-native-maps";
import {  Ionicons,MaterialIcons } from "@expo/vector-icons";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { ListItem, SearchBar } from "react-native-elements";
import axios from "axios";
const { Marker } = MapView;
const latitudeDeltaE = 0.0122;
const longitudeDeltaE = 0.0121;
// https://maps.vietmap.vn/api/reverse?point.lat=21.054677&point.lon=105.786557&api-version=1.1&apikey=9a9e3d1c0a501c7d4a69c6c5536cd49de806ea33d494114e
export default class FindAddress extends Component {
    state={
        region: {  
            latitude: 	21.027763,
            longitude:	105.834160,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121
            
          },
        search: '', 
        address:'',
        text:'',
        re:[],
        Id:''     
    }
    
    onChangeValue=async(region) =>{
        var text ='', address=''  
        this.setState({
            region
        })        
        const url = `https://maps.vietmap.vn/api/reverse?point.lat=${region.latitude}&point.lon=${region.longitude}&api-version=1.1&apikey=9a9e3d1c0a501c7d4a69c6c5536cd49de806ea33d494114e`
        await axios
          .get(url)
          .then(async function (response) {
              text=response.data.data.features[0].properties.name,
              address=response.data.data.features[0].properties.label
          })
          .catch(function (error) {
                alert("Vị trí chưa được gán định vị");
          })
          .finally(function () {
          });
        alert(text+'- dia chi: '+ address)
        
    }
    updateSearch = async(search) => {
        var me=this;
        this.setState({ search });
        const url=  `https://maps.vietmap.vn/api/autocomplete?api-version=1.1&apikey=9a9e3d1c0a501c7d4a69c6c5536cd49de806ea33d494114e&text=${search}`
        await axios
          .get(url)
          .then(async function (response) {
             // alert(response.data.data.features[0].properties.name);
              me.setState({ 
                  re:response.data.data.features 
                });
                
          })
          .catch(function (error) {
              //  alert("Vị trí chưa được gán định vị");
          })
          .finally(function () {
          });
      }
    ChangeSearchText = async(search, lat, lng,Id)=>{
        this.setState({ search });
        this.setState({
            region: {
              latitude:lat,
              longitude: lng ,
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0121,   
            },
            Id:Id
          });
    }
    onRegionChange(region) {
        this.setState({ region });
      }
    render(){
        return (
          <View style={{flex:1}}>
              <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>  
                <SearchBar placeholder="Tìm kiếm"
                    lightTheme round editable={true}
                    inputContainerStyle={{height:30, backgroundColor:'white'}}
                    value={this.state.search}
                    containerStyle={styles.searchstyle} 
                    onChangeText={this.updateSearch} />
            </View>
            <View style={{ position:'relative',height:142, marginTop:5  }}>
                <ScrollView>
                {
                    this.state.re.map((item)=>{
                        return (
                            <View style={{height:30, borderBottomWidth:1, borderBottomColor:'#CCCCCC', marginTop:5}}>
                                <TouchableOpacity onPress={()=> this.ChangeSearchText(item.properties.name, item.geometry.coordinates[0],item.geometry.coordinates[1],item.Id)} style={{ flex: 1 }}>
                                    <Text style={{marginLeft:20}}
                                          key={item.Id}
                                    >{item.properties.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
                </ScrollView>
            </View>
            <MapView style={{flex:1}}
                    initialRegion={this.state.region}
                    onRegionChange={this.onRegionChange}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
                    onRegionChangeComplete={this.onChangeValue}>
                <Marker
                  coordinate={this.state.region}
                  title="title"
                  key={this.state.Id}
                  description="description"
                />
            </MapView>
            <View style={{marginTop:DEVICE_HEIGHT/2,marginLeft:DEVICE_WIDTH/2, position:'absolute'}}>
                <Ionicons name="location-sharp" size={30} color="red" />                
            </View>
            <View style={{marginTop:DEVICE_HEIGHT-90,marginLeft:DEVICE_WIDTH-40, position:'absolute'}}>
                <TouchableOpacity style={{ flex: 1 }}>
                    <MaterialIcons name="my-location" size={30} color="#0080ff" />
                </TouchableOpacity>
            </View>
            <View style={{ height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
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
        justifyContent:'center',
        alignItems:'center'
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
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