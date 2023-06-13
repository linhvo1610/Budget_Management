
import { Modal, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'

const Khoanchi = (props) => {
    var url = "http://192.168.1.109:3000/tb_khoanchi"
    const [listcontact, setlistcontact] = useState([])
    const [reloading, setreloading] = useState(false)

    const getData = async () => {
        try {
            const response = await fetch(url); //lấy dữ liệu về 
            const jsonSP = await response.json(); // chuyển dũ liêu thành đt json
            console.log(jsonSP);
            setlistcontact(jsonSP);

        } catch (error) {
            console.error(error);
        } finally {
        }
    }

    const renderContact = ({ item }) => {
        const xoaKhoanchi = () => {
            var url = "http://192.168.1.109:3000/tb_khoanchi/" + item.id
            fetch(url, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    console.log(response.status);
                    // nếu log là 201 thì là tạo thành công
                    if (response.status == 200)
                        alert("Xóa thành công");
                    getData();
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return (
            <View>
                <View style={styles.item}>

                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, width: 50, }} >Title: </Text>
                        <TouchableOpacity style={{ marginLeft: 7, width: 250, flexDirection: 'row' }}
                        // onPress={() => {
                        //     props.navigation.navigate('ChitietKhoanchi', { item_ct: item })
                        // }}
                        >
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18, }}>{item.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginRight: -20 }}
                            onPress={() => {
                                props.navigation.navigate('UpdateKhoanchi', { item_thuchi: item })
                            }}
                        >
                            <Image style={styles.img} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10308/10308391.png' }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, width: 50, }} >Price: </Text>
                        <TouchableOpacity style={{ marginLeft: 7, width: 250, flexDirection: 'row' }} >
                            <Text style={{ color: 'black', fontSize: 18, }}
                            >{item.price} vnđ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={xoaKhoanchi}>
                            <Image style={styles.img} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9068/9068885.png' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }

    const reloadData = React.useCallback(() => {
        // xử lý công việc load lại dữ liệu đổ vào danh sách
        setreloading(true); // set trạng thái bắt đầu reload
        getData();
        // mô phỏng đợi reload, nếu là reload từ server thật thì không cần viết lệnh dưới
        setTimeout(() => {
            setreloading(false); // sau 2s thì đổi trạng thái không rload nữa
        }, 2000);


    });

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // do something
            getData();
            // getDataComment(); 
        });
        return unsubscribe;
    }, [props.navigation]);

    const chuyenAdd = () => {
        props.navigation.navigate('AddKhoanchi');
    }
    const quoaylai = () => {
        props.navigation.navigate('Home');
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignSelf: 'center', margin: 40 }}>
                <View style={{
                    backgroundColor: 'white', padding: 10, borderRadius: 20, elevation: 10, width: 300, alignSelf: 'center'
                }}>

                    <Text style={{ fontSize: 25, color: '#FF4500', backgroundColor: 'white', alignSelf: 'center', fontWeight: 'bold' }}>
                        Quản Lý Khoản Chi
                    </Text>
                </View>

                <TouchableOpacity onPress={chuyenAdd} >
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2921/2921226.png' }}
                        style={{ width: 40, height: 40, marginLeft: 20, marginTop: 8 }}></Image>
                </TouchableOpacity>
            </View>
            <FlatList
                data={listcontact}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl refreshing={reloading} onRefresh={reloadData} />
                }
                renderItem={renderContact}
            >
            </FlatList>
=======
import * as React from 'react'
import { Button, TextInput, Text, View, StyleSheet, TouchableHighlight, ImageBackground, StatusBar, TouchableOpacity, FlatList, Image, Share, Modal, ScrollView, RefreshControl, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    const [price, setprice] = useState(0)
    const [username, setusername] = useState()
    const [image, setimage] = useState()
    const [imagelike, setimagelike] = useState()
    const [img_base64, setiimg_base64] = useState(null)
    const [img64, setimg64] = useState(null)
    const [likes, setlikes] = useState(0)
    const [userId, setuserId] = useState()
    const [isLoading, setisLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
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

        }
        getData();
        getListrecord();
        return () => {

        }
    }, [])

    // function UpdateArticle() {
    //     let item = {
    //         id: id,
    //         title: title, content: content, image: img64, usersId: userId, likes: likes
    //     }
    //     console.warn("item", item)
    //     fetch(API.updatearticleadmin + item.id, {
    //         method: 'PUT',
    //         headers: { // config data
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(item)
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             console.warn(resp)
    //         })
    //     })
    // }



    const getListrecord = () => {
        console.log(API.getrecord + userId);
        fetch(API.getrecord + userId)

            .then((data_res) => {
                return data_res.json();
            })
            .then((data_json) => {

                setdata(data_json.data);


            })
            .catch((err) => {
                // nếu xảy ra lỗi thì log lỗi
                console.log(err);
            }).finally(() => setisLoading(false));

    }
    renderItem = ({ item, index }) => {




        const XoaItem = () => {
            // if(! confirm ('Có đồng ý xóa không?') )
            //     return; 


            fetch(API.deletearticleadmin + item.id, {
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

        const submit = () => {
            Alert.alert('Xóa bài viết', 'Bạn có muốn xóa bài viết này?', [
                {
                    text: 'Cancel',

                    style: 'cancel',
                },
                { text: 'OK', onPress: () => XoaItem() },
            ]);

        }


        return (

            <View>
                {item.is_expense == true ? <View style={{ margin: 10, backgroundColor: 'green', elevation: 5, borderRadius: 8, padding: 10 }}>

                    <Text style={{ alignItems: 'center', width: '100%', textAlign: 'center', marginBottom: 8, fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
                    <View style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5 }}>
                        <Text style={{ marginBottom: 5 }} > {item.price}</Text>


                    </View>
                    <View style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5 }}>
                        <Text style={{ marginBottom: 5 }} > {item.description}</Text>


                    </View>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, marginBottom: 10, marginTop: 10 }}>
                    </View>




                </View> : <View style={{ margin: 10, backgroundColor: 'red', elevation: 5, borderRadius: 8, padding: 10 }}>

                    <Text style={{ alignItems: 'center', width: '100%', textAlign: 'center', marginBottom: 8, fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
                    <View style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5 }}>
                        <Text style={{ marginBottom: 5 }} > {item.price}</Text>


                    </View>
                    <View style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5 }}>
                        <Text style={{ marginBottom: 5 }} > {item.description}</Text>


                    </View>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, marginBottom: 10, marginTop: 10 }}>
                    </View>




                </View>}


            </View>

        )

    }




    StatusBar.setHidden(true)
    return (
        <View style={styles.container}>

            <Text style={styles.status}>CHI TIÊU</Text>

            <View style={{ width: "100%", height: 350 }}>
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
                width: "100%",
                position: "absolute",
                bottom: 0,
                backgroundColor: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,

                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5
            }}>
                {/* <Modal
                    style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}>
                    <ImageBackground style={{ backgroundColor: 'rgba(0,0,0,0.4)', width: '100%', height: '100%' }}
                        blurRadius={99}>

                        <View style={{ marginTop: 60 }}>
                            <ScrollView style={{ flexDirection: 'column', backgroundColor: 'white', minheight: 400, elevation: 10, marginLeft: 8, borderRadius: 10, width: "95%", marginBottom: 50 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginTop: 10, fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: 'blue' }}>SỬA BÀI VIẾT</Text>
                                <View>
                                    <Text style={{ marginLeft: 12, fontWeight: 'bold', color: 'blue', marginBottom: 5 }}>Tiêu Đề:</Text>
                                    <TextInput style={{ borderWidth: 2, padding: 5, marginBottom: 5, fontWeight: 'bold', paddingLeft: 15, color: '#f7487c', borderColor: '#465b99', borderRadius: 6, width: "90%", alignContent: 'center', alignItems: 'center', marginLeft: 12, marginBottom: 5 }}
                                        placeholder='Nhập tiêu đề' value={title} onChangeText={(text) => settitle(text)}></TextInput>
                                    <View style={{}}>

                                        <Text style={{ marginLeft: 12, fontWeight: 'bold', color: 'blue', flex: 10 }}>Ảnh:</Text>



                                        {img_base64 == null ?
                                            <View style={{ justifyContent: 'center', alignContent: 'center', flex: 8 }}>
                                                <TouchableOpacity>
                                                    <Icon style={{ marginLeft: 140 }}
                                                        name="add-circle"
                                                        onPress={pickImage}
                                                        size={30}
                                                        color={'#f7487c'}
                                                    >
                                                    </Icon>
                                                </TouchableOpacity>
                                            </View>
                                            : null}


                                        <View style={{ alignItems: 'center', alignContent: 'center', marginBottom: 10 }}>
                                            {img_base64 != null ?
                                                <Icon style={{ flex: 1, elevation: 15 }}
                                                    name='close-circle'
                                                    color={'red'}
                                                    onPress={() => { setiimg_base64(null) }}
                                                    size={25}></Icon>
                                                : null}
                                            {img_base64 && <Image source={{ uri: img_base64 }} style={{ width: 270, height: 220 }} />}

                                        </View>

                                    </View>
                                    <Text style={{ marginLeft: 12, fontWeight: 'bold', color: 'blue', marginBottom: 5 }}>Nội dung:</Text>
                                    <TextInput multiline={true} style={{ borderWidth: 2, padding: 5, marginBottom: 5, fontWeight: 'bold', paddingLeft: 15, color: '#f7487c', borderColor: '#465b99', borderRadius: 6, width: "90%", alignContent: 'center', alignItems: 'center', marginLeft: 12, marginBottom: 5 }}
                                        placeholder='Nhập nội dung' value={content} onChangeText={(text) => setcontent(text)}></TextInput>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', marginTop: 15, borderTopWidth: 0.5, borderTopColor: '#e6e6e6' }}>

                                        <Icon
                                            name='arrow-back-circle-outline'
                                            size={40}
                                            color={'red'}
                                            onPress={() => { setiimg_base64(null), setModalVisible(!modalVisible) }}
                                            style={{ marginLeft: 50 }}>

                                        </Icon>

                                        <Icon
                                            name='checkmark-circle-outline'
                                            size={40}
                                            color={'#1e55a8'}
                                            onPress={() => { UpdateArticle(), setiimg_base64(null), setModalVisible(false) }}
                                            style={{ marginLeft: 120 }}>

                                        </Icon>

                                    </View>
                                </View>
                            </ScrollView>
                        </View>

                    </ImageBackground>
                </Modal> */}



            </View>



        </View>
    )
}
export default Khoanchi;
const styles = StyleSheet.create({
    container: {
        flex: 1,


export default Khoanchi

const styles = StyleSheet.create({
    img: {
        width: 27,
        height: 27,
    },
    item: {
        elevation: 10,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        borderColor: '#FF4500',
        borderWidth: 1,
    },
    save: {
        borderRadius: 20,
        width: 120, height: 40,
        backgroundColor: 'green',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
        fontWeight: 'bold'
    },

    modaldialog: {
        flex: 1,
        backgroundColor: 'white',
        margin: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    textip: {
        borderWidth: 1.5,
        borderColor: 'orange',
        padding: 16,
        width: 300,
        height: 50,
        margin: 10,
        borderRadius: 25,
        fontSize: 17,
    },
    textipdate: {
        borderWidth: 1.5,
        borderColor: 'orange',
        padding: 16,
        width: 300,
        height: 50,
        margin: 10,
        borderRadius: 25,
        fontSize: 17,
    },
    centerredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
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
    }
})

        alignItems: 'center',


    },
    status: {
        width: '100%',
        backgroundColor: 'white',
        height: 30,
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
    }, centeredView: {
        // backgroundColor: rgba(255, 0, 0, 0.2),
    }
});


