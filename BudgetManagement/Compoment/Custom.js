import * as React from 'react'
import { Button, TextInput, Text, View, StyleSheet, TouchableHighlight, ImageBackground, StatusBar, TouchableOpacity, FlatList, Image, Share, Modal, ScrollView, RefreshControl, Alert, SafeAreaView, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { API } from './API';
import Tooltip from 'react-native-walkthrough-tooltip';

var dem = 0;

const Custom = () => {

    const [reloading, setreloading] = useState(false)
    const [counter, setcounter] = useState(dem)
    const [showTip, setTip] = useState(false);
    const [showTip1, setTip1] = useState(false);
    const reloadData = React.useCallback(() => {

        setreloading(true);
        dem++;
        getListrecord();
        setcounter(dem);

        setTimeout(() => {
            setreloading(false);
        }, 2000);


    });

    const [data, setdata] = useState([]);
    const [id, setid] = useState();
    const [title, settitle] = useState();
    const [description, setdescription] = useState();
    const [price, setprice] = useState(0);
    const [username, setusername] = useState();
    const [userId, setuserId] = useState();
    const [isLoading, setisLoading] = useState(true);
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [isPickerShow1, setIsPickerShow1] = useState(false);
    const [isPickerShow2, setIsPickerShow2] = useState(false);
    const [date, setDate] = useState(new Date());
    const [category, setcategory] = useState([]);
    const [selectedValue, setSelectedValue] = useState();
    const [balance, setbalance] = useState(0);
    const [idbalance, setidbalance] = useState();
    const [isChecked, setChecked] = useState(false);
    const [startdate, setstartdate] = useState(new Date());
    const [enddate, setenddate] = useState(new Date());
    const [idrecord, setidrecord] = useState()
    const [pricesum, setpricesum] = useState([]);

    console.log("sd", startdate);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const currentdate = `${day}-${month}-${year}`;
    const handleValueChange = (itemValue) => {
        setSelectedValue(itemValue);
    };

    const showPicker = () => {
        setIsPickerShow(true);
    };
    const showPicker1 = () => {
        setIsPickerShow1(true);
    };
    const showPicker2 = () => {
        setIsPickerShow2(true);
    };

    const onChange = (event, value) => {
        setDate(value);
        if (Platform.OS === 'android') {
            setIsPickerShow(false);
        }
    };
    const onChange1 = (event, value) => {
        setstartdate(value);
        if (Platform.OS === 'android') {
            setIsPickerShow1(false);
        }
    };
    const onChange2 = (event, value) => {
        setenddate(value);
        if (Platform.OS === 'android') {
            setIsPickerShow2(false);
        }
    };

    useEffect(() => {
        const getData = async () => {

            try {
                const value = await AsyncStorage.getItem("login")
                console.log(value);
                if (value !== null) {
                    let parsed = JSON.parse(value)
                    console.log(parsed);
                    setuserId(parsed._id)
                    console.log(userId);
                    setusername(parsed.username)
                }
            } catch (e) {
                // error reading value
                console.log(e);
            }
            try {
                const value = await AsyncStorage.getItem("balance")
                console.log(value);
                if (value !== null) {
                    let parsed = JSON.parse(value)
                    console.log(parsed);
                    setbalance(parsed.balance);
                    console.log("log balance", balance);
                    setidbalance(parsed._id);
                    console.log("log idbalance", idbalance);
                }
            } catch (e) {
                // error reading value
                console.log(e);
            }



        }

        getData();
        getcategory();

        return () => {

        }
    }, [userId])



    const getcategory = () => {
        fetch('http://192.168.1.8:8000/api/category')
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setcategory(result.data);
                console.log(category);
            }).catch(err => {

            })
    }
    
    const getListrecord = () => {
        if (!userId) return;
        fetch(API.getrecord + userId)

            .then((data_res) => {
                return data_res.json();
            })
            .then((data_json) => {
                if (data_json.data) {
                    var date = new Date();
                    var firstDay = startdate.getTime();
                    var lastDay = enddate.getTime();
                    var first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
                    var last = first + 6; // last day is the first day + 6

                    console.log("first day", firstDay)
                    console.log("last day", lastDay)





                    const newData = data_json.data.sort((a, b) => new Date(b.date) - new Date(a.date)).filter(item => {
                        const sdate = new Date(item.date).getTime();

                        if (firstDay <= sdate && sdate <= lastDay) {
                            return true;
                        } return false;


                    }
                    );

                    setdata(newData);

                    setpricesum(newData.price);
                    console.log('log ra data', data);

                }








            })
            .catch((err) => {
                // nếu xảy ra lỗi thì log lỗi
                console.log(err);
            }).finally(() => setisLoading(false));

    }
    var ranges = [
        { divider: 1e18, suffix: 'E' },
        { divider: 1e15, suffix: 'P' },
        { divider: 1e12, suffix: 'T' },
        { divider: 1e9, suffix: 'G' },
        { divider: 1e6, suffix: 'M' },
        { divider: 1e3, suffix: 'K' }
    ];

    function formatNumber(n) {
        for (var i = 0; i < ranges.length; i++) {
            if (n >= ranges[i].divider) {
                return (n / ranges[i].divider).toString() + ranges[i].suffix;
            }
            if (n < 0) {
                return '-' + formatNumber(-n);
            }
        }
        return n.toString();
    }
    function formatNumber1(number) {
        if (number >= 1e9) {
            return (number / 1e9).toFixed(1) + 'B';
        }
        if (number >= 1e6) {
            return (number / 1e6).toFixed(1) + 'M';
        }
        if (number >= 1e3) {
            return (number / 1e3).toFixed(1) + 'k';
        }
        if (number < 0) {
            return '-' + formatNumber1(-number);
        }
        return number.toString();
    }
    const totalprice = data && data.map(
        item => item.price

    ).reduce((partialSum, a) => partialSum + a, 0);
    const totalpricespent = data && data.map(
        item => item.is_expense == true ? item.price : null

    ).reduce((partialSum, a) => partialSum + a, 0);
    const totalpricerei = data && data.map(
        item => item.is_expense == false ? item.price : null

    ).reduce((partialSum, a) => partialSum + a, 0);
    console.log('spend', totalpricespent);
    console.log('totalprice', totalprice);


    var s = formatNumber1(totalprice);
    var spend = formatNumber1(totalpricespent)
    var rei = formatNumber1(totalpricerei)





    renderItem = ({ item, index }) => {








        const XoaItem = () => {
            // if(! confirm ('Có đồng ý xóa không?') )
            //     return; 

            console.log("log delelte", API.deleterecord + item._id);
            fetch(API.deleterecord + item._id, {
                method: 'DELETE', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
                headers: { // Định dạng dữ liệu gửi đi
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    console.log(response.status);
                    getListrecord()
                    // nếu status là 200 thì là xóa thành công
                    if (response.status == 200)
                        alert("Xóa thành công");

                })
                .catch((err) => {  // catch để bắt lỗi ngoại lệ
                    console.log(err);
                });
        }
        function UpdateBalanceDel() {
            let obj = {
                id: idbalance,
                id_user: userId,
                balance: +balance - +item.price,
            }
            console.warn("item", obj)
            fetch(API.updatebalance + idbalance, {
                method: 'PUT',
                headers: { // config data
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                })
            })
        }
        function UpdateBalanceDel2() {
            let obj = {
                id: idbalance,
                id_user: userId,
                balance: +balance - +item.price,
            }
            console.warn("item", obj)
            fetch(API.updatebalance + idbalance, {
                method: 'PUT',
                headers: { // config data
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                })
            })
        }

        const submit = () => {
            Alert.alert('Xóa bài viết', 'Bạn có muốn xóa giao dịch này?', [
                {
                    text: 'Cancel',

                    style: 'cancel',
                },
                { text: 'OK', onPress: () => { XoaItem(); UpdateBalanceDel() } },
            ]);

        }
        const submit1 = () => {
            Alert.alert('Xóa bài viết', 'Bạn có muốn xóa giao dịch này?', [
                {
                    text: 'Cancel',

                    style: 'cancel',
                },
                { text: 'OK', onPress: () => { XoaItem(); UpdateBalanceDel2() } },
            ]);

        }
        function Selectrecord() {
            setidrecord(item._id);
            settitle(item.title);
            setprice(item.price);
            setdescription(item.description);
            setidbalance(item.id_balance);
            setuserId(item.id_user);
            setSelectedValue(item.id_cat);
            setChecked(item.is_expense);

        }
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        };

        return (

            <ScrollView>
                {item.is_expense == false ?

                    <View style={{ margin: 10, backgroundColor: 'white', elevation: 5, padding: 10 }}>



                        <Text style={{ alignItems: 'center', width: '100%', textAlign: 'center', marginBottom: 8, fontSize: 22, fontWeight: '600' }}>{item.title}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{formatDate(item.date)}</Text>

                        <View style={{ fontWeight: 'bold', fontSize: 19, marginBottom: 5, marginTop: 5, flexDirection: 'row', alignContent: 'space-between' }}>
                            <Image style={{
                                width: 40, height: 40, marginRight: 10
                            }} source={{
                                uri: "http://192.168.1.8:8000" + item.id_cat.image,
                            }} ></Image>
                            <Text style={{ marginBottom: 5, flex: 6, fontSize: 18, fontWeight: '500', marginTop: 3 }} > {item.id_cat.name}</Text>
                            <Text style={{ marginBottom: 5, color: 'green', flex: 2, fontSize: 18, marginTop: 3 }} >    {item.price} ₫</Text>


                        </View>









                    </View>
                    :
                    <View style={{ margin: 10, backgroundColor: 'white', elevation: 5, padding: 10 }}>

                        <Text style={{ alignItems: 'center', width: '100%', textAlign: 'center', marginBottom: 8, fontSize: 22, fontWeight: '600' }}>{item.title}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{formatDate(item.date)}</Text>
                        <View style={{ fontWeight: 'bold', fontSize: 19, marginBottom: 5, marginTop: 5, flexDirection: 'row', alignContent: 'space-between' }}>
                            <Image style={{
                                width: 40, height: 40, marginRight: 10
                            }} source={{
                                uri: "http://192.168.1.8:8000" + item.id_cat.image,
                            }} ></Image>
                            <Text style={{ marginBottom: 5, flex: 6, fontSize: 20, fontWeight: '500', marginTop: 3 }} > {item.id_cat.name}</Text>
                            <Text style={{ marginBottom: 5, color: 'red', flex: 2, fontSize: 18, marginTop: 3 }} >       {item.price} ₫</Text>


                        </View>






                    </View>}


            </ScrollView>
        )

    }
    return (

        <View style={{}}>
            <View style={{ height: 150, width: '100%', alignContent: 'center', alignItems: 'center', backgroundColor: 'white', marginTop: 5 }}>
                {totalprice <= 0 ?
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ color: 'red', fontSize: 20, fontWeight: '500', textAlign: 'center' }}>{totalprice}₫</Text>
                        <Text>Khoản chi quá giới hạn</Text></View>
                    : <Text style={{ color: 'green', fontSize: 20, fontWeight: '500', textAlign: 'center' }}>{totalprice}₫</Text>}

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 1, width: '100%', alignItems: 'center' }}>
                    <View style={[styles.shadowProp, styles.card, styles.leftContainer]}>
                        <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>{data.length}</Text>
                        <Text style={{ textAlign: 'center' }}>Số giao dịch</Text>
                    </View>
                    <View style={[styles.shadowProp, styles.card]}>
                        <Tooltip
                            isVisible={showTip1}
                            content={
                                <View>
                                    <Text> {totalpricespent} </Text>
                                </View>
                            }
                            onClose={() => setTip1(false)}
                            placement="top"
                        >
                            <TouchableOpacity onPress={() => setTip1(true)} style={{ width: '100%' }} >
                                <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>{spend}</Text>

                            </TouchableOpacity>



                        </Tooltip>

                        <Text style={{ textAlign: 'center' }}>Tổng đã chi</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={[styles.shadowProp, styles.card, styles.rightContainer]}>
                            <Tooltip
                                isVisible={showTip}
                                content={
                                    <View>
                                        <Text> {totalpricerei} </Text>
                                    </View>
                                }
                                onClose={() => setTip(false)}
                                placement="top"
                            >
                                <TouchableOpacity onPress={() => setTip(true)} style={{ width: '100%' }} >
                                    <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>{rei}</Text>

                                </TouchableOpacity>



                            </Tooltip>
                            <Text style={{ textAlign: 'center' }}>Tổng đã thu</Text>


                        </View>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={{ alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10 }}>
                <Text style={{ color: 'grey', marginLeft: 5, fontWeight: '600' }}>Chọn khoảng thời gian</Text>
            </View>

            <View style={{flexDirection:'row',marginTop:20}}>
                <Text style={{width:'50%',textAlign:'center'}}> Ngày bắt đầu </Text>
                <Text style={{marginLeft:50,width:'50%'}}> Ngày kết thúc </Text>
            </View>
            <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-evenly', padding: 10 }}>
                <View style={{ width: '30%', flexDirection: 'row', borderWidth: 1, borderRadius: 5, height: 40, padding: 8, marginBottom: 10, backgroundColor: 'white' }}>
                    <Text style={{ width: 100, marginRight: 10 }}>{startdate.toDateString()}</Text>
                    <View style={{flexDirection:'column'}}>
                    {!isPickerShow1 && (
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={showPicker1}><Icon
                                name='calendar'
                                size={20}></Icon></TouchableOpacity>

                        </View>
                    )}
                    </View>

                    {/* The date picker */}
                    {isPickerShow1 && (
                        <DateTimePicker
                            value={startdate}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onChange1}
                            style={styles.datePicker}
                        />
                    )}
                </View>
                <View style={{ width: '30%', flexDirection: 'row', borderWidth: 1, borderRadius: 5, height: 40, padding: 8, marginBottom: 10, backgroundColor: 'white' }}>
                    <Text style={{ width: 100, marginRight: 10 }}>{enddate.toDateString()}</Text>
                    {!isPickerShow2 && (
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={showPicker2}><Icon
                                name='calendar'
                                size={20}></Icon></TouchableOpacity>

                        </View>
                    )}

                    {/* The date picker */}
                    {isPickerShow2 && (
                        <DateTimePicker
                            value={enddate}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={onChange2}
                            style={styles.datePicker}
                        />
                    )}
                </View>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity style={{backgroundColor:'#33CC99',width:80,height:40,borderRadius:6}} onPress={()=>getListrecord()}>
                    <Text style={{justifyContent:'center',alignItems:'center',alignSelf:'center',color:'white',fontWeight:'600',fontSize:16,padding:6}}>Lọc</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignContent: 'flex-start', justifyContent: 'flex-start', marginTop: 10 }}>
                <Text style={{ color: 'grey', marginLeft: 5, fontWeight: '600' }}>Tất cả giao dịch trong tháng</Text>
            </View>
            <View style={{ width: "100%", height: 480 }}>
                  <FlatList 
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `key-${item._id}`}>
                </FlatList>
                

            </View>


        </View>

    );
}

const styles = StyleSheet.create({


    card: {
        height: 50,
        width: 120,
        backgroundColor: '#ffffff',
        elevation: 10,
        borderRadius: 4,

    },
    // leftContainer: {
    //     flex:1,
    //     alignItems: 'flex-start'
    // },

    // centerContainer: {
    //     flex:1,
    //     alignItems: 'flex-start'
    // },
    // rightContainer: {
    //     flex:1,
    //     alignItems: 'flex-end'
    // }
})

export default Custom;

