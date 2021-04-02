import { StyleSheet, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

    export default StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff'
            
        },
        headerTitle: {
            color: "gray"
        },
        headerLocation: {
            fontSize: 14,
            fontWeight: "500",
            paddingVertical: 15 / 3
        },
        active: {
            borderColor: "red"
          },
        markerPrice: { color: "red", fontWeight: "bold" },
        markerStatus: { color: "gray" },
        map: {
            flex: 3
            
          },
        header:{
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 15 * 2,
            paddingTop: 15 * 2.5,
            paddingBottom: 10 * 1.5
        },
        parkings:{
            position: 'absolute',
            right:2,
            left:6,
            bottom:24
        },
        parking:{
            backgroundColor:'white',       
            borderRadius:6,
            padding:12,
            marginHorizontal:24,
            width: DEVICE_WIDTH-60,
            height:100,
            flexDirection:'row'
        },
        hoursDropdown: {
            borderRadius: 15 / 2,
            borderColor: "gray",
            borderWidth: 1,
            padding: 15,
            marginRight: 16 / 2
        },
        
        logo:{
            width:70,
            height:70
        },
        parkingIcon: {
            flexDirection: "row",
            justifyContent: "space-between"
        },
        buy: {
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: 10 * 1.5,
            paddingVertical: 15,
            backgroundColor: 'red',
            borderRadius: 6
        },
        buyTotal: {
            flex: 1,
            justifyContent: "space-evenly"
        },
            buyTotalPrice: {
            color: 'white',
            fontSize: 20,
            fontWeight: "600",
            paddingLeft: 20 / 4
        },
        buyBtn: {
            flex: 0.5,
            justifyContent: "center",
            alignItems: "flex-end"
        },
        parkingInfo: {
            justifyContent: "space-evenly",
            marginHorizontal: 5 * 1.5
        },
        hoursDropdown: {
            borderRadius: 10 / 2,
            borderColor: "gray",
            borderWidth: 1,
            padding: 10,
            marginRight: 10 / 2
          },
        hoursDropdownOption: {
            padding: 5,
            fontSize: 14 * 0.8
        },
        hoursDropdownStyle: {
            marginLeft: -10,
            paddingHorizontal: 10 / 2,
            marginVertical: -(10 + 1)
        },
        marker:{
            backgroundColor:"white",
            shadowColor: "black",
            shadowOffset: {
            width: 0,
            height: 6
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            borderRadius:24,
            padding:8,
            flex:1,
            flexDirection:'row'  ,
            borderWidth: 1, 
            borderColor: "white"     
        },
        modalContainer: {
            margin: 0,
            justifyContent: "flex-end"
        },
        modal: {
            flexDirection: "column",
            height:  DEVICE_HEIGHT* 0.75,
            padding: 15 * 2,
            backgroundColor: "white",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
        },
        modalInfo: {
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingVertical: 10,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderTopColor: "gray",
            borderBottomColor: "gray"
        },
        modalHours: {
            paddingVertical: 15
        },
        modalHoursDropdown: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 15
        },
        payBtn: {
            borderRadius: 6,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 15 * 1.5,
            backgroundColor: "red"
        },
        payText: {
            fontWeight: "600",
            fontSize: 15 * 1.5,
            color: "white"
        }
    });