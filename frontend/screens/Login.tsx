import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from 'native-base';
import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import PasswordText from "../components/Password";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";

function Untitled1({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <Text style={styles.baiDỗXeLisa}>Bãi đỗ xe Lisa</Text>
      <View style={styles.rect}>
        <Input
          style={styles.materialFixedLabelTextbox}
        ></Input>
        <PasswordText style={styles.materialRightIconTextbox}></PasswordText>
        <MaterialButtonViolet
          onPress={() =>
            navigate('Root')
          }
          style={styles.materialButtonViolet}
          title="Đăng nhập"
        ></MaterialButtonViolet>
      </View>
       <MaterialButtonViolet
      title="Đăng ký"
        style={styles.materialButtonViolet2}
      ></MaterialButtonViolet>
      <MaterialButtonViolet
      title="Tìm bãi đỗ"
        style={styles.materialButtonViolet2}
      ></MaterialButtonViolet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(22,241,152,1)"
  },
  rect: {
    width: 350,
    height: 245,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 12,
    marginTop: 25,
    marginLeft: 25,
    marginBottom: 70
  },
  materialFixedLabelTextbox: {
    height: 43,
    width: 291,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(221,221,221,1)",
    borderRadius: 9,
    marginTop: 42,
    marginLeft: 13
  },
  materialRightIconTextbox: {
    height: 43,
    width: 291,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(221,221,221,1)",
    borderRadius: 6,
    marginTop: 30,
    marginLeft: 13
  },
  materialButtonViolet: {
    width: 134,
    height: 36,
    marginTop: 18,

    marginBottom: 15,
    marginLeft: 92
  },
  baiDỗXeLisa: {
    fontFamily: "montserrat-700",
    color: "#121212",
    fontSize: 28,
    marginTop: 100,
    alignSelf: "center"
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
    marginTop: 386,
    marginLeft: 105
  },
  materialButtonViolet2: {
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
    marginTop: 14,
    marginLeft: 105
  }
});

export default Untitled1;
