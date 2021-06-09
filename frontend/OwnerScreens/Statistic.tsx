import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Text, View, StyleSheet, SafeAreaView, Dimensions, ScrollView, StatusBar, AsyncStorage, RefreshControl, useWindowDimensions, FlatList } from 'react-native';
import { Svg } from 'react-native-svg';
import { Picker } from "native-base";
import { VictoryPie, VictoryAxis, VictoryLine, VictoryChart, VictoryTheme, VictoryScatter } from "victory-native";
import axios from "axios";
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { Rating } from 'react-native-elements';

const random = (a, b) => Math.floor(Math.random() * b) + a;

function Statistic({ navigation }) {
    const [time, setTime] = useState("day")
    const [refreshPage, setRefreshPage] = useState(true);
    const [selectedParking, setSelectedParking] = React.useState(null)
    const [dataParking, setDataParking] = useState([]);
    React.useEffect(() => {
        setRefreshPage(false);

        getDataParking();
    }, [time]);
    const getDataParking = async () => {
        await axios
            .get(`https://project3na.herokuapp.com/api/owner/analys-amount/${time}`)
            .then(async function (response) {
                if (response.data.success) {
                    setDataParking(response.data.data);
                    //alert(response.data.data[3].total);
                }
                setRefreshPage(false);
            })
            .catch(function (error) {
                //alert(error);
            })
            .finally(function () {
            });
    }
    const refresh = () => {
        setRefreshPage(true);
        getDataParking();
    }
    const colorsDefault = [
        "red", "lavender", "#40C4FF", "#FFC440",
        "gold", "blue", "purple", "#F17171", "#BBC940", "magenta",
    ];

    // const dataParking = [
    //     {
    //         parkingid: '1',
    //         parkingname: 'Bãi gửi xe Duy Tân',
    //         total: 115000,
    //     },
    //     {
    //         parkingid: '2',
    //         parkingname: 'Bãi gửi xe Hồ Tùng Mậu',
    //         total: 280000,
    //     },
    //     {
    //         parkingid: '3',
    //         parkingname: 'Bãi gửi xe Xuân Thủy',
    //         total: 355000,
    //     },
    //     {
    //         parkingid: '4',
    //         parkingname: 'Bãi gửi xe Mai Dịch',
    //         total: 210000,
    //     },
    // ]

    const timeUnit = [
        {
            name: "Hôm nay",
            id: "day",
        },
        {
            name: "Tháng này",
            id: "month"
        }
    ];

    //random số
    function shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    //xử lý số liệu biểu đồ
    function progressData() {
        let chartData = dataParking.map((item, index) => {
            return {
                name: item.parkingname,
                y: item.total,
                color: getColor(dataParking.length)[index],
                id: item.parkingid
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
        let parking = dataParking.filter(a => a.parkingid == id)
        setSelectedParking(parking[0]);
    }

    function renderChart() {
        let dataChart = progressData();
        let colorScales = dataChart.map((item) => item.color)
        let totalAmount = dataChart.reduce((a, b) => a + (b.y || 0), 0);
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                { totalAmount > 0 &&
                    <Svg width={width} height={width - 20} style={{ alignItems: 'center', justifyContent: 'center', left: width * 0.1 }}>
                        <VictoryPie
                            standalone={false}
                            data={dataChart}
                            colorScale={colorScales}
                            labels={(datum) => `${datum.y}`}
                            radius={({ datum }) => (selectedParking && selectedParking.parkingid == datum.id) ? width * 0.4 : width * 0.4 - 10}
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
                }
                { totalAmount > 0 ?
                    <View style={{ position: 'absolute', top: '38%', left: '40%' }}>

                        <Text style={{ textAlign: 'center' }}>Doanh thu</Text>
                        <Text style={{ textAlign: 'center' }}>
                            {totalAmount}
                        </Text>

                    </View>
                    : <Text style={{ textAlign: 'center', fontSize: 16, padding: 10 }}>Các bãi đỗ xe bạn quản lý chưa phát sinh giao dịch</Text>

                }
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
                    backgroundColor: (selectedParking && selectedParking.parkingid == item.id) ? item.color : 'white'
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
                            backgroundColor: (selectedParking && selectedParking.parkingid == item.id) ? 'white' : item.color,
                            borderRadius: 5
                        }}
                    />

                    <Text numberOfLines={2} style={{ marginLeft: 10, marginRight: 20, color: (selectedParking && selectedParking.parkingid == item.id) ? 'white' : 'black' }}>{item.name}</Text>
                </View>

                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (selectedParking && selectedParking.parkingid == item.id) ? 'white' : 'black' }}>{item.y} Đ - {item.label}</Text>
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
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                hidden={true} />
            <View style={styles.tabback}>
                <TouchableOpacity onPress={()=> navigation.goBack()} style={{ flex: 1, alignItems: 'center', flexDirection: 'row', marginLeft: 20 }}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Thống kê</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={refreshPage}
                        onRefresh={() => refresh()}
                    />}
                    contentContainerStyle={{ paddingBottom: 50, }}>
                    <View >
                        <View style={{ paddingLeft: 10, margin: 20, marginBottom: 30, borderWidth: 0, borderColor: 'black', overflow: "hidden", height: 55, width: 200, backgroundColor: "#eee", borderRadius: 8 }}>
                            <Picker
                                style={styles.pickerTimeStyle}
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
        </SafeAreaView>

    )
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
        paddingHorizontal: 10,
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