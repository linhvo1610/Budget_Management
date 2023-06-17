import { Modal, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native';

import { API } from './API';


const Khoanthu = (props) => {
    var dem = 0;
    const [listcontact, setlistcontact] = useState([])
    const [reloading, setreloading] = useState(false)
    const [balance, setbalance] = useState(0)
    const [title, settitle] = useState("")
    const [price, setprice] = useState(0)
    const [date, setdate] = useState('')
    const [description, setdescription] = useState('')
    const [information, setinformation] = useState({})
    const [isLoading, setisLoading] = useState(true);
    const [counter, setcounter] = useState(dem);
    const [data, setdata] = useState();
    const reloadData = React.useCallback(() => {
        setreloading(true); // set trạng thái bắt đầu reload
        dem++;
        getRecord();
        setcounter(dem);


    });

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem("balance")
                console.log(value);
                if (value !== null) {
                    let parsed = JSON.parse(value)
                    setbalance(parsed);
                    console.log(balance.balance);
                }
            } catch (e) {
                // error reading value
                console.log(e);
            }
        }
        const getDataLogin = async () => {
            try {
                const value = await AsyncStorage.getItem("login")
                console.log(value);
                if (value !== null) {
                    let parsed = JSON.parse(value)
                    setinformation(parsed);
                    console.log(information._id);
                }
            } catch (e) {
                // error reading value
                console.log(e);
            }
        }
        getData();
        getDataLogin();
        getRecord();

        return () => {
        }
    }, [])
    const getRecord = () => {
        fetch(API.getrecord + information._id)
            .then((response) => {
                return response.json();
            })
            .then(async (data_json) => {
                setdata(data_json);
                settitle(data.title);
                setprice(data.price);
                setdescription(data.description);
                console.log(title);

            }).finally(() => setisLoading(false));
    }






    const chuyenAdd = () => {
        props.navigation.navigate('AddKhoanthu');
    }
    const quoaylai = () => {
        props.navigation.navigate('Home');
    }
    return (
        <View style={{ flex: 1 }}>

            <Text>Số Dư: {balance.balance}</Text>
            <TouchableOpacity onPress={chuyenAdd} >
                <Image source={require('../assets/add.png')}
                    style={{ width: 40, height: 40, resizeMode: 'contain', alignSelf: 'flex-end', marginRight: 30 }}></Image>
            </TouchableOpacity>

            <View style={{ width: "100%", height: 350 }}>
                <FlatList>
                    <View style={{ margin: 10, backgroundColor: 'white', elevation: 5, borderRadius: 8, padding: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                marginBottom: 10,
                                fontWeight: 'bold',
                                color: '#d63341',
                                fontSize: 15,
                                marginLeft: 8,
                                marginTop: 2,
                                flex: 8

                            }} > {title}</Text>

                        </View>
                        <View style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5 }}>
                            <Text style={{ marginBottom: 5 }} > {price}</Text>
                        </View>
                        <View style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5 }}>
                            <Text style={{ marginBottom: 5 }} > {description}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, marginBottom: 10, marginTop: 10 }}>
                        </View>
                    </View>
                </FlatList>
            </View>
            <View style={{
                position: 'absolute',
                bottom: 0,
            }}>
                <TouchableOpacity>
                    <IonIcon name='add-circle'
                        size={20}></IonIcon>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Khoanthu

const styles = StyleSheet.create({

    item: {
        alignItems: 'center',
        elevation: 10,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10
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