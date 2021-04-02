import React, { Component } from "react";
import { StyleSheet, View,Text ,TextInput,CheckBox } from "react-native";
import { Input } from 'native-base';
import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import PasswordText from "../components/Password";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";
import { ScrollView } from "react-native-gesture-handler";
import styles from '../Style/SignUpStyle';
function Signup({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <View style={{flex: 3, justifyContent: "center", marginTop:20}}>
          <Text style={styles.appname}>Đăng ký</Text>
      </View>
      
      <View style={styles.rect}>    
        <View style={{flex: 5}}>
            <ScrollView scrollEnabled showsHorizontalScrollIndicator={false}>
                <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 10}}>Tên người dùng:</Text>
                <TextInput placeholder="Tài khoản" style={styles.materialFixedLabelTextbox}></TextInput>
                <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 10}}>Số điện thoại:</Text>
                <TextInput secureTextEntry={true} style={styles.materialFixedLabelTextbox} placeholder="Mật khẩu" value="" /> 
                <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 10}}>Mật khẩu:</Text>
                <TextInput secureTextEntry={true} style={styles.materialFixedLabelTextbox} placeholder="Mật khẩu" value="" />  
                <Text style={{justifyContent: "center", marginLeft: 15, marginTop: 10}}>Nhập lại mật khẩu:</Text>
                <TextInput secureTextEntry={true} style={styles.materialFixedLabelTextbox} placeholder="Nhập lại mật khẩu" value="" />        
                <View style={{flexDirection:"row",alignItems: 'center',marginLeft: 15,}}>
                    <CheckBox value={true} />
                    <Text style={{}}>Là chủ bãi đỗ?</Text>              
                </View>           
            </ScrollView>
        </View>   
        <View style={{flex: 1, justifyContent: "center",alignItems: 'center'}}>
          <MaterialButtonViolet
            onPress={() =>
              navigate('Root')
            }
            style={styles.materialButtonViolet}
            title="Đăng ký"
          ></MaterialButtonViolet>
        </View>
        
      </View>

      <View style={{flex: 2, alignItems: 'center',justifyContent: 'center', paddingTop: 10, flexDirection:"row"}}>
        <MaterialButtonViolet
        title="Đăng nhập"
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



export default Signup;
