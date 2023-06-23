import * as React from 'react'
import { Button, TextInput, Text, View, StyleSheet, TouchableHighlight, ImageBackground, StatusBar, TouchableOpacity, FlatList, Image, Share, Modal, ScrollView, RefreshControl, Alert,SafeAreaView, Pressable } from 'react-native'
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
import CurrentMonth from './CurrentMonth';
import TopNav from './TopNav';
var dem = 0;
const ThongKe = ({ navigation }) => {
    const [reloading, setreloading] = useState(false)
    const [counter, setcounter] = useState(dem)
    const reloadData = React.useCallback(() => {
        // xử lý công việc load lại dữ liệu đổ vào danh sách
        setreloading(true); // set trạng thái bắt đầu reload
        dem++;
        getListrecord();
        setcounter(dem);
        // mô phỏng đợi reload, nếu là reload từ server thật thì không cần viết lệnh dưới
        setTimeout(() => {
            setreloading(false); // sau 2s thì đổi trạng thái không rload nữa
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
    const [modalVisible, setModalVisible] = useState(false);
    const [updatemodalVisible, setupdateModalVisible] = useState(false);
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
        getListrecord();
        getcategory();
        return () => {

        }
    }, [userId])

    const sort = () => {

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();
        var first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstDayofWeek = new Date(date.setDate(first)).toUTCString();
        var lastdayOfWeek = new Date(date.setDate(last)).toUTCString();

        console.log("first day", firstDay)
        console.log("last day", lastDay)
        if (data) {
            const newData = data.filter(item => {
                const sdate = new Date(item.date).getTime();

                if (firstDay <= sdate && sdate <= lastDay) {
                    return true;
                } return false;


            }
            )
            console.log('new data', newData);
            setdata(newData);





        }
    }
    const getcategory = () => {

        fetch('http://192.168.102.12:8000/api/category')

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
                    const newData = data_json.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setdata(newData);
                }





            })
            .catch((err) => {
                // nếu xảy ra lỗi thì log lỗi
                console.log(err);
            }).finally(() => setisLoading(false));

    }
    function UpdateBalance() {
        let item = {
            id: idbalance,
            id_user: userId,
            balance: +balance + price,
        }
        console.warn("item", item)
        fetch(API.updatebalance + idbalance, {
            method: 'PUT',
            headers: { // config data
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }
    function UpdateBalance1() {
        let item = {
            id: idbalance,
            id_user: userId,
            balance: +balance - price,
        }
        console.warn("item", item)
        fetch(API.updatebalance + idbalance, {
            method: 'PUT',
            headers: { // config data
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }

    const addRecord = () => {
        //1. Chuẩn bị dữ liệu:

        let objrecord = {
            title: title,
            price: price,
            description: description,
            id_cat: selectedValue,
            id_user: userId,
            id_balance: idbalance,
            is_expense: isChecked,
            date: date,

        }
        //2. Gọi hàm fetch

        fetch('http://192.168.102.12:8000/api/record', {

            method: 'POST', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
            headers: { // Định dạng dữ liệu gửi đi
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objrecord) // chuyển đối tượng SP thành chuỗi JSON
        })
            .then((response) => {
                console.log(response.status);
                if (response.status == 201)
                    alert("cập nhật thành công");
                settitle('');
                setprice(0);
                setdescription(0);


            })
            .catch((err) => {  // catch để bắt lỗi ngoại lệ
                console.log(err);
            });
    }
    function UpdateRecord() {
        let item = {
            id: idrecord,
            title: title,
            price: price,
            description: description,
            id_cat: selectedValue,
            id_user: userId,
            id_balance: idbalance,
            is_expense: isChecked,
            date: date,

        }
        console.warn("item", item)
        console.log('log update', API.updaterecord + idrecord);
        fetch(API.updaterecord + idrecord, {
            method: 'PUT',
            headers: { // config data
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp)
            })
        })
    }
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


        return (

            <ScrollView>
                {item.is_expense == false ?
                    <TouchableOpacity onLongPress={() => submit1()}>
                        <View style={{ margin: 10, backgroundColor: '#65f249', elevation: 5, borderRadius: 8, padding: 10 }}>

                            <Text style={{ alignItems: 'center', width: '100%', textAlign: 'center', marginBottom: 8, fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
                            <View style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5, flexDirection: 'row' }}>

                                <Text style={{ color: 'white', fontWeight: '500' }}>Số dư:</Text>
                                <Text style={{ marginBottom: 5, color: 'white' }} >    {item.price}₫</Text>


                            </View>
                            <View style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5 }}>
                                <Text style={{ marginBottom: 5 }} > {item.description}</Text>


                            </View>

                            <TouchableOpacity style={{ flex: 1 }} onPress={() => { Selectrecord(item._id); setupdateModalVisible(true) }}>
                                <Icon
                                    name='refresh-circle'
                                    size={14}
                                    color={'white'}
                                />
                                <Text>Cập nhật</Text>
                            </TouchableOpacity>







                        </View>
                    </TouchableOpacity> :
                    <TouchableOpacity onLongPress={() => submit1()}>
                        <View style={{ margin: 10, backgroundColor: '#fa3c49', elevation: 5, borderRadius: 8, padding: 10 }}>

                            <Text style={{ alignItems: 'center', width: '100%', textAlign: 'center', marginBottom: 8, fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
                            <View style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5, flexDirection: 'row' }}>

                                <Text style={{ color: 'white', fontWeight: '500' }}>Số dư:</Text>
                                <Text style={{ marginBottom: 5, color: 'white' }} >   - {item.price}₫</Text>


                            </View>
                            <View style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5 }}>
                                <Text style={{ marginBottom: 5 }} > {item.description}</Text>


                            </View>

                            <TouchableOpacity style={{ flex: 1 }} onPress={() => { Selectrecord(item._id); setupdateModalVisible(true) }}>
                                <Icon
                                    name='refresh-circle'
                                    size={14}
                                    color={'white'}
                                />
                            </TouchableOpacity>






                        </View>
                    </TouchableOpacity>}


            </ScrollView>

        )

    }


    const ThongKe = createBottomTabNavigator();


    StatusBar.setHidden(true)
    return (

        <SafeAreaView style={{flex: 1}}>
            
            <Text style={{marginBottom:5,backgroundColor:'white'}}>Thống kê</Text>
            <TopNav ></TopNav>
        </SafeAreaView>



    )
}
export default ThongKe;
const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',


    },
    status: {
        width: '100%',
        backgroundColor: 'white',
        height: 50,
        color: 'blue',
        fontWeight: 'bold',
        alignContent: 'center',
        paddingTop: 10,
        textAlign: 'center'
    },
    appButton: {
        borderWidth: 1,
        borderColor: 'white'
    },
    appButtonText: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    appButtonContainer: {

        width: 160,


    },
    function: {
        flexDirection: 'row',
        flex: 1
    },
    content: {
        width: '100%',
        height: '75%',
        backgroundColor: 'white',
        marginBottom: 10,
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 4,
        bottom: 0,
        color: 'white'
    },
    centeredView: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        width: '100%',

        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    inputmodel: {
        borderWidth: 1, height: 40, borderRadius: 5, marginBottom: 10, width: '60%', padding: 8
    }
});

