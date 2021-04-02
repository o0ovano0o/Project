import { StyleSheet, Dimensions } from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

    export default StyleSheet.create({
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