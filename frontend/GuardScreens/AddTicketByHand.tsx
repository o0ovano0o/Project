import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
// import fs from 'react-native-fs';
// import com.rnfs.RNFSPackage;
import { StyleSheet, View, Image, Button, Platform, Text, Dimensions, SafeAreaView, StatusBar, ScrollView, AsyncStorage, TextInput } from "react-native";
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import styles from '../Style/ListTicketStyle';
import * as MediaLibrary from 'expo-media-library';
import axios from "axios";
import moment from "moment";
import { Picker } from "native-base";
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height



export default class AddTicketByHand extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            code: 1,
            codeVe:'',
            listTicket: new Array(),
            user: {},
            ticket: {},
            type: 'motobike',
            result: new FormData()
        }
    }

    SuccessTicketRender() {
        return (
            <ScrollView style={{ flex: 1, borderBottomColor: "#CCCCCC" }}>
                <View style={{ flex: 7, marginLeft: 5, marginTop: -5 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.namecar}>Bãi đỗ xe - {this.state.user.parkingname}</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="map-pin" size={14} color="gray" style={{ marginLeft: 8 }} />
                            <Text style={styles.textcar}>{this.state.user.parkingaddress}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: -15, width: width, alignItems: 'center' }}>
                        <Image
                            source={require('../assets/images/su.png')}
                            resizeMode="cover"
                            style={{ height: 180, width: 180 }}
                        ></Image>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 60, backgroundColor: 'white', flexDirection: 'row', marginTop: 10 }}>

                            <MaterialButtonViolet
                                onPress={() =>
                                    this.props.navigation.push("AddTicketByHand")
                                }
                                style={styles.accept2}
                                title="Tạo vé mới"
                            ></MaterialButtonViolet>
                        </View>
                    </View>

                </View>
            </ScrollView>
        );
    }
    async componentDidMount() {
        try {
            const me = this;
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    //   alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
            await me.getUser();
            let response;
            response = await axios
                .get(`https://project3na.herokuapp.com/api/default-ticket/${this.state.type}`);

            if (response.data.data && response.data.data.length) {
                response = response.data.data;
                me.setState({
                    listTicket: response,
                    ticket: response[0]
                })

            }
            else {
                this.setState({
                    listTicket: response,
                })
            }
        } catch (error) {
            //alert(JSON.stringify(error));
        }

    }
    async postPircture(base64: any) {
        try {

            if (!base64) {
                //alert(JSON.stringify(base64))
                return;
            }
            this.setState({
                result: new FormData()
            })
            var data = new FormData();
            data.append('image', base64);
            this.setState({
                result: data
            })



        } catch (error) {
           // alert(JSON.stringify(error));
        }

    }
    async createPicture() {
        try {
            var data = this.state.result;
            if (!this.state.result) {
                alert('Đã có lỗi xảy ra. Xin thử lại sau.');
                return;
            }
            // data.append('image', this.state.result);
            data.append('name', this.state.codeVe);
            data.append('key', '798414800a3b98fd7ff0b562e70781e8');
            const res = await axios.post('https://api.imgbb.com/1/upload', data, {
                headers: {

                    'Content-Type': 'multipart/form-data'
                },
            });

            return res;

        } catch (error) {
            //alert(JSON.stringify(error));
        }
    }
    async getData(itemValue) {
        let response;
        response = await axios
            .get(`https://project3na.herokuapp.com/api/default-ticket/${itemValue}`);

        if (response.data.data && response.data.data.length) {
            response = response.data.data;
            this.setState({
                listTicket: response,
                ticket: response[0]
            })
            //alert(JSON.stringify(this.state.listTicket));
        }
        else {
            this.setState({
                listTicket: response,
            })
        }
    }
    async getUser() {
        let value = await AsyncStorage.getItem('user');
        value = JSON.parse(value);
        // alert(JSON.stringify(this.props.route.params.data.parking))
        // if (!value.parkingid) value = Object.assign(value, {  });
        this.setState({ user: value });

    }
    async pickdImage() {
        //alert(this.state.code);
        try {

            let result = await ImagePicker.launchCameraAsync({
                quality: 1,
                base64: true,
                aspect: [3, 4],
                mediaTypes: ImagePicker.MediaTypeOptions.All
            });

            //alert(JSON.stringify(result));
            if (!result.cancelled) {
                this.setState({
                    image: result.uri,
                    result: result
                });
                //  this.postPircture(result.base64);
            }


        } catch (error) {
            //alert(JSON.stringify(error));
        }
    }
    AddTicketRender() {
        return (
            <ScrollView style={{ height: height * 0.5, borderBottomColor: "#CCCCCC" }}>
                <View style={{ flex: 7, marginLeft: 5, marginTop: -2 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.namecar}>Bãi đỗ xe - {this.state.user.parkingname}</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="map-pin" size={14} color="gray" style={{ marginLeft: 8 }} />
                            <Text style={styles.textcar}>{this.state.user.parkingaddress}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: -15, width: width, alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>TẠO VÉ</Text>
                    </View>
                    <View style={{}}>
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                            <Text>Biển số xe:</Text>
                            <TextInput placeholder="Nhập biển số xe"
                          style={{ marginLeft: 20 }}
                            onChangeText={(codeVe:any) => this.setState({codeVe})}
                            defaultValue={this.state.codeVe}
                        ></TextInput>

                        </View>
                        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <Text>Loại vé:  </Text>
                            <Picker

                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => {
                                    if (this.state.listTicket && this.state.listTicket.length)
                                        this.setState({
                                            ticket: this.state.listTicket.find(item => item.ticketid == itemValue)
                                        })
                                }}
                            >
                                {this.state.listTicket.map(ticket => (
                                    <Picker.Item key={ticket.ticketid} label={ticket.name} value={ticket.ticketid} />
                                ))}
                            </Picker>

                        </View>

                        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <Text>Loại xe:  </Text>
                            <Picker
                                selectedValue={this.state.type}
                                style={{ height: 50, width: 150 }}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({
                                        type: itemValue
                                    });
                                    this.getData(itemValue);
                                }}
                            >
                                <Picker.Item label="Ô tô" value="car" />
                                <Picker.Item label="Xe máy" value="motobike" />
                                <Picker.Item label="Xe đạp" value="bike" />
                            </Picker>
                            <View style={{ marginTop: 10 }}>
                                <Text>Giá vé: {this.state.ticket.price} đ </Text>
                            </View>
                        </View>
                        {/* <View style={{ marginTop: 10 }}>
                            <Text>Giá vé: 20.000 đ </Text>
                        </View> */}
                        <View style={{ marginTop: 10, flexDirection: 'row' }}>
                            <Text>Ngày gửi: {moment().format('DD/MM/YYYY')} </Text>
                            <Text style={{ marginLeft: 20 }}>Giờ vào: {moment().format('hh:mm')} </Text>
                        </View>


                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 60, backgroundColor: 'white', flexDirection: 'row', marginTop: 10 }}>
                            <MaterialButtonViolet
                                // onPress={() =>

                                // }
                                style={styles.accept}
                                title="Từ chối"
                            ></MaterialButtonViolet>
                            <MaterialButtonViolet
                                onPress={() => this.register(1, 2)}
                                style={styles.accept}
                                title="Xác nhận"
                            ></MaterialButtonViolet>
                        </View>
                    </View>

                </View>
            </ScrollView>
        );
    }
    async getAcess() {

        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                //   alert('Sorry, we need camera roll permissions to make this work!');
            }
        }

    }
    async pickImage() {
        try {

            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3],
                quality: 1,
                base64: true,
            });
            console.log(result.uri);
            //alert(JSON.stringify(result));
            if (!result.cancelled) {

                this.state.image = result.uri;
                this.state.result = result;
                // result.base64({
                //     image: result.base64,
                //     result:result
                // });
                //  this.postPircture(result.base64);
            }



        } catch (error) {
            //alert(JSON.stringify(error));
        }



    };

    async register(vehicleid: int, parkingid: int) {
        try {
            if(!this.state.codeVe) return alert('Thiếu thông tin biển số xe');
            const res = await this.createPicture();
            var pictureUrl = res?.data.data.display_url;

            var endpoint = '';
            endpoint = 'https://project3na.herokuapp.com/api/guard/transaction/active';
            var today = moment().format('DD/MM/YYYY');
            var now = moment().format('hh:mm');
            var Timeout = `${now} ${today}`;
            const me = this;
            await axios
                .post(endpoint, {
                    code:this.state.codeVe,
                    parkingid, Timeout
                })
                .then(async function (response) {
                    if (response.data.success) {
                        //alert(response.data.msg);
                    } else {
                        // alert(response.data.msg);
                        if(pictureUrl)
                        me.createTransaction(pictureUrl);

                    }
                })
                .catch(function (error) {
                    // handle error
                    // alert('Tạo vé thất bại');
                })
                .finally(function () {
                });
        } catch (error) {
            //alert(JSON.stringify(error));
        }
    }
    async createTransaction(url) {
        try {

            var reponse = await axios
                .post('https://project3na.herokuapp.com/api/guard/transaction', {
                    code: this.state.codeVe,
                    parkingid: parseInt('1'),
                    ticketID: parseInt(this.state.ticket.ticketid),
                    Timein: `${moment().format('hh:mm')} ${moment().format('DD/MM/YYYY')}`,
                    Timeout: "",
                    pictureUrl:url,
                    type:this.state.type,
                    TotalAmount: 0,
                    Status: 1,
                    typetimeticket: parseInt(this.state.ticket.typetime),
                    priceticket: parseInt(this.state.ticket.price),
                    nameticket: this.state.ticket.name,
                });
            //alert(reponse.data.msg);

            if (reponse.data.success) {
               this.setState({
                   code:2
               })
            }
        } catch (error) {

            alert(JSON.stringify({
                error,
                code: this.state.codeVe,
                parkingid: parseInt('1'),
                ticketID: parseInt(this.state.ticket.ticketid),
                Timein: `${moment().format('hh:mm')} ${moment().format('DD/MM/YYYY')}`,
                Timeout: "",
                pictureUrl:url,
                type:this.state.type,
                TotalAmount: 0,
                Status: 1,
                typetimeticket: parseInt(this.state.ticket.typetime),
                priceticket: parseInt(this.state.ticket.price),
                nameticket: this.state.ticket.name,
            }));
        }
    }
    render() {


        return (

            <SafeAreaView style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={true} />
                <View style={{ flex: 9 }}>
                    <View style={styles.tabback}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <AntDesign name="left" size={24} color="black" />
                        </View>
                        <View style={{ flex: 5, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tạo vé xe</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                        </View>
                    </View>
                    <View style={{ marginLeft: 20, marginTop: 15 }}>
                        <View style={{ height: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16 }}>THÔNG TIN XE</Text>
                        </View>
                        <View style={{ height: 150, width: width - 40, marginTop: 10 }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {/* <Button title="Pick an image from camer" onPress={() =>this.pickImage()}  />
                               <Image source={{ uri:this.state.image }} style={{ width: 200, height: 200 }} /> */}
                                <ImagePickerExample

                                    parentReference={this.postPircture.bind(this)}

                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.modeladd}>
                    {/* {this.addTicketRender()} */}
                    {
                        this.state.code == 1 &&
                        this.AddTicketRender()
                    }
                    {
                        this.state.code == 2 &&
                        this.SuccessTicketRender()
                    }
                    {/* <SuccessTicketRender></SuccessTicketRender> */}
                </View>
            </SafeAreaView>
        );
    }

}
function ImagePickerExample(props) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            setImage(result.uri);
            props.parentReference(result.base64);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}