import React, { Component } from "react";
import { View, SafeAreaView, Image, StyleSheet, Dimensions, FlatList, Alert } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import {  Button, Container, Header, Icon, Input, Item, Text } from 'native-base';
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Entypo, AntDesign } from '@expo/vector-icons';
import { showLocation } from 'react-native-map-link'
import axios from "axios";
import * as Location from 'expo-location';
import Geolocation from '@react-native-community/geolocation';
export default class FindParking extends Component {
  state = {
    loading: false,
    data: [],
    temp: [],
    error: null,
    search: '',
    parkings: [],
    currentregion: {},
    latcurr: '',
    lngcurr: ''
  };
  constructor(props) {
    super(props);
  }

 componentDidMount() {
    this.getParking();

  }
  async getParking() {
    var me = this;
    try {
      await this.getCurrentLocation();
      const params = {
        lat: this.state.latcurr.toString(),
        long: this.state.lngcurr.toString(),
        locationname: this.state.search,
      };
      await axios
        .get(`https://project3na.herokuapp.com/api/parkings/nearst`, {params})
        .then(async function (response) {
          if (response.data.success) {
            
             //alert(JSON.stringify(response.data));
            me.setState({
              parkings: response.data.data
            });
          }
          else Alert.alert("Thông báo",response.data.msg)
        })
        .catch(function (error) {
         // alert(error);
        })


    } catch (error) {
      //alert(error)
    }

  }
  renderHeader = () => {
    const availableHours = ["Gần tôi"];
    return( <Container>
      <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Tìm kiếm" defaultValue={this.state.search} onChangeText={this.updateSearch} />

          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        </Container>)
  };
  async getCurrentLocation() {
    var me = this;
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    me.setState({ currentregion: location.coords });
    me.setState({
      latcurr: me.state.currentregion.latitude,
      lngcurr: me.state.currentregion.longitude
    });
  }
  updateSearch = (search) => {
    this.setState({ search });
  };
  gotoGooogleMap(lat, lng, address) {
    var latcurr, lngcurr;
    //alert(lat);
    const me = this;
    navigator.geolocation.getCurrentPosition((data) => {
   
      me.setState({ currentregion: data.coords });
      me.setState({
        latcurr: me.state.currentregion.latitude,
        lngcurr: me.state.currentregion.longitude
      });
    }, ((error) => {
      alert('Lấy vị trí hiện tại thất bại')
    }))
   
    showLocation({
      latitude: lat,
      longitude: lng,
      sourceLatitude: me.state.currentregion.latitude,  // optionally specify starting location for directions
      sourceLongitude: me.state.currentregion.longitude,  // not optional if sourceLatitude is specified
      title: address,  // optional
      googleForceLatLon: true,  // optionally force GoogleMaps to use the latlon for the query instead of the title
      googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
      alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
      dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
      dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
      cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
      appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
      naverCallerName: 'com.example.myapp' // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
    })
  }
  currenlocation() {
    const me = this;
    navigator.geolocation.getCurrentPosition((data) => {
      me.setState({ currentregion: data.coords });
      me.setState({
        region: {
          latitude: me.state.currentregion.latitude,
          longitude: me.state.currentregion.longitude,
          longitudeDelta: longitudeDeltaE,
          latitudeDelta: latitudeDeltaE,
          active: true
        }
      });
      // alert(JSON.stringify(region));
      me.state.ref.animateToRegion(
        // (new Array()).push(me.state.region),
        me.state.region,
        true, // not animated
      );
      me.setState({ region });
    }, ((error) => {
      var me = this;
      var region = me.state.region;
      // alert(JSON.stringify(me.state));
      region = Object.assign(region,);
      // alert(JSON.stringify(region));
      me.setState({
        region: {
          latitude: me.state.currentregion.latitude,
          longitude: me.state.currentregion.longitude,
          longitudeDelta: longitudeDeltaE,
          latitudeDelta: latitudeDeltaE,
          active: true
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
  render() {
    return (
      <Container>
      <Header searchBar rounded style={{marginTop:30,
        flexDirection:'row' }}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Tìm kiếm" blurOnSubmit={true} onSubmitEditing={()=>this.getParking()} defaultValue={this.state.search} onChangeText={this.updateSearch} />

          </Item>

        </Header>
         <ScrollView style={{ flex: 1 }}>
        {
         this.state.parkings.length==0 &&
         (
           <View><Text>Không có bãi đỗ nào quanh bạn </Text></View>
         )
        }
      {
          this.state.parkings.map((item) => (
           <ListItem
            key={item.parkingid}
             containerStyle={{ height: 100 }}
             bottomDivider
             onPress={
               () => {
                 this.setState({ search: item.parkingname })
               }
             }
           >
             <Image
               source={require('../assets/images/p.png')}
               resizeMode="cover"
               style={styles.image}
             ></Image>
             <View style={{ flexDirection: 'column' }}>
               <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.parkingname}</Text>
               <View style={{ width: DEVICE_WIDTH / 2 + 30 }}>
                 <Text style={{ fontSize: 12, color: 'gray' }}>{item.address}</Text>
               </View>

               <View style={{ flexDirection: 'row' }}>
                 <View style={{ flex: 7, flexDirection: 'row' }}>
                   <Entypo name="dot-single" size={20} color="gray" />
                   <Text style={{ fontSize: 12, color: 'gray' }}>{item.distance} km</Text>
                 </View>
                 <View style={{ flex: 2 }}>
                   <TouchableOpacity onPress={
                     () => {
                       this.gotoGooogleMap(item.latitude, item.longitude, item.address)
                     }
                   }  >
                     <AntDesign name="enviroment" size={20} color="#4da6ff" />
                   </TouchableOpacity>
                 </View>
               </View>
             </View>

           </ListItem>
          ))
          }

     </ScrollView>

      </Container>

    )
  }
  // render() {
  //   return (
  //     <Container>
  //     <Header searchBar rounded>
  //     <Item>
  //       <Icon name="ios-search" />
  //       <Input placeholder="Search" />
  //       <Icon name="ios-people" />
  //     </Item>
  //     <Button transparent>
  //       <Text>Search</Text>
  //     </Button>
  //     <View>

  //     </View>
  //   </Header>
  //   </Container>
  //   )
  // }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  searchstyle: {
    height: 45,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'white',
    width: DEVICE_WIDTH - 50,
    marginTop: 25,
    marginLeft: 10,
    marginBottom: 10
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 70,
    marginLeft: -10,
  },
  hoursDropdown: {
    borderRadius: 5,
    borderColor: "#e0e0d1",
    borderWidth: 1,
    padding: 5,
    marginRight: 5,
    marginLeft: 10,
    marginBottom: 10,
    width: 100
  },
  hoursDropdownOption: {
    padding: 5,
    fontSize: 14 * 0.8
  },
  hoursDropdownStyle: {
    marginVertical: -20
  },
});