import * as React from 'react'
import { Button, TextInput, Text, View, StyleSheet, TouchableHighlight, ImageBackground, StatusBar, TouchableOpacity, FlatList, Image, Share, Modal, ScrollView, RefreshControl, Alert, Pressable } from 'react-native'
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





import { API } from './API';
var dem = 0;
const Khoanchi = ({ navigation }) => {
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


    console.log(date);
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
    const onChangeStart = (event, value) => {
        setstartdate(value);
        if (Platform.OS === 'android') {
            setIsPickerShow1(false);
        }
    };
    const onChangeEnd = (event, value) => {
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
        getListrecord();
        getcategory();
        return () => {

        }
    }, [userId])
    const sort = () => {
        if (data) {
            const newData = data.filter(item => {
                if (startdate <= new Date(item.date) <= enddate) {
                    return true;
                } return false;
            }
            )
            setdata(newData)
        }
    }
    const getcategory = () => {
        fetch('http://192.168.2.140:8000/api/category')
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
                    console.log('data', newData);
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
        fetch('http://192.168.2.140:8000/api/record', {
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
    function handleUpdate() {
        UpdateRecord();
        getListrecord();
    }
    renderItem = ({ item, index }) => {
        const XoaItem = () => {
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
            Alert.alert('Xóa giao dịch', 'Bạn có muốn xóa giao dịch này?', [
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

        console.log('log img', item.id_cat.image);


        return (

            <ScrollView>
                {item.is_expense == false ?

                    <View style={styles.itemThuChi}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.textItem}>Thời gian: {formatDate(item.date)}</Text>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => { Selectrecord(item._id); setupdateModalVisible(true) }}>
                                <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/5285/5285229.png' }}
                                    style={{ width: 30, height: 30, marginBottom: 2 }}
                                ></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.textItem, { color: '#0033CC' }]}>Số tiền: +{item.price} VND</Text>
                            <TouchableOpacity style={{ flex: 1, marginBottom: 5 }} onPress={() => { Selectrecord(item._id); setupdateModalVisible(true) }}>
                                <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10697/10697092.png' }}
                                    style={{ width: 30, height: 30, marginBottom: 2 }}
                                ></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textItem}>Nội dung: {item.description}</Text>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => submit1()}>
                                <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9153/9153963.png' }}
                                    style={{ width: 30, height: 30, marginBottom: 2 }}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                    :

                    <View style={styles.itemThuChi}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.textItem}>Thời gian: {formatDate(item.date)}</Text>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => { Selectrecord(item._id); setupdateModalVisible(true) }}>
                                <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/5285/5285229.png' }}
                                    style={{ width: 30, height: 30, marginBottom: 2 }}
                                ></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.textItem, { color: 'red' }]}>Số tiền: +{item.price} VND</Text>
                            <TouchableOpacity style={{ flex: 1, marginBottom: 5 }} onPress={() => { Selectrecord(item._id); setupdateModalVisible(true) }}>
                                <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10697/10697092.png' }}
                                    style={{ width: 30, height: 30, marginBottom: 2 }}
                                ></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textItem}>Nội dung: {item.description}</Text>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => submit1()}>
                                <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9153/9153963.png' }}
                                    style={{ width: 30, height: 30, marginBottom: 2 }}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                }
            </ScrollView>

        )

    }
    StatusBar.setHidden(true)
    return (
        <View style={styles.container}>
            <Text style={styles.status}>CHI TIÊU</Text>
            <View style={{ width: "100%", height: 800 }}>
                {isLoading ? <ActivityIndicator /> : (<FlatList refreshControl={
                    <RefreshControl refreshing={reloading}
                        onRefresh={reloadData} />}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `key-${item._id}`}>
                </FlatList>
                )}

            </View>
            <View style={{
                position: 'absolute',
                bottom: 0,
            }}>
                <TouchableOpacity>
                    <IonIcon name='add-circle'
                        size={40}
                        color={'green'}
                        onPress={() => setModalVisible(true)}></IonIcon>
                </TouchableOpacity>
            </View>
            {/* Hiển thị phần thêm */}
            <Modal
                animationType="fade"
                transparent={true}
                onRequestClose={() => { setModalVisible(false) }}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Thêm Giao Dịch</Text>
                        <View style={{}}>
                            <Text style={{ fontSize: 20, fontWeight: '500', }}>Tiêu đề:</Text>
                            <TextInput style={styles.textInput} placeholder='Nhập tiêu đề' value={title} onChangeText={text => settitle(text)}></TextInput>
                        </View>
                        <View style={{}}>
                            <Text style={{ fontSize: 20, fontWeight: '500', }}>Số tiền:</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} placeholder='Nhập số tiền' value={price} onChangeText={text => setprice(text)}></TextInput>
                        </View>
                        <View style={{}}>
                            <Text style={{ fontSize: 20, fontWeight: '500', }}>Ghi chú:</Text>
                            <TextInput style={styles.textInput} placeholder='Nhập ghi chú' value={description} onChangeText={text => setdescription(text)}></TextInput>
                        </View>
                        <View style={{ width: '95%', alignContent: 'center', }}>
                            <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 3 }}>Loại giao dịch:</Text>
                            <View style={[{
                                borderColor: '#FF8C00',
                                borderRadius: 5,
                                borderWidth: 2,
                                margin: 10,
                                fontSize: 16,
                                fontWeight: '500',
                            }]}>
                                <Picker
                                    style={{ borderWidth: 1, }}
                                    selectedValue={selectedValue}
                                    onValueChange={handleValueChange}
                                    itemStyle={styles.pickerItem}
                                >
                                    {category.map((item, index) => {
                                        return (
                                            <Picker.Item
                                                label={item.name}
                                                value={item._id}
                                                key={index}
                                            />
                                        );
                                    })}
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '500', }}>Thời gian:</Text>
                            <View style={[{ flexDirection: 'row', borderColor: '#FF8C00', borderWidth: 2, width: 350, paddingTop: 8 }, styles.textInput]}>
                                <Text style={{ width: 300, }}>{currentdate}</Text>
                                {!isPickerShow && (
                                    <View>
                                        <TouchableOpacity onPress={showPicker} activeOpacity={0.5}>
                                            <Image
                                                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3652/3652191.png' }}
                                                style={{ width: 25, height: 25 }}
                                            ></Image>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                {/* The date picker */}
                                {isPickerShow && (
                                    <DateTimePicker
                                        value={date}
                                        mode={'date'}
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                )}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ marginRight: 10, textAlign: 'left', fontSize: 20, fontWeight: '500', marginBottom: 5 }}>Khoản Chi?</Text>
                            <Checkbox style={{ height: 20, marginTop: 2 }} value={isChecked} onValueChange={setChecked} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                            <Pressable
                                style={[styles.button]}
                                onPress={() => setModalVisible(false)}>
                                <Text style={styles.textStyle}>Hủy</Text>
                            </Pressable>
                            {isChecked == true ? <Pressable
                                style={[styles.button, { marginLeft: 20, backgroundColor: '#00CD00', shadowRadius: 20 }]}
                                onPress={() => { addRecord(); UpdateBalance1() }}
                            >
                                <Text style={styles.textStyle}>Thêm Khoản Chi</Text>
                            </Pressable> : <Pressable
                                style={[styles.button, { marginLeft: 20, backgroundColor: '#00CD00', shadowRadius: 20 }]}
                                onPress={() => { addRecord(); UpdateBalance() }}
                            >
                                <Text style={styles.textStyle}>Thêm Khoản Thu</Text>
                            </Pressable>}

                        </View>
                    </View>
                </View>
            </Modal >

            {/* Hiển thị phần sửa */}
            <Modal
                animationType="fade"
                transparent={true}
                onRequestClose={() => { setupdateModalVisible(false) }}
                visible={updatemodalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Sửa Giao Dịch</Text>
                        <View style={{}}>
                            <Text style={{ fontSize: 20, fontWeight: '500', }}>Tiêu đề:</Text>
                            <TextInput style={styles.textInput} placeholder='Nhập tiêu đề' value={title} onChangeText={text => settitle(text)}></TextInput>
                        </View>
                        <View style={{}}>
                            <Text style={{ fontSize: 20, fontWeight: '500', }}>Số tiền:</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} placeholder='Nhập số tiền' value={price} onChangeText={text => setprice(text)}></TextInput>
                        </View>
                        <View style={{}}>
                            <Text style={{ fontSize: 20, fontWeight: '500', }}>Ghi chú:</Text>
                            <TextInput style={styles.textInput} placeholder='Nhập ghi chú' value={description} onChangeText={text => setdescription(text)}></TextInput>
                        </View>
                        <View style={{ width: '95%', alignContent: 'center', }}>
                            <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 3 }}>Loại giao dịch:</Text>
                            <View style={[{
                                borderColor: '#FF8C00',
                                borderRadius: 5,
                                borderWidth: 2,
                                margin: 10,
                                fontSize: 16,
                                fontWeight: '500',
                            }]}>
                                <Picker
                                    style={{ borderWidth: 1, }}
                                    selectedValue={selectedValue}
                                    onValueChange={handleValueChange}
                                    itemStyle={styles.pickerItem}
                                >
                                    {category.map((item, index) => {
                                        return (
                                            <Picker.Item
                                                label={item.name}
                                                value={item._id}
                                                key={index}
                                            />
                                        );
                                    })}
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '500', }}>Thời gian:</Text>
                            <View style={[{ flexDirection: 'row', borderColor: '#FF8C00', borderWidth: 2, width: 350, paddingTop: 8 }, styles.textInput]}>
                                <Text style={{ width: 300, }}>{currentdate}</Text>
                                {!isPickerShow && (
                                    <View>
                                        <TouchableOpacity onPress={showPicker} activeOpacity={0.5}>
                                            <Image
                                                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3652/3652191.png' }}
                                                style={{ width: 25, height: 25 }}
                                            ></Image>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                {/* The date picker */}
                                {isPickerShow && (
                                    <DateTimePicker
                                        value={date}
                                        mode={'date'}
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                )}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ marginRight: 10, textAlign: 'left', fontSize: 20, fontWeight: '500', marginBottom: 5 }}>Khoản Chi?</Text>
                            <Checkbox style={{ height: 20, marginTop: 2 }} value={isChecked} onValueChange={setChecked} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                            <Pressable
                                style={[styles.button]}
                                onPress={() => setupdateModalVisible(false)}>
                                <Text style={styles.textStyle}>Hủy</Text>
                            </Pressable>
                            {isChecked == true ? <Pressable
                                style={[styles.button, { marginLeft: 20, backgroundColor: '#00CD00', shadowRadius: 20 }]}
                                onPress={() => { addRecord(); UpdateBalance1() }}
                            >
                                <Text style={styles.textStyle}>Sửa Khoản Chi</Text>
                            </Pressable> : <Pressable
                                style={[styles.button, { marginLeft: 20, backgroundColor: '#00CD00', shadowRadius: 20 }]}
                                onPress={() => { addRecord(); UpdateBalance() }}
                            >
                                <Text style={styles.textStyle}>Sửa Khoản Thu</Text>
                            </Pressable>}

                        </View>
                    </View>
                </View>
            </Modal >
        </View >

    )
}
export default Khoanchi;
const styles = StyleSheet.create({
    textItem: {
        fontSize: 20,
        fontWeight: '600',
        width: 320
    },

    itemThuChi: {
        margin: 10, backgroundColor: 'white', elevation: 5, padding: 10, borderRadius: 10
    },

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        paddingTop: 15,
        paddingBottom: 15

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: 'red',
        width: 130
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: 'red'

    },
    textInput: {
        borderColor: '#FF8C00',
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        margin: 10,
        width: 350,
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: '500'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputmodel: {
        borderWidth: 1, height: 40, borderRadius: 5, marginBottom: 10, width: '60%', padding: 8
    }
});

