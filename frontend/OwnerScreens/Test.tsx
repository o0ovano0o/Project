import React, { Component } from "react";
import { View,SafeAreaView, Image,Text,StyleSheet,Dimensions, FlatList, Button} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import file  from '../assets/cityVN.json';
import Dropdown from "react-native-modal-dropdown";
import { Entypo,AntDesign } from '@expo/vector-icons';
import { showLocation } from 'react-native-map-link'
// menu slidebar
showLocation({
    latitude: 	21.016723992306602,
    longitude:	105.82653438672423,
    sourceLatitude: 21.033152872552428,  // optionally specify starting location for directions
    sourceLongitude: 105.8396621234715,  // not optional if sourceLatitude is specified
    title: 'Bãi đỗ xe Duy Tân 2',  // optional
    googleForceLatLon: true,  // optionally force GoogleMaps to use the latlon for the query instead of the title
    googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
    alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
    dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
    dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
    cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
    appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
    naverCallerName: 'com.example.myapp' // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.   
  })
export default class Test extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      temp: [],
      error: null,
      search: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

   getData = async ()  => {

    this.setState({ loading: true });
     try {
        this.setResult(file);
     } catch (e) {
        this.setState({ error: 'Error Loading content', loading: false });
     }
  };
  async fetchNewData(item){
    this.setState({ loading: true });
    await this.props.actions.searchByCoordinates(item.vt.lat,item.vt.lon);
    await this.props.actions.search5daysByCoordinates(item.vt.lat,item.vt.lon);
  }
  setResult = (res) => {
    this.setState({
      data: [],
      temp: res,
      error: res.error || null,
      loading: false
    });
  }
  renderHeader = () => {
    const availableHours = ["Gần tôi", "Xa nhất"];
      return <View>
                <SearchBar placeholder="Tìm kiếm"
                lightTheme round editable={true}
                inputContainerStyle={{height:30, backgroundColor:'white'}}
                value={this.state.search}
                containerStyle={styles.searchstyle} 
                onChangeText={this.updateSearch} />
                <Dropdown
                  defaultIndex={0}
                  options={availableHours}
                  style={styles.hoursDropdown}
                  defaultValue={ "Gần tôi"}
                  dropdownStyle={styles.hoursDropdownStyle}
                  />
          </View>;
  };

  updateSearch = search => {
        this.setState({ search }, () => {
            if (search.length < 1) {
                this.setState({
                    data: []
                });
                return;
            }

            this.state.data = this.state.temp.filter(function(item){
                return item.name.includes(search);
              }).map(function({id, name,address, vt}){
                return {id, name, address,vt};
            });
        });
  };

  render() {
    return (
      this.state.loading ?
        <View style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontFamily:'montserrat-700',fontSize:22, fontWeight:'bold' }}>Loadding {this.state.search}...</Text>
        </View> :
        <SafeAreaView style={{flex:1}}>
          <FlatList
              ListHeaderComponent={this.renderHeader}
              data={this.state.data}
              keyExtractor={item => {`${item.id}`}}
              renderItem={({ item }) => (
              <ListItem
                  roundAvatar
                  title={`${item.name}`}
                  containerStyle={{height:100}}
                  eyExtractor={item => {`${item.id}`}}
                  bottomDivider
                  onPress={
                    ()=> {
                      this.setState({ search: item.name})
                      this.fetchNewData(item)
                    }
                  }
              >
                <Image
                    source={require('../assets/images/p.png')}
                    resizeMode="cover"
                    style={styles.image}
                ></Image>
                <View style={{}}>
                  <Text style={{fontSize:16, fontWeight:'bold'}}>{item.name}</Text>
                  <Text style={{fontSize:12, color:'gray'}}>{item.address}</Text>
                  <View style={{flexDirection:'row'}}>
                    <View style={{flex:6,flexDirection:'row'}}>
                      <Entypo name="dot-single" size={20} color="gray" />
                      <Text style={{fontSize:12, color:'gray'}}>0.7km</Text>
                    </View>
                    <View style={{flex:1, marginTop:10}}>
                      <TouchableOpacity >
                          <AntDesign name="enviroment" size={20} color="#4da6ff" />
                      </TouchableOpacity>
                    </View>
                  </View>                
                </View>
                
              </ListItem>
          )}
        />
      </SafeAreaView>
    );
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
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
});