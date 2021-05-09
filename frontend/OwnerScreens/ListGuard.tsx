import * as React from 'react';
import {
    StatusBar, FlatList, Image, Animated, Text, View, Dimensions, TouchableHighlight
    , StyleSheet, Easing, SafeAreaViewBase, SafeAreaView, Button
} from 'react-native';
import { AntDesign, Ionicons, Fontisto } from '@expo/vector-icons';
import MaterialButtonViolet from "../components/MaterialButtonViolet";
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import faker from 'faker';
import axios from 'axios';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

faker.seed(10);

const DATA = [...Array(10).keys()].map((_, i) => {
    return {
        key: faker.random.uuid(),
        image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['men'])}/${faker.random.number(60)}.jpg`,
        name: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
    };
});

const SPACING = 16;
const AVATAR_SIZE = 70;
const BG_IMG = 'https://images.pexels.com/photos/5326901/pexels-photo-5326901.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

function ListGuard({ navigation }) {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const [guards, setGuards] = React.useState([]);
    React.useEffect(() => {
        getGuardList();
    }, []);
    const getGuardList = async () => {
        await axios
            .get('https://project3na.herokuapp.com/api/owner/guards')
            .then(async function (response) {
                setGuards(response.data.data);
            });
    }
    const deleteGuard = async (userid: any) => {
        //alert('1');
        try {
            await axios
                .delete(`https://project3na.herokuapp.com/api/owner/guard/${userid}`)
                .then(async function (response) {
                   // alert(response.data.msg);
                    getGuardList();
                });
        } catch (error) {

        }

    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#e3e3e3',
            }}>

            <Image
                source={{ uri: BG_IMG }}
                style={StyleSheet.absoluteFillObject}
                blurRadius={80}
            />
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <TouchableHighlight onPress={() => navigation.push('CustomerProfile')} style={{ flex: 1, alignItems: 'center' }}>
                    <AntDesign name="left" size={24} color="gray" />
                </TouchableHighlight>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Danh sách bảo vệ</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            {/* <Image
                source={{ uri: BG_IMG }}
                style={StyleSheet.absoluteFillObject}
                blurRadius={80}
            /> */}
            <TouchableOpacity onPress={() => navigation.push('AddGuard')} style={{ flexDirection: 'row', justifyContent: "flex-end", marginRight: 10, marginBottom: 10 }}>
                <Ionicons name="add-circle-outline" size={35} color="black" />
            </TouchableOpacity>
            <Animated.FlatList
                data={guards}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                keyExtractor={item => item.userid}
                contentContainerStyle={{
                    padding: SPACING,
                    paddingTop: 20
                }}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 3),
                    ]
                    const opacityInputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 2),
                    ]
                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0]
                    })
                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange: [1, 1, 1, 0]
                    })
                    return (
                        <Animated.View
                            style={{
                                flexDirection: 'row',
                                padding: SPACING,
                                marginBottom: SPACING,
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: 20,
                                shadowColor: "#000",


                                shadowOffset: {
                                    width: 0,
                                    height: 10
                                },
                                opacity,
                                shadowOpacity: 0.3,
                                shadowRadius: 20,
                                transform: [{ scale }],
                                alignItems: "center",
                                alignContent: "space-between",
                            }}
                        >
                            <View style={{ flex: 1, marginRight: AVATAR_SIZE / 2 }}>
                                <Image
                                    source={{ uri: "https://cdn1.iconfinder.com/data/icons/avatar-3/512/Security-512.png" }}
                                    style={{
                                        width: AVATAR_SIZE,
                                        height: AVATAR_SIZE,
                                        borderRadius: AVATAR_SIZE,
                                    }}
                                />
                            </View>

                            <View style={{ flex: 3 }}>
                                <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '700', flex: 1 }}>{item.username}</Text>
                                <Text numberOfLines={1} style={{ fontSize: 14, opacity: 0.7, flex: 1 }}>{item.phonenumber}</Text>
                                <Text numberOfLines={1} style={{ fontSize: 12, opacity: 0.8, color: '#0099cc', flex: 1 }}>{item.parkingname} - {item.parkingaddress}</Text>
                            </View>
                            <Button
        title="Sửa"

        color='#FFD700'
        onPress={() => navigation.push('EditGuard', {data: item})}
      />
    <View style={{width:10}}></View>
                            <Button
        title="Xóa"
        color='#FF6347'
        onPress={() => deleteGuard(item.userid)}
      />

                                {/* <TouchableHighlight onPress={() =>alert('1')}>
                                <Animated.View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                                                                <AntDesign  name='delete' size={25} style={styles.icondelete} />
                                                                </Animated.View>
                                </TouchableHighlight> */}


                    </Animated.View>
                )
            }}
        />
        <View style={{ height: 50, backgroundColor: "gray" }}></View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    icondelete: {
        position: 'absolute',
        right: 5,
    },
    tabback: {
        height: 50,
        width: width,
        backgroundColor: "#16f198",
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#CCCCCC",
        flexDirection: 'row'
    },
})

export default ListGuard;