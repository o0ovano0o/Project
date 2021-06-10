import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
import MapView from "react-native-maps";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import { ListItem, SearchBar } from "react-native-elements";
import axios from "axios";
import * as Location from 'expo-location';
const { Marker } = MapView;
const latitudeDeltaE = 0.0122;
const longitudeDeltaE = 0.0121;
// https://maps.vietmap.vn/api/reverse?point.lat=21.054677&point.lon=105.786557&api-version=1.1&apikey=9a9e3d1c0a501c7d4a69c6c5536cd49de806ea33d494114e
export default class FindAddress extends Component {
    state = {
        ref: {},
        region: {
            latitude: 21.027763,
            longitude: 105.834160,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121

        },
        currentregion: {
            latitude: 21.027763,
            longitude: 105.834160,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121
        },
        search: '',
        address: '',
        text: '',
        re: [],
        Id: ''
    }

    onChangeValue = async (region) => {

        this.setState({
            region: region
        })
        var me = this;
        try {
            let url = `https://maps.vietmap.vn/api/reverse?api-version=1.1&apikey=9a9e3d1c0a501c7d4a69c6c5536cd49de806ea33d494114e&layers=street&point.lat=${this.state.region.latitude}&point.lon=${this.state.region.longitude}`
            await axios
                .get(url)
                .then(async function (response) {

                    me.setState({
                        text: response.data.data.features[0].properties.label,
                        address: response.data.data.features[0].properties.label
                    });
                }).catch(function (error) {

                    Alert.alert("Cảnh báo","Vị trí chưa được gán định vị");
                })
        } catch (error) {

        }

    }
    async componentDidMount() {
       // alert(JSON.stringify(this.props.route.params));
        await this.getCurrentLocation();

    }
    updateSearch = async (search) => {
        var me = this;
        this.setState({ search });
        if (!search) {
            me.setState({
                re: new Array()
            });
        }
        const url = `https://maps.vietmap.vn/api/autocomplete?api-version=1.1&apikey=9a9e3d1c0a501c7d4a69c6c5536cd49de806ea33d494114e&text=${search}`
        await axios
            .get(url)
            .then(async function (response) {
                if(response.data.data.features)
                me.setState({
                    re: response.data.data.features
                });

            })
            .catch(function (error) {
                 Alert.alert("Thông báo","Vị trí chưa được gán định vị");
            })
            .finally(function () {
            });
    }
    async getCurrentLocation() {
        var me = this;
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Warning','Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        me.setState({
            currentregion: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121

            }
        });
        this.setState({ region: this.state.currentregion })
        this.state.ref.animateToRegion(
            // (new Array()).push(me.state.region),
            me.state.region,
            true, // not animated
        );


    }
    ChangeSearchText = async (search, region, Id) => {
        this.setState({ search });
        this.setState({
            region: {
                latitude: parseFloat(region.coordinates[1]),
                longitude:  parseFloat(region.coordinates[0]),
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121,
            },
            Id: Id,
            re: new Array()
        });
        // alert(JSON.stringify({
        //     latitude: parseFloat(region.coordinates[1].toFixed(5)),
        //     longitude: parseFloat(region.coordinates[0].toFixed(5)),
        //     latitudeDelta: 0.0122,
        //     longitudeDelta: 0.0121,
        // }));
        this.state.ref.animateToRegion(
            // (new Array()).push(me.state.region),
            {
                latitude: parseFloat(region.coordinates[1]),
                longitude:  parseFloat(region.coordinates[0]),
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121,
            },
            true, // not animated
        );


    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    animated={true}
                    hidden={true} />
                <View style={styles.tabback}>
                    <SearchBar placeholder="Tìm kiếm"
                        lightTheme round editable={true}
                        inputContainerStyle={{ height: 30, backgroundColor: 'white' }}
                        value={this.state.search}
                        containerStyle={styles.searchstyle}
                        onChangeText={this.updateSearch} />
                </View>
                <MapView style={{ flex: 1 }}
                    initialRegion={this.state.currentregion}
                    region={this.state.region}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    ref={(ref) => { this.state.ref = ref }}
                    showsMyLocationButton={true}
                    onRegionChangeComplete={this.onChangeValue}>
                    <Marker
                        coordinate={this.state.region}
                        title="title"
                        key={this.state.Id}
                        description="description"
                    />
                </MapView>
                <View style={{ position: 'absolute', height: 155, marginTop: 52 }}>
                    <ScrollView>
                        {
                            this.state.re.map((item) => {
                                return (
                                    <View key={item.Id} style={{ height: 40, borderBottomWidth: 1, backgroundColor: 'white', borderBottomColor: '#CCCCCC', width: DEVICE_WIDTH, justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.ChangeSearchText(item.properties.label, item.geometry, item.Id)} style={{ flex: 1, justifyContent: 'center' }}>
                                            <Text style={{ marginLeft: 20 }}
                                                key={item.Id}
                                            >{item.properties.label}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{
                    height: 50, width: DEVICE_WIDTH - 20,
                    alignItems: 'center', borderRadius: 10,
                    position: 'absolute',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    marginTop: DEVICE_HEIGHT / 2 - 30, marginLeft: 10
                }}>
                    <Text style={{ margin: 10, marginTop: 15, textAlign: 'center' }}>{this.state.text}</Text>
                </View>
                <View style={{ marginTop: DEVICE_HEIGHT / 2 + 9, marginLeft: DEVICE_WIDTH / 2 - 15, position: 'absolute' }}>
                    <Ionicons name="location-sharp" size={30} color="red" />
                </View>

                <View style={{ marginTop: DEVICE_HEIGHT - 100, marginLeft: DEVICE_WIDTH - 40, position: 'absolute' }}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.getCurrentLocation()}>
                        <MaterialIcons name="my-location" size={30} color="#0080ff" />
                    </TouchableOpacity>
                </View>
                <View style={{ height: 60, backgroundColor: 'white', alignItems: 'center', }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialButtonViolet
                            onPress={() => this.props.navigation.push('AddParking', { data:{
                                obj:this.props.route.params.data,
                                region: this.state.region,
                                address: this.state.text
                            }  })}
                            style={styles.button}
                            title="Xác nhận địa chỉ"
                        ></MaterialButtonViolet>
                    </View>
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
        height: 60,
        width: DEVICE_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
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
    hoursDropdown: {
        borderRadius: 15 / 2,
        borderColor: "gray",
        borderWidth: 1,
        padding: 15,
        marginRight: 16 / 2
    },
    hoursDropdownOption: {
        padding: 5,
        fontSize: 14 * 0.8
    },
    hoursDropdownStyle: {
        marginLeft: -10,
        paddingHorizontal: 10 / 2,
        marginVertical: -(10 + 1)
    },
    button: {
        height: 40,
        width: 250,
        borderWidth: 1,
        borderColor: "rgba(35,225,142,1)",
        borderRadius: 6,
    },
    searchstyle: {
        height: 45,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: 'white',
        width: DEVICE_WIDTH - 20
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 70,
        marginLeft: -10,
    }
})