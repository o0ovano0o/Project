import { StyleSheet, Dimensions } from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

    export default StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white"   
        },
        image: {
            height: 50,
            width: 50,
            borderRadius: 40,
            marginLeft: 20,
            marginRight:10
        },
        imageparking: {
            height: height/3,
            width: width,
        },
        item:{
            flexDirection:'row',
            justifyContent:'center', 
            alignItems:'center',             
            height:40, width:width-60, 
            marginBottom:5,                         
            borderRadius:10, 
            backgroundColor:"#F4D03F"
        }, 
        textcar:{
            fontWeight:'normal', 
            fontSize:12, 
            marginTop:2,
            marginLeft:10,
            color:'black'
        },
        box:{
            flex:1,
            marginTop:20 
        },
        boxmain:{
            height:100, 
            alignItems:'center',
            marginTop:10
        },
        boxprice:{
            flex:3, 
            justifyContent:'center', 
            alignItems:'center', 
            borderRightWidth:1, 
            borderRightColor:'#CCCCCC'
        },
        boxtime:{
            flex:2, 
            justifyContent:'center', 
            alignItems:'center'
        },
        backgoundheader:{
            height:height/3, 
            position:'absolute', 
            backgroundColor:"#16f198", 
            width:width,
        }
          
          
        
    });