import React, { useState } from 'react';
import { AntDesign, Ionicons, EvilIcons, Feather, MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Text, View, StyleSheet, SafeAreaView, Dimensions, ScrollView, StatusBar, useWindowDimensions, FlatList, Image } from 'react-native';
import { Svg } from 'react-native-svg';
import { Picker } from "native-base";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { VictoryPie } from "victory-native";
import { color } from 'react-native-elements/dist/helpers';
import { ForceTouchGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import { Item } from 'native-base';
import { Rating } from 'react-native-elements';

const random = (a, b) => Math.floor(Math.random() * b) + a;


function RenderRating() {
    const [parkingPicker, setParkingPicker] = React.useState(null);

    const dataRating = [
        {
            parkingid: "1",
            parkingname: 'Bãi gửi xe Duy Tân1',
            oneStar: 1,
            twoStar: 2,
            threeStar: 4,
            fourStar: 10,
            fiveStar: 14,
            totalStar: 32,
            average: 4.0
        },
        {
            parkingid: "2",
            parkingname: 'Bãi gửi xe Duy Tân2',
            oneStar: 1,
            twoStar: 1,
            threeStar: 1,
            fourStar: 1,
            fiveStar: 1,
            totalStar: 5,
            average: 3,
        },
        {
            parkingid: "3",
            parkingname: 'Bãi gửi xe Duy Tân3',
            oneStar: 1,
            twoStar: 2,
            threeStar: 4,
            fourStar: 10,
            fiveStar: 14,
            totalStar: 32,
            average: 4.1
        },
    ]

    const dataComment = [
        {
            id: "1",
            username: "Nguyen Van A",
            comment: "abc",
            rating: 3,
            date: "01/01/2021"
        },
        {
            id: "2",
            username: "Nguyen Van A",
            comment: "abc",
            rating: 4,
            date: "01/01/2021"
        },
        {
            id: "3",
            username: "Nguyen Van A",
            comment: "abc",
            rating: 4,
            date: "01/01/2021"
        },
        {
            id: "4",
            username: "Nguyen Van A",
            comment: "abc",
            rating: 5,
            date: "01/01/2021"
        }
    ]

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <View style={{ margin: 20, alignItems: 'center', marginBottom: 30, borderWidth: 0, borderColor: 'black', overflow: "hidden", height: 55, width: width * 0.8, backgroundColor: "#eee", borderRadius: 8 }}>
                    <Picker
                        style={styles.pickerParkingStyle}
                        onValueChange={(itemValue, itemIndex) => {
                            let parking = dataRating.filter(item => item.parkingid == itemValue)[0];
                            setParkingPicker(parking);
                        }}
                    >
                        {dataRating.map(item => (
                            <Picker.Item label={item.parkingname} value={item.parkingid} />
                        ))}
                    </Picker>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 60, fontWeight: '600' }}>{parkingPicker ? parkingPicker.average : 0}</Text>
                        <Rating startingValue={parkingPicker ? parkingPicker.average : 0} readonly={true} imageSize={15} />
                        <Text style={{ color: 'black', fontSize: 14, fontWeight: '600', marginTop: 5 }}>{parkingPicker ? parkingPicker.totalStar : 0}</Text>
                    </View>
                    <View>
                        <Rating startingValue="5" readonly={true} imageSize={22} />
                        <Rating startingValue="4" readonly={true} imageSize={22} />
                        <Rating startingValue="3" readonly={true} imageSize={22} />
                        <Rating startingValue="2" readonly={true} imageSize={22} />
                        <Rating startingValue="1" readonly={true} imageSize={22} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 14, lineHeight: 22 }}>{parkingPicker ? parkingPicker.fiveStar : 0}</Text>
                        <Text style={{ fontSize: 14, lineHeight: 22 }}>{parkingPicker ? parkingPicker.fourStar : 0}</Text>
                        <Text style={{ fontSize: 14, lineHeight: 22 }}>{parkingPicker ? parkingPicker.threeStar : 0}</Text>
                        <Text style={{ fontSize: 14, lineHeight: 22 }}>{parkingPicker ? parkingPicker.twoStar : 0}</Text>
                        <Text style={{ fontSize: 14, lineHeight: 22 }}>{parkingPicker ? parkingPicker.oneStar : 0}</Text>
                    </View>

                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 20, marginBottom: 10 }}>Bình luận</Text>
                    <View>
                        {dataComment.map((item, index) => (
                            <View key={item.id} style={{ backgroundColor: 'white', marginTop: 2 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={styles.avatar}>
                                        <Image
                                            source={require('../assets/images/ava.jpg')}
                                            resizeMode="cover"
                                            style={styles.image}
                                        ></Image>
                                    </View>
                                    <Text numberOfLines={1} style={{ marginLeft: 20, fontSize: 13, color: 'black', flex: 1, fontWeight: "600" }}>{item.username}</Text>
                                    <Text style={{ fontSize: 13, marginRight: 20 }}>{item.date}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingLeft: 20, marginBottom: 30 }}>
                                    <Text style={{ fontSize: 13, opacity: 0.8, color: 'black', flex: 1 }}>{item.comment}</Text>
                                </View>

                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>

    )


}

function RenderChart() {
    const [time, setTime] = useState(1);

    const colorsDefault = [
        "red", "lavender", "#40C4FF", "#FFC440",
        "gold", "blue", "purple", "#F17171", "#BBC940", "magenta",
    ];
    const [selectedParking, setSelectedParking] = React.useState(null)

    const data = [
        {
            id: '1',
            name: 'Bãi gửi xe Duy Tân1',
            total: 11500000,
        },
        {
            id: '2',
            name: 'Bãi gửi xe Duy Tân2',
            total: 2800000,
        },
        {
            id: '3',
            name: 'Bãi gửi xe Duy Tân3',
            total: 8538000,
        },
        {
            id: '4',
            name: 'Bãi gửi xe Duy Tânaaaaa aaaaaa aaaaaa',
            total: 21920000,
        },
    ]

    const timeUnit = [
        {
            name: "Hôm nay",
            id: 1,
        },
        {
            name: "Tháng này",
            id: 2
        },
        {
            name: "Năm",
            id: 3
        }
    ];

    //random số
    function shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    //xử lý số liệu biểu đồ
    function progressData() {
        let chartData = data.map((item, index) => {
            return {
                name: item.name,
                y: item.total,
                color: getColor(data.length)[index],
                id: item.id
            }

        })

        //lấy doanh thu > 0
        let filterData = chartData.filter(a => a.y > 0);

        let totalAmount = filterData.reduce((a, b) => a + (b.y || 0), 0);

        let dataResult = filterData.map((item) => {
            let ratio = (item.y / totalAmount * 100).toFixed(1);

            return {
                label: `${ratio}%`,
                y: Number(item.y),
                color: item.color,
                name: item.name,
                id: item.id
            }
        })

        return dataResult;
    }

    //Lấy màu
    function getColor(length) {
        let colors = [],
            tempArrayNum = [],
            arrNumberRandom = [],
            colorRandom = [];

        for (let i = 0; i < length; i++) {
            tempArrayNum.push(i);
        }

        arrNumberRandom = shuffle(tempArrayNum);

        for (let i = 0; i < length; i++) {
            colorRandom.push(colorsDefault[i]);
        }

        return colorRandom;
    }

    
    function setSelectedParkingByID(id) {
        let parking = data.filter(a => a.id == id)
        setSelectedParking(parking[0]);
    }

    function renderChart() {
        let dataChart = progressData();
        let colorScales = dataChart.map((item) => item.color)
        let totalAmount = dataChart.reduce((a, b) => a + (b.y || 0), 0);

        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Svg width={width} height={width - 20} style={{ alignItems: 'center', justifyContent: 'center', left: width * 0.1 }}>
                    <VictoryPie
                        standalone={false}
                        data={dataChart}
                        colorScale={colorScales}
                        labels={(datum) => `${datum.y}`}
                        radius={({ datum }) => (selectedParking && selectedParking.name == datum.name) ? width * 0.4 : width * 0.4 - 10}
                        innerRadius={width * 0.3 - 40}
                        labelRadius={({ innerRadius }) => (width * 0.4 + innerRadius) / 2.5}
                        style={{
                            labels: { fill: 'black' },
                            parent: {
                                ...styles.shadow
                            },
                        }}
                        width={width * 0.8}
                        height={width * 0.8}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let parkingid = dataChart[props.index].id
                                            setSelectedParkingByID(parkingid);
                                        }
                                    }]
                                }
                            }
                        }]}
                    />
                </Svg>
                <View style={{ position: 'absolute', top: '38%', left: '40%' }}>
                    <Text style={{ textAlign: 'center' }}>Doanh thu</Text>
                    <Text style={{ textAlign: 'center' }}>
                        {totalAmount}
                    </Text>
                </View>
            </View>
        )
    }

    //render chú thích
    function renderDataSummary() {
        let data = progressData()

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    marginBottom: 5,
                    backgroundColor: (selectedParking && selectedParking.name == item.name) ? item.color : 'white'
                }}
                onPress={() => {
                    let parkingid = item.id
                    setSelectedParkingByID(parkingid)
                }}
            >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: (selectedParking && selectedParking.name == item.name) ? 'white' : item.color,
                            borderRadius: 5
                        }}
                    />

                    <Text numberOfLines={2} style={{ marginLeft: 10, marginRight: 20, color: (selectedParking && selectedParking.name == item.name) ? 'white' : 'black' }}>{item.name}</Text>
                </View>

                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (selectedParking && selectedParking.name == item.name) ? 'white' : 'black' }}>{item.y} USD - {item.label}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <View style={{ padding: 10 }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                />
            </View>

        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 50, }}>
                <View >
                    <View style={{ paddingLeft: 10, margin: 20, marginBottom: 30, borderWidth: 0, borderColor: 'black', overflow: "hidden", height: 55, width: 200, backgroundColor: "#eee", borderRadius: 8 }}>
                        <Picker
                            style={styles.pickerStyle}
                            onValueChange={(itemValue, itemIndex) => {
                                setTime(itemValue);
                            }}
                        >
                            {timeUnit.map(item => (
                                <Picker.Item label={item.name} value={item.id} />
                            ))}
                        </Picker>
                    </View>
                    {renderChart()}
                    {renderDataSummary()}
                </View>
            </ScrollView>
        </View>
    )
}

function Statistic({ navigation }) {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Doanh thu' },
        { key: 'second', title: 'Đánh giá' },
    ]);
    const renderScene = SceneMap({
        first: RenderChart,
        second: RenderRating,
    });
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <TouchableOpacity style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginLeft: 20 }}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Thống kê</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <View style={{ height: height - 50, width: width }}>
                <TabView
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            renderLabel={({ route, color }) => (
                                <Text style={{ color: 'black' }}>
                                    {route.title}
                                </Text>
                            )}
                            style={{ backgroundColor: "#16f198", height: 40 }}
                        />
                    )}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: width, height: height - 50 }}
                />
            </View>
        </SafeAreaView>
    );
}

export default Statistic;

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    header: {
        textAlign: 'center',
        fontSize: 18,
        padding: 16,
        marginTop: 16,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    pickerTimeStyle: {
        height: 50,
        width: 200,
        color: '#344953',
        justifyContent: 'center',
    },
    pickerParkingStyle: {
        height: 50,
        width: "100%",
        color: '#344953',
        justifyContent: 'center',
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
    avatar: {
        justifyContent: "center",
        height: 40,
        alignItems: 'center'
    },
    image: {
        height: 30,
        width: 30,
        borderRadius: 20,
        marginLeft: 20,
    },
});