import React, { Component } from "react";
import { StyleSheet, View,Text ,TextInput } from "react-native";
import { Input } from 'native-base';
import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import PasswordText from "../components/Password";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";

function Untitled1({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <View style={{flex: 3, justifyContent: "center"}}>
          <Text style={styles.appname}>Đăng nhập</Text>
      </View>
      
      <View style={styles.rect}>       
        <View style={{flex: 3, justifyContent: "center"}}>
            <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 25}}>Số điện thoai:</Text>
            <TextInput
              placeholder="Tài khoản"
              style={styles.materialFixedLabelTextbox}
            ></TextInput>
            <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 10}}>Mật khẩu:</Text>
            <TextInput secureTextEntry={true} style={styles.materialFixedLabelTextbox} placeholder="Mật khẩu" value="" />        
        </View>
        <View style={{flex: 1.5, justifyContent: "center",alignItems: 'center'}}>
          <MaterialButtonViolet
            onPress={() =>
              navigate('Root')
            }
            style={styles.materialButtonViolet}
            title="Đăng nhập"
          ></MaterialButtonViolet>
        </View>
        
      </View>

      <View style={{flex: 3, alignItems: 'center',justifyContent: 'center', paddingTop: 10}}>
        <MaterialButtonViolet
        title="Đăng ký"
          style={styles.materialButtonViolet2}
        ></MaterialButtonViolet>

        <MaterialButtonViolet
        title="Tìm bãi đỗ"
          style={styles.materialButtonViolet2}
        ></MaterialButtonViolet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(22,241,152,1)"
  },
  rect: {
    flex: 2,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 5,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 12,
    marginHorizontal: 20,
    minHeight: 180
  },
  materialFixedLabelTextbox: {
    minHeight: 40,
    maxHeight: 40,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(221,221,221,1)",
    borderRadius: 9,
    marginHorizontal: 10,
    marginTop: 10,
    paddingLeft:10,
    fontSize:14
  },
  materialRightIconTextbox: {
    minHeight: 40,
    maxHeight: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(221,221,221,1)",
    borderRadius: 6,
    marginHorizontal: 10,
    paddingLeft:10,
    marginTop: 10,
    fontSize:13
  },
  materialButtonViolet: {
    width: 134,
    height: 36,
  },
  appname: {
    fontFamily: "montserrat-700",
    color: "#121212",
    fontSize: 28,
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
    marginBottom: 10
  }
});

export default Untitled1;
