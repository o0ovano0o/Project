import React, { Component, useState } from "react";
import { StyleSheet, View,Text ,TextInput, Alert } from "react-native";
import { Input } from 'native-base';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import PasswordText from "../components/Password";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";
import styles from '../Style/LoginStyle';
function Untitled1({ navigation: { navigate } }) {
  const [phonenumer, setphonenumer] = useState('');
  const [password, setpassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={{flex: 3, justifyContent: "center"}}>
          <Text style={styles.appname}>Đăng nhập</Text>
      </View>

      <View style={styles.rect}>
        <View style={{flex: 3, justifyContent: "center"}}>
            <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 25}}>Số điện thoai:</Text>
            <TextInput
              onChangeText={phonenumer => setphonenumer(phonenumer)}
              defaultValue={phonenumer}
              keyboardType = 'numeric'
              placeholder="Tài khoản"
              style={styles.materialFixedLabelTextbox}
            ></TextInput>
            <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 10}}>Mật khẩu:</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.materialFixedLabelTextbox}
              placeholder="Mật khẩu"
              onChangeText={password => setpassword(password)}
              defaultValue={password} />
        </View>
        <View style={{flex: 1.5, justifyContent: "center",alignItems: 'center'}}>
          <MaterialButtonViolet
            onPress={() => login(navigate, phonenumer, password)}
            style={styles.materialButtonViolet}
            title="Đăng nhập"
          ></MaterialButtonViolet>
        </View>

      </View>

      <View style={{flex: 3, alignItems: 'center',justifyContent: 'center', paddingTop: 10}}>
        <MaterialButtonViolet
        title="Đăng ký"
        onPress={() =>
          navigate('Signup')
        }
          style={styles.materialButtonViolet2}
        ></MaterialButtonViolet>

        <MaterialButtonViolet
        title="Tìm bãi đỗ"
        onPress={() =>
          navigate('FindParking')
        }
          style={styles.materialButtonViolet2}
        ></MaterialButtonViolet>
      </View>
    </View>
  );
}

async function login(navigate:any, phonenumber: string, password: string) {
  await axios
  .post('https://project3na.herokuapp.com/api/user/login', {
    phonenumber : phonenumber.toString(),
        password
      })
  .then(async function (response) {
    // handle success
    if(response.data.success) {
      var data = JSON.stringify(response.data.data);
      await AsyncStorage.setItem(
        'user',
        data
      );
      navigate('Root');
    } else {
     Alert.alert("Lỗi",response.data.msg);
    }
  })
  .catch(function (error) {
    // handle error
   // alert(error);
  })
  .finally(function () {
  });
}



export default Untitled1;
