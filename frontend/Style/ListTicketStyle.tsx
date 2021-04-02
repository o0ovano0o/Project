import { StyleSheet, Dimensions } from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

    export default StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white"   
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
          tabback:{
              height: 50,
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