import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function MaterialButtonViolet(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, props.style, props.title]}>
      <Text style={styles.dangNhập}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#23A67E",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: "#16F198"
  },
  dangNhập: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-regular"
  }
});

export default MaterialButtonViolet;
