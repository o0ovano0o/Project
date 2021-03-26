import React, { Component } from "react";
import { StyleSheet, View,Text ,TextInput,CheckBox } from "react-native";
import { Input } from 'native-base';
import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import PasswordText from "../components/Password";
import MaterialButtonViolet from "../components/MaterialButtonViolet";
import MaterialButtonViolet1 from "../components/MaterialButtonViolet1";
import { ScrollView } from "react-native-gesture-handler";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(22,241,152,1)"
  },
  rect: {
    flex: 4,
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
    width: 140,
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
    marginBottom: 10, marginLeft:5
  }
});

export default Signup;
