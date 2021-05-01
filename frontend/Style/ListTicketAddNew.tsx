import { StyleSheet, Dimensions } from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

    export default StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white"
          },
          tabback:{
              height: 50,
              width:width,
              backgroundColor: "#16f198"   ,
              justifyContent:'center',
              alignItems:'center',
              borderBottomWidth:1,
              borderBottomColor:"#CCCCCC",
              flexDirection:'row'
          },
          searchstyle:{
            height:45,
            borderRadius:10,
            backgroundColor:'white',
            borderColor:'white',
            width:width-20
          },
          profile:{
              height: height-50,
              width: width,
          },
          image:{
            height:70,
            width:70,
            borderRadius:70,
            marginLeft:20,
          },
          item:{
            height:120,
            borderColor:"#CCCCCC",
            borderWidth:1,
            borderRadius:20,
            marginHorizontal:10,
            marginBottom:10,
            width:width- 50,
            flex:1
          },
          itemimage:{
            flex:2,
            justifyContent:'center',
            alignItems:'center',
          },
          itemimage1:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
          },
          namecar:{
            fontWeight:'bold',
            fontSize:14,
            marginTop:10,
            marginLeft:10
          },
          textcar:{
            fontWeight:'normal',
            fontSize:12,
            marginTop:5,
            marginLeft:10
          },
          icondelete:{
            position:'absolute',
            right:10,
            top:10
          },
          circle:{
            height:50,
            width:50,
            justifyContent:'center',
            alignItems:'center'
          }
    });