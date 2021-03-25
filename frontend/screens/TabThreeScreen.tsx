import React, { Component } from "react";
import { StyleSheet, View, Image, Text, ImageBackground } from "react-native";
import { Dimensions } from "react-native";
import MaterialButtonViolet from '../components/MaterialButtonViolet';
import MaterialButtonViolet1 from '../components/MaterialButtonViolet1';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


function Untitled(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/start.png')}
        resizeMode="cover"
        style={styles.image}
      ></Image>
      <Text style={styles.baiDỗXeLisa}>Bãi đỗ xe Lisa</Text>
      <MaterialButtonViolet
        style={styles.materialButtonViolet2}
      ></MaterialButtonViolet>
      <MaterialButtonViolet1
        style={styles.materialButtonViolet1}
      ></MaterialButtonViolet1>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16f198"
  },
  image: {
    width: width,
    height: 252,
    marginTop: 200,

  },
  baiDỗXeLisa: {
    fontFamily: "montserrat-700",
    color: "rgba(48,60,68,1)",
    fontSize: 28,
    marginTop: -331,
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
    marginTop: 376,
    alignSelf: 'center'
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
    marginTop: 20,
    alignSelf: 'center'
  }
});

export default Untitled;
