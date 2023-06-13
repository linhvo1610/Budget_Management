import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableHighlight, Image, TouchableOpacity, Button } from 'react-native';
import { API } from './API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';




const Login = (props) => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [status, setstatus] = useState('');
    const [data, setdata] = useState()

    // const dologin = () => {
    //     if (username.length == 0) {
    //         // thông báo:
    //         alert("Chưa nhập username")
    //         return;
    //     }
    //     if (password.length == 0) {
    //         // thông báo:
    //         alert("Chưa nhập password")
    //         return;
    //     }
    //     fetch(API.login+username)
    //         .then((response) => 
    //             response.json())
    //         .then(async (json) => {

    //             console.log(json.data);
    //             if (json.data.length != 1) {
    //                 alert("Tài Khoản hoặc mật khẩu sai");
    //                 return;
    //             } else {
    //                 let objU = json.data[0];
    //                 console.log(objU);
    //                 if (objU.password == password && objU.role == "User") {
    //                     try {
    //                         await AsyncStorage.setItem("login", JSON.stringify(objU));
    //                         console.log(objU);
    //                         alert('đăng nhập thành công')
    //                         // setusername("")
    //                         // setpassword("")
    //                         props.navigation.navigate("Tab");
    //                         // }
    //                     } catch (e) {
    //                         // saving error
    //                         console.log(e);
    //                     }

    //                 }else if (objU.password == password && objU.role =="Admin") {
    //                     alert("Admin không thể đăng nhập")
    //                 }
    //                  else {
    //                     alert("Sai password");
    //                 }
    //             }
    //         })
    // }
    return (
        <View style={{ flex: 1 }}>
            <View>
                <Text style={{ marginTop: 50, marginLeft: 25, fontSize: 25, fontStyle: 'italic', }}>Login</Text>
                <Text style={{ marginTop: 5, marginLeft: 10, fontSize: 15, fontStyle: 'italic', }}>Welcome back</Text>
            </View>

            <View style={{ marginTop: 50, alignItems: 'center', }}>
                <Text style={{ color: '#ffa500', fontSize: 25, }}>Spending Management</Text>
            </View>
            <View style={{ marginTop: 30, alignItems: 'center', }}>
                <Image
                    style={{ width: 100, height: 100, margin: 15, }}
                    source={require('../assets/unnamed.png')

                    }

                />

            </View>

            <View style={{ marginTop: 50, alignItems: 'center', }}>
                <TextInput style={styles.Textinput} placeholder='Username' placeholderTextColor='white' value={username} onChangeText={text => setusername(text)}></TextInput>
                <TextInput style={styles.Textinput} placeholder='Password' placeholderTextColor='white' textContentType="password" value={password} onChangeText={text => setpassword(text)}
                    secureTextEntry={true}></TextInput>

            </View>
            <View style={{ alignItems: 'center' }}>

                <TouchableOpacity style={{ marginTop: 20, marginBottom: 10, width: 250, backgroundColor: '#ff8c00', height: 30, borderRadius: 10, }}>
                    <Text style={{ textAlign: 'center', marginTop: 5, color: 'white', fontWeight: 'bold' }} onPress={() => { props.navigation.navigate("Tab") }} >LOGIN</Text>

                </TouchableOpacity>

            </View>
            <View style={{ marginTop: 15, alignItems: 'center' }}>

                <TouchableHighlight style={{ marginTop: 20, marginBottom: 10, width: '100%' }}>
                    <View style={{ alignContent: 'center', textAlign: 'center', fontWeight: 'bold', flexDirection: 'row' }} >
                        <Text style={{ marginRight: 5 }}>You don't have an account?</Text>
                        <Text style={{ color: '#ff8c00' }} onPress={() => props.navigation.navigate("Res")} >Sign-up</Text>

                    </View>

                </TouchableHighlight>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Textinput: {
        width: 350,
        height: 50,
        padding: 15,
        backgroundColor: '#ff8c00',
        borderRadius: 10,
        marginTop: 10,


    }
})

export default Login;
