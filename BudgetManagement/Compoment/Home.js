import { StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableOpacity, Modal, Pressable, Alert, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { Component, useState } from 'react'
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { API } from './API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const images = [
    'https://tse3.mm.bing.net/th?id=OIP.i0EhYlhSgyDXcbRqzcqz4AHaEy&pid=Api&P=0&h=180',
    'https://tse4.mm.bing.net/th?id=OIP.CEjRZRlx4jlOfmN740fQYwHaEo&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.yKmq1Utmjq1e4kG8zWnklQHaEK&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.99y-tyFEvNeUWaoOr9kCGAHaD4&pid=Api&P=0&h=180',
]


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
var dem = 0;

const Home = ({ navigation }) => {
    const [imgActive, setimgActive] = useState(0);
    const [balance, setbalance] = useState(0);
    const [data, setdata] = useState();
    const [counter, setcounter] = useState(dem);
    const [reloading, setreloading] = useState(false);
    const [title, settitle] = useState('');
    const [price, setprice] = useState(0);
    const [date, setdate] = useState(new Date());
    const [image, setimage] = useState();
    const [category, setcategory] = useState();
    const [is_expense, setis_expense] = useState(false)
    const [isLoading, setisLoading] = useState(true);
    const [userId, setuserId] = useState()
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
    const [addbalance, setaddbalance] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [updatemodalVisible, setupdateModalVisible] = useState(false);

    const [newbalance, setnewbalance] = useState(0);
    const [id, setid] = useState()



    onchange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if (slide != imgActive) {
                setimgActive(slide);
            }
        }
    }


    const [information, setinformation] = useState({});
    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem("login")
                console.log(value);
                if (value !== null) {
                    let parsed = JSON.parse(value)
                    setinformation(parsed);
                    setuserId(parsed._id);
                    console.log('userid', userId);
                }
            } catch (e) {
                // error reading value
                console.log(e);
            }
        }
        getData();
        getBalance();
        getListrecord();

        return () => {
        }
    }, [information._id, balance, userId, newbalance])
    

    const getBalance = () => {
        if (!userId) return;
        console.log('LogUpdate', API.getbalance + userId);
        fetch(API.getbalance + userId)
            .then((response) => {
                return response.json();

            })
            .then(async (data_json) => {
                if (data_json.data) {
                    let objB = data_json.data[0];
                    console.log('log data' + objB);
                    setbalance(objB.balance);
                    setid(objB._id)
                    try {
                        await AsyncStorage.setItem("balance", JSON.stringify(objB));
                        console.log("log async", objB);
                        // }
                    } catch (e) {
                        // saving error
                        console.log(e);
                    }
                }



            })
    }

    const addBalance = () => {
        //1. Chuẩn bị dữ liệu:

        let objbalance = {
            id_user: information._id,
            balance: addbalance,
        }
        //2. Gọi hàm fetch
        fetch(API.addbalance, {
            method: 'POST', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
            headers: { // Định dạng dữ liệu gửi đi
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objbalance) // chuyển đối tượng SP thành chuỗi JSON
        })
            .then((response) => {
                console.log(response.status);
                if (response.status == 201)
                    alert("cập nhật thành công");


            })
            .catch((err) => {  // catch để bắt lỗi ngoại lệ
                console.log(err);
            });
    }

    function UpdateBalance() {
        let item = {
            id: id,
            id_user: information._id,
            balance: +newbalance + +balance,
        }
        console.warn("item", item)
        console.log('loiiiiiii',API.updatebalance + id);
        if (!id) return;
        fetch(API.updatebalance + id, {
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
    const chuyentr = () => {
        navigation.navigate('Khoanchi');
    }
    const infor = () => {
        navigation.navigate('Information');
    }

    const getListrecord = () => {
        if (!information._id) return;
        fetch(API.getrecord + information._id)

            .then((data_res) => {
                return data_res.json();
            })
            .then((data_json) => {
                if (data_json.data) {
                    const newData = data_json.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setdata(newData[0]);
                    console.log('data', newData[0]._id);
                    settitle(newData[0].title);
                    setprice(newData[0].price);
                    setimage(newData[0].id_cat.image);
                    setcategory(newData[0].id_cat.name);
                    setdate(newData[0].date);
                    setis_expense(newData[0].is_expense);
                    console.log('title', title);
                    console.log('image', image);
                    console.log('cat', category);
                    console.log('date', date);
                }



            })
            .catch((err) => {
                // nếu xảy ra lỗi thì log lỗi
                console.log(err);
            }).finally(() => setisLoading(false));

    }
    function handleupdatebalance (){
        UpdateBalance();
        setupdateModalVisible(false);
        getBalance()

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
                    getData();
                    getBalance();
                    // nếu status là 200 thì là xóa thành công
                    if (response.status == 200)
                        alert("Xóa thành công");
                    

                })
                .catch((err) => {  // catch để bắt lỗi ngoại lệ
                    console.log(err);
                });
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
            Alert.alert('Xóa giao dịch', 'Bạn có muốn xóa giao dịch này?', [
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
                            <Text style={{ marginBottom: 5, color: 'red', flex: 2, fontSize: 18, marginTop: 3 }} >    {item.price} ₫</Text>


                        </View>



                    </View>}



            </ScrollView>

        )

    }


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };
    return (
        <View>
            <View style={{ backgroundColor: '#58fcf2', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 2 }}>
                <View style={styles.ngang}>

                    <TouchableOpacity onPress={infor}>
                        <Image style={styles.img} source={require('../assets/meme.jpg')} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 20, color: 'black' }}> Welcome, {information.username} </Text>

                </View>
                <View style={styles.balance}>
                    <View  >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <Text style={{ margin: 8, fontSize: 17, fontWeight: 'bold' }}>VÍ CỦA TÔI</Text>
                            {balance == 0 ? <TouchableOpacity onPress={() => setModalVisible(true)} style={{ margin: 8 }}>
                                <Icon name="plus"
                                    size={20}></Icon>
                            </TouchableOpacity> : <TouchableOpacity onPress={() => setupdateModalVisible(true)} style={{ margin: 8 }}>
                                <Icon name="plus"
                                    size={20}></Icon>
                            </TouchableOpacity>}

                        </View>
                        <View style={{ borderBottomWidth: 0.5, opacity: 0.5 }}></View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <Text style={{ margin: 5, fontSize: 15, fontWeight: 600 }}>Số Dư :</Text>
                        <Text style={{ margin: 5, marginBottom: 5 }}> {balance} ₫</Text>
                    </View>


                </View>
            </View>
            <View style={{ flexDirection: 'row', margin: 10 }}>
                <Text style={{ fontSize: 16, lineHeight: 30, color: 'grey', fontWeight: 'bold' }}>Giao dịch mới nhất</Text>
                <TouchableOpacity style={{ flex: 1 }} onPress={chuyentr}>
                    <Text style={{ flex: 1, fontSize: 16, lineHeight: 30, color: 'green', textAlign: 'right', fontWeight: 'bold' }}>Xem tất cả giao dịch</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                {is_expense == false ?


                    <View style={{ margin: 10, backgroundColor: 'white', elevation: 5, padding: 10 }}>



                        <Text style={{ alignItems: 'center', width: '100%', textAlign: 'center', marginBottom: 8, fontSize: 22, fontWeight: '600' }}>{title}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{formatDate(date)}</Text>

                        <View style={{ fontWeight: 'bold', fontSize: 19, marginBottom: 5, marginTop: 5, flexDirection: 'row', alignContent: 'space-between' }}>
                            <Image style={{
                                width: 40, height: 40, marginRight: 10
                            }} source={{
                                uri: "http://192.168.1.8:8000" + image,
                            }} ></Image>
                            <Text style={{ marginBottom: 5, flex: 6, fontSize: 18, fontWeight: '500', marginTop: 3 }} > {category}</Text>
                            <Text style={{ marginBottom: 5, color: 'green', flex: 2, fontSize: 18, marginTop: 3 }} >    {price} ₫</Text>


                        </View>









                    </View>

                    :


                    <View style={{ margin: 10, backgroundColor: 'white', elevation: 5, padding: 10 }}>

                        <Text style={{ alignItems: 'center', width: '100%', textAlign: 'center', marginBottom: 8, fontSize: 22, fontWeight: '600' }}>{title}</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{formatDate(date)}</Text>
                        <View style={{ fontWeight: 'bold', fontSize: 19, marginBottom: 5, marginTop: 5, flexDirection: 'row', alignContent: 'space-between' }}>
                            <Image style={{
                                width: 40, height: 40, marginRight: 10
                            }} source={{
                                uri: "http://192.168.1.8:8000" + image,
                            }} ></Image>
                            <Text style={{ marginBottom: 5, flex: 6, fontSize: 20, fontWeight: '500', marginTop: 3 }} > {category}</Text>
                            <Text style={{ marginBottom: 5, color: 'red', flex: 2, fontSize: 18, marginTop: 3 }} >    {price} ₫</Text>


                        </View>



                    </View>}



            </ScrollView>
            <View>

            </View>



            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput placeholder="Nhập số dư" placeholderTextColor='black' value={addbalance} onChangeText={text => setaddbalance(text)}></TextInput>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => addBalance()}>
                            <Text style={styles.textStyle}>Add</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={updatemodalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setupdateModalVisible(!updatemodalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput placeholder="Cập nhật số dư" placeholderTextColor='black' value={newbalance} onChangeText={text => setnewbalance(text)}></TextInput>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => handleupdatebalance()}>
                            <Text style={styles.textStyle}>Update</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>

    )
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',
    },
    ngang: {
        flexDirection: 'row',
        marginTop: 50,
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 180,
        margin: 10,
        resizeMode: 'contain',
    },
    wrap: {
        width: WIDTH,
        height: HEIGHT * 0.25
    },
    wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    doActive: {
        margin: 3,
        color: 'black',
    },
    dot: {
        margin: 3,
        color: 'white'
    },
    item0: {
        alignItems: 'center',
        elevation: 10,
        margin: 10,
        backgroundColor: '#FF99CC',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        height: 75,
    },
    item1: {
        alignItems: 'center',
        elevation: 10,
        margin: 10,
        backgroundColor: '#FF99CC',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        height: 100,
    },
    balance: {
        elevation: 2,
        backgroundColor: 'white',
        width: '70%',
        marginLeft: 80,
        height: 80,
        borderRadius: 10,
        marginBottom: 15
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
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

});