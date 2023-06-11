import { StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableOpacity, Modal, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { Component, useState } from 'react'
import { useEffect } from 'react';
import { API } from './API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';

const images = [
    'https://tse3.mm.bing.net/th?id=OIP.i0EhYlhSgyDXcbRqzcqz4AHaEy&pid=Api&P=0&h=180',
    'https://tse4.mm.bing.net/th?id=OIP.CEjRZRlx4jlOfmN740fQYwHaEo&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.yKmq1Utmjq1e4kG8zWnklQHaEK&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.99y-tyFEvNeUWaoOr9kCGAHaD4&pid=Api&P=0&h=180',
]


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Home = ({ navigation }) => {
    const [imgActive, setimgActive] = useState(0);
    const [balance, setbalance] = useState(0);
    const [data, setdata] = useState();
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
                    console.log(information.username);
                }
            } catch (e) {
                // error reading value
                console.log(e);
            }
        }
        getData();
        getBalance();

        return () => {
        }
    }, [])
    const getBalance = () => {
        fetch(API.getbalance + information._id)
            .then((response) => {
                // convert to json
                return response.json();
            })
            .then(async (data_json) => {
                let objB = data_json.data[0];
                console.log(objB);
                try {
                    await AsyncStorage.setItem("balance", JSON.stringify(objB));
                    // console.log(objB.balance);
                    setbalance(objB.balance);
                    console.log(balance);
                    setid(objB._id);
                    console.log(id);

                } catch (e) {
                    // saving error
                    console.log(e);
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
        fetch('http://192.168.0.103:8000/api/balance', {
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
        navigation.navigate('Information');
    }



    return (
        <View>
            <View style={styles.ngang}>
                <TouchableOpacity onPress={chuyentr}>
                    <Image style={styles.img} source={require('../assets/meme.jpg')} />
                </TouchableOpacity>
                <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 20, color: 'black' }}> Welcome, {information.username} </Text>
            </View>


            <View>
                <SafeAreaView style={styles.container}>
                    <View style={styles.wrap}>
                        <ScrollView onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            horizontal
                            style={styles.wrap}
                        >
                            {/* {
            images.map((e, index)=> 
            <Image key={e}
            resizeMode='stretch'
            style={styles.wrap}
            source={{uri : e}} />
            )
        } */}

                        </ScrollView>


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


                        {/* <View style={styles.wrapDot}>
                            {
                                images.map((e, index) =>
                                    <Text ket={e} style={imgActive == index ? styles.doActive : styles.dot}>
                                        •
                                    </Text>
                                )
                            }
                        </View> */}
                    </View>
                </SafeAreaView>
            </View>

            {/* <View style={{ marginTop: 70, width: 250, alignSelf: 'center' }}>
                <View style={styles.item0}>
                    <View style={{ marginLeft: 20, }} >
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 24, }} > Quản lý chi tiêu </Text>
                    </View>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <View style={styles.item1}>
                    <View >
                        <TouchableOpacity>
                            <Image source={require('../assets/khoanthu.png')} style={{
                                width: 70, height: 70, borderRadius: 20, marginLeft: 10
                            }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginLeft: 20, }}

                    >
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18, }}
                            onPress={() => { navigation.navigate('ListThu') }} > Danh sách loại thu </Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ marginTop: 0 }}>
                <View style={styles.item1}>
                    <View >
                        <TouchableOpacity>
                            <Image source={require('../assets/Khoanchi.png')} style={{
                                width: 70, height: 70, borderRadius: 20, marginLeft: 10
                            }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginLeft: 20, }} >
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18, }}
                            onPress={() => { navigation.navigate('ListChi') }} > Danh sách loại chi </Text>
                    </TouchableOpacity>

                </View>
            </View> */}
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
                            onPress={() => UpdateBalance()}>
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
        marginTop: 20,
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
        borderRadius: 10
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