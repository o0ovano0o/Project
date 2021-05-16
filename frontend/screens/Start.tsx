import React, { Component } from "react";
import { StyleSheet, View, Image, Text, ImageBackground } from "react-native";
import { Dimensions } from "react-native";
import MaterialButtonViolet from '../components/MaterialButtonViolet';
import MaterialButtonViolet1 from '../components/MaterialButtonViolet1';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


function Untitled({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
        <View style={{flex: 2}}>
          <View style={{flex:2, justifyContent: "center"}}>
            <Text style={styles.appname}>Bãi đỗ xe 3AP</Text>
          </View>

          <View style={{flex:3}}>
            <Image
              source={require('../assets/images/start.png')}
              resizeMode="cover"
              style={styles.image}
            ></Image>
        </View>
        </View>

        <View style={{flex:1}}>
          <MaterialButtonViolet
            style={styles.materialButtonViolet2}
            title="Đăng nhập"
            onPress={() =>
              navigate('Login')
            }
          ></MaterialButtonViolet>

          <MaterialButtonViolet
            title="Đăng ký"
            style={styles.materialButtonViolet1}
            onPress={() =>
              navigate('Signup')
            }
          ></MaterialButtonViolet>

          <MaterialButtonViolet
            title="Tìm bãi đỗ"
            style={styles.materialButtonViolet1}
            onPress={() =>
              navigate('MainScreenOwner')
            }
          ></MaterialButtonViolet>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: "#16f198"
  },
  image: {
    width: width,
    height: height/3,
    bottom: 0
  },
  appname: {
    fontFamily: "montserrat-700",
    color: "rgba(48,60,68,1)",
    fontSize: 28,
    alignSelf: "center"
  },
  materialButtonViolet2: {
    height: 44,
    width: 158,
    borderWidth: 1,
    borderColor: "rgba(35,225,142,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 30,
    shadowOpacity: 0.33,
    shadowRadius: 10,
    alignSelf: 'center',
    marginBottom:5
  },
  materialButtonViolet1: {
    height: 44,
    width: 158,
    borderWidth: 1,
    borderColor: "rgba(35,225,142,1)",
    borderRadius: 6,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 30,
    shadowOpacity: 0.33,
    shadowRadius: 10,
    alignSelf: 'center',
    marginBottom: 5
  }
});

export default Untitled;
