import React, { Component } from "react";
import { StyleSheet, View,Text ,Image,Dimensions,SafeAreaView,StatusBar,ScrollView,TextInput } from "react-native";
import {Camera} from 'expo-camera'
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from "react-native-gesture-handler";
export default class ScanQRCode extends React.Component{
    state={
        hasCameraPermission:true,
        type:Camera.Constants.Type.back
    };
    async componentDidMount(){
        const {status}= await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission:status === 'granted'})
    }
    render(){
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <View></View>
        }
        else if (hasCameraPermission === false){
            return <Text>No access</Text>
        } else {
            return(
                <View style={{flex:1}}>
                    <Camera style={{flex:1}} type={this.state.type}
                    flashMode = {Camera.Constants.FlashMode.auto} 
                    whiteBalance = {Camera.Constants.WhiteBalance.auto}
                    zoom = {0}
                    onBarCodeScanned={({ type, data }) => {
                                alert(`Bar code with type ${type} and data ${data} has been scanned!`);
                              }}
                    
                    >
                        <View style={{flex:1, backgroundColor:'gray', flexDirection:'row'}}>
                            <TouchableOpacity
                                style={{
                                    flex:1, 
                                    backgroundColor:'gray', 
                                    flexDirection:'row'}}
                                    onPress={()=>{
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front:Camera.Constants.Type.back,
                                        });
                                    }}
                            >
                                <Text
                                    style={{fontSize:18, marginBottom:10, color:'white'}}
                                >
                                    {''}Flip{''}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </Camera>
                </View>
            );
        }
    }
}