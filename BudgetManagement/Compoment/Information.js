import { StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native"
import { useState } from "react";
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sysmodel from "./Sysmodel";


const Information = ({ navigation }) => {


    const [showModel, setshowModel] = useState(false)
    const [information, setinformation] = useState({});
    const onHideModel = () =>{
        setshowModel(false)
    }

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

        return () => {
        }
    }, [])
    const quoaylai = () => {
        navigation.navigate('Home')
    }
    const dangxuat = () => {
        navigation.navigate('Login')
    }
    return (
        <View>
        <Sysmodel visible={showModel} onHide={onHideModel} ondangx={dangxuat}  />
            <View style={{ height: 270, backgroundColor: 'red' }}>
                <View>
                    <Image style={styles.img} source={require('../assets/mama.jpg')} />
                </View>
                <TouchableOpacity onPress={quoaylai} style={{ width: 35, height: 35, marginBottom: 95 }}>
                    <Image style={{ width: 35, height: 35, marginTop: 48, marginLeft: 8, }} source={require('../assets/arrow.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ resizeMode: 'stretch', width: 75, height: 75, marginTop: 48, marginLeft: 13, borderRadius: 40 }} source={require('../assets/meme.jpg')} />
                    <Text style={{ color: 'white', fontSize: 30, marginTop: 60, fontWeight: 'bold', marginLeft: 20 }}
                    >{information.username}</Text>
                </View>
            </View>

            <View style={{ backgroundColor: 'white', padding: 20, }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', }} >Thông tin các nhân</Text>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text style={{ color: '#AAAAAA',width:80 }}>Giới tính</Text>
                    <Text style={{ marginLeft: 50 }}>Nam</Text>
                </View>
                <View style={{borderBottomColor: '#DDDDDD', borderBottomWidth: 1,marginTop:13}} />
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text style={{ color: '#AAAAAA',width:80 }}>Ngày sinh</Text>
                    <Text style={{ marginLeft: 50 }}>12/5/2003</Text>
                </View>
                <View style={{borderBottomColor: '#DDDDDD', borderBottomWidth: 1,marginTop:13}} />
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text style={{ color: '#AAAAAA',width:80 }}>Email</Text>
                    <Text style={{ marginLeft: 50 }}> {information.email} </Text>
                </View>
                <View style={{borderBottomColor: '#DDDDDD', borderBottomWidth: 1,marginTop:13}} />
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text style={{ color: '#AAAAAA',width:80 }}>Phân quyền</Text>
                    <Text style={{ marginLeft: 50 }}> {information.role} </Text>
                </View>
                <View style={{borderBottomColor: '#DDDDDD', borderBottomWidth: 1,marginTop:13}} />

                <View style={{marginTop:20}}>
                <TouchableOpacity onPress={()=>{ setshowModel(true) }}
                style={{backgroundColor:'#DDDDDD',width:'100%',height:40,borderRadius:8}}>
                    <Text style={{fontSize:17,textAlign:'center',marginTop:6}}>Đăng xuất</Text>
                </TouchableOpacity>
                </View>
            </View>
            

        </View>
    )
}
export default Information

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 70,
        justifyContent: 'center',
    },
    img: {
        width: '100%',
        height: 270,
        resizeMode: 'stretch',
        position: 'absolute',
    },
})