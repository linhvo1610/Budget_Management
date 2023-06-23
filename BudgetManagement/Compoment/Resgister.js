import React from 'react';
import { View, StyleSheet, Text, Image, TouchableHighlight, TextInput, TouchableOpacity,Alert } from 'react-native';
import { useState } from 'react';
import { API } from './API';


const Resgister = (props) => {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [re_pass, setre_pass] = useState('')

  const chuyentrang = () => {
    props.navigation.navigate('Login');


  }
  const addUsers = () => {
    let obj = { username: username, email: email, password: pass, role:'User' };
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.length == 0) {
      // thông báo:
      alert("Chưa nhập email")
      return;
    }
    if (reg.test(email) === false) {
      alert('Email Không đúng định dạng');
      return;
    }

    if (username.length == 0) {
      // thông báo:
      alert("Chưa nhập username")
      return;
    }
    if (pass.length == 0) {
      // thông báo:
      alert("Chưa nhập password")
      return;
    }
    if (pass != re_pass) {
      // thông báo:
      alert("Mật khẩu không trùng nhau")
      return;
    }
    
    

    fetch(API.register, {
      method: 'POST', 
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 201)
        Alert.alert('Đăng ký', 'Đăng ký thành công', [
          {
            text: 'Cancel',
          
            style: 'cancel',
          },
          {text: 'OK', onPress: () => props.navigation.navigate('Login')},
        ]);
        chuyentrang();
      })
      .catch((err) => {
        console.log(err);
      });
  }






  return (
    <View style={{ flex: 1, }}>
      <View style={{ marginTop: 20, }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>

          <Image
            style={{ width: 30, height: 30, margin: 15, }}
            source={require('../assets/arrow.png')

            }

          />
        </TouchableOpacity>



        <Text style={{ marginTop: 5, marginLeft: 10, fontSize: 25, fontStyle: 'italic', }}>Resgister</Text>
        <Text style={{ marginTop: 5, marginLeft: 10, fontSize: 15, fontStyle: 'italic', }}>Welcome back</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Image
          style={{width:350,height:280, margin: 15, }}
          source={require('../assets/logo.png')

          }

        />
      </View>


      <View style={{ marginTop: 0, alignItems: 'center', }}>
        <TextInput style={styles.Textinput} placeholder='Email' placeholderTextColor='white' onChangeText={(txt) => { setemail(txt) }}  ></TextInput>

        <TextInput style={styles.Textinput} placeholder='Username' placeholderTextColor='white' onChangeText={(txt) => { setusername(txt) }}  ></TextInput>
        <TextInput style={styles.Textinput} placeholder='Password' placeholderTextColor='white' textContentType="password"
          secureTextEntry={true} onChangeText={(txt) => { setpass(txt) }} ></TextInput>
          <TextInput style={styles.Textinput} placeholder='Re Password' placeholderTextColor='white' textContentType="password"
          secureTextEntry={true} onChangeText={(txt) => { setre_pass(txt) }} ></TextInput>

      </View>
      <View style={{ alignItems: 'center' }}>

        <TouchableHighlight style={{ marginTop: 20, marginBottom: 10, width: 250, backgroundColor: '#ff8c00', height: 30, borderRadius: 10, }}>
          <Text style={{ textAlign: 'center', marginTop: 5, color: 'white', fontWeight: 'bold' }} onPress={addUsers}  >Resgister</Text>

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

export default Resgister;
