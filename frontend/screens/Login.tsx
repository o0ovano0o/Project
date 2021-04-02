import React, { Component } from "react";
import { StyleSheet, View,Text ,TextInput } from "react-native";
import { Input } from 'native-base';
import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import PasswordText from "../components/Password";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";
import styles from '../Style/LoginStyle';
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



export default Untitled1;
