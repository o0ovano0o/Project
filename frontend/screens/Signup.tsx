import React, { Component, useState } from "react";
import { StyleSheet, View,Text ,TextInput, } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Input } from 'native-base';
import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import PasswordText from "../components/Password";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";
import { ScrollView } from "react-native-gesture-handler";
import styles from '../Style/SignUpStyle';
import axios from "axios";
function Signup({ navigation: { navigate } }) {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [repassword, setrepassword] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [address, setaddress] = useState('');
  const [email, setemail] = useState('');
  const [isSelected, setisSelected] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{flex: 3, justifyContent: "center", marginTop:20}}>
          <Text style={styles.appname}>Đăng ký</Text>
      </View>

      <View style={styles.rect}>
        <View style={{flex: 5}}>
            <ScrollView scrollEnabled showsHorizontalScrollIndicator={false}>
                <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 10}}>Tên người dùng:</Text>
                <TextInput placeholder="Tài khoản" style={styles.materialFixedLabelTextbox}
                   onChangeText={username => setusername(username)}
                   defaultValue={username}></TextInput>
                <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 10}}>Số điện thoại:</Text>
                <TextInput  style={styles.materialFixedLabelTextbox} placeholder="Số điện thoại"
                 onChangeText={phonenumber => setphonenumber(phonenumber)}
                 keyboardType = 'numeric'
                 defaultValue={phonenumber} />
                <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 10}}>Mật khẩu:</Text>
                <TextInput secureTextEntry={true} style={styles.materialFixedLabelTextbox} placeholder="Mật khẩu"
                  onChangeText={password => setpassword(password)}
                  defaultValue={password}/>
                <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 10}}>Nhập lại mật khẩu:</Text>
                <TextInput secureTextEntry={true} style={styles.materialFixedLabelTextbox} placeholder="Nhập lại mật khẩu"
                 onChangeText={repassword => setrepassword(repassword)}
                 defaultValue={repassword} />
                <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 10}}>Địa chỉ:</Text>
                <TextInput  style={styles.materialFixedLabelTextbox} placeholder="Địa chỉ"
                onChangeText={address => setaddress(address)}
                defaultValue={address} />
                <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 10}}>Email:</Text>
                <TextInput  style={styles.materialFixedLabelTextbox} placeholder="Email"
                onChangeText={email => setemail(email)}
                defaultValue={email} />
                <View style={{flexDirection:"row",alignItems: 'center',marginLeft: 15,}}>
                    <CheckBox
                    value={isSelected}
                    onValueChange={setisSelected}/>
                    <Text style={{}}>Là chủ bãi đỗ?</Text>
                </View>
            </ScrollView>
        </View>
        <View style={{flex: 1, justifyContent: "center",alignItems: 'center'}}>
          <MaterialButtonViolet
            onPress={() => register(navigate, username, password,repassword,phonenumber,address,email,isSelected)}
            style={styles.materialButtonViolet}
            title="Đăng ký"
          ></MaterialButtonViolet>
        </View>

      </View>

      <View style={{flex: 2, alignItems: 'center',justifyContent: 'center', paddingTop: 10, flexDirection:"row"}}>
        <MaterialButtonViolet
        title="Đăng nhập"
        onPress={() =>
          navigate('Login')
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

async function register(navigate:any, username: string, password: string,repassword :string,phonenumber :string,address: string,email:string,isSelected:any) {
  var endpoint = '';
  if(isSelected) {
    endpoint = 'https://project3na.herokuapp.com/api/owner/register';
  } else {
    endpoint = 'https://project3na.herokuapp.com/api/customer/register';
  }
  if(password != repassword) {
    return alert('Mật khẩu không khớp. Vui lòng nhập lại.');
  }
  await axios
  .post(endpoint, {
        username,
        password,
        phonenumber,address,email
      })
  .then(async function (response) {
    alert('Tạo tài khoản thành công');
    if(response.data.success) {
      var data = JSON.stringify(response.data.data);
      navigate('Login');
    } else {
    }
  })
  .catch(function (error) {
  })
  .finally(function () {
  });
}



export default Signup;
