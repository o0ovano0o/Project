import { StyleSheet, Dimensions } from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

    export default StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white"   
        },
        item:{
            height:150,  
            borderRadius:20,
            borderColor:'#CCCCCC', 
            borderWidth:1, 
            margin:10, 
            justifyContent:'center', 
            alignItems:'center'
        }, 
        circle:{
            height:85, 
            width:85, 
            borderWidth:1, 
            borderColor:'#CCCCCC', 
            borderRadius:80, 
            justifyContent:'center', 
            alignItems:'center'
        },
        textcar:{
            fontWeight:'normal', 
            fontSize:12, 
            marginTop:5,
            marginLeft:10,
            color:'gray'
        },
        box:{
            flex:1, 
            borderWidth:0.5, 
            borderColor:'#CCCCCC',
            backgroundColor:'white', 
            marginLeft:20, 
            marginBottom:20, 
            marginRight:20
        },
        boxmain:{
            height:100, 
            flexDirection:'row', 
            borderBottomWidth:1, 
            borderBottomColor:'#CCCCCC'
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
            height:130, 
            position:'absolute', 
            backgroundColor:'#CCCCCC', 
            width:width,
        }
          
          
        
    });