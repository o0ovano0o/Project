import { StyleSheet, Dimensions } from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

    export default StyleSheet.create({
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
        alignSelf: 'center',
        marginBottom: 5
      },
          container: {
            flex:1,
            borderRadius:20,
            backgroundColor: "white",
            position:'absolute'
          },
          find:{
            marginTop:-10,
            marginBottom:10
          },
          modalContainer:{
            margin: 0,
            justifyContent: "flex-end"
          },
          modal:{
            flexDirection: "column",
            height:  height* 0.75,
            padding: 15 ,
            backgroundColor: "white",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
          },
          hoursDropdown: {
            borderRadius: 15 / 2,
            borderColor: "gray",
            borderWidth: 1,
            paddingLeft:10,
            paddingTop:10,
            marginRight: 16 / 2,
            width:200,
            height:40
          },
          hoursDropdownScan: {
            borderRadius: 15 / 2,
            borderColor: "gray",
            borderBottomWidth: 1,
            paddingLeft:10,
            paddingTop:10,
            marginRight: 16 / 2,
            width:300,
            height:40,
            color:'white',
            marginBottom:20,
            fontSize:14
          },
          hoursDropdownStyleScan: {
            marginLeft: -10,
            paddingHorizontal: 10 / 2,
            marginVertical: -(10 + 1),            
            width:300,
            marginTop:10
          },
          hoursDropdownStyle: {
            marginLeft: -10,
            paddingHorizontal: 10 / 2,
            marginVertical: -(10 + 1)
          },
          accept:{
            height: 40,
            width: 120,
            borderWidth: 1,
            borderColor: "rgba(35,225,142,1)",
            borderRadius: 6,
            shadowColor: "rgba(0,0,0,1)",
            shadowOffset: {
              width: 0,
              height: 3
            },
            margin:10
          },
          accept2:{
            height: 40,
            width: 300,
            borderWidth: 1,
            borderColor: "rgba(35,225,142,1)",
            borderRadius: 6,
            shadowColor: "rgba(0,0,0,1)",
            shadowOffset: {
              width: 0,
              height: 3
            },
            margin:10
          },
          modeladd:{
            flex:11,
            borderTopWidth:1,
            borderColor:'gray',
            flexDirection: "column",
            padding: 10 ,
            backgroundColor: "white",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
          },
          button:{
            flex:4,
            flexDirection: "column",
            padding: 10 ,
            backgroundColor: "white",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
          },
          tabback:{
              height:50,
              width:width,
              backgroundColor: "#16f198"   ,
              justifyContent:'center',
              alignItems:'center',
              flexDirection:'row'
          },
          profile:{
              height: height-110,
              width: width,
              marginTop:10
          },
          image:{
            height:200,
            width:200,
          },
          item:{
            height:150,
            borderColor:"#CCCCCC",
            borderWidth:1,
            borderRadius:20,
            marginHorizontal:20,
            marginBottom:10
          },
          itemimage:{
            flex:2,
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row'
          },
          namecar:{
            fontWeight:'bold',
            fontSize:16,
            marginTop:10,
            marginLeft:10
          },
          textcar:{
            fontWeight:'normal',
            fontSize:12,
            marginTop:5,
            marginLeft:10,
            color:'gray'
          },
          icondelete:{
            position:'absolute',
            right:10,
            top:10
          },
          circle:{
            height:60,
            width:60,
            borderWidth:1,
            borderRadius:60,
            justifyContent:'center',
            alignItems:'center',
            borderColor:'gray'
          }

    });