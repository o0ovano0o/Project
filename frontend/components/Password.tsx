import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function PasswordText(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput placeholder="Label" style={styles.inputStyle}></TextInput>
      <Icon name="eye" style={styles.iconStyle}></Icon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  inputStyle: {
    color: "#000",
    paddingRight: 16,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 14,
    paddingBottom: 8,
    margin: 0
  },
  iconStyle: {
    color: "#616161",
    fontSize: 24,
    paddingRight: 8,
    margin: 0
  }
});

export default PasswordText;
