import React from 'react';
import {View, StyleSheet, Text, Image, TouchableHighlight, TextInput, TouchableOpacity} from 'react-native';
import { useState } from 'react';


const Resgister = (props) => {
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');

    const chuyentrang= () => {
        props.navigation.navigate('Login');


    }
    const addUsers = () =>{
        let obj={username: username, email:email, password:pass};
        let url='http://192.168.0.101:8000/api/users';
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
        if (email.length == 0) {
            // thông báo:
            alert("Chưa nhập email")
            return;
        }

        fetch(url, {
            method: 'POST', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
            headers: { // Định dạng dữ liệu gửi đi
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
          })
            .then((response) => {
              console.log(response.status);
              if (response.status == 201)
                alert("Đăng kí thành công ");
              chuyentrang();
            })
            .catch((err) => {
              console.log(err);
            });
    }
   
    




    return (
        <View style={{flex:1,}}>
            <View style={{marginTop:30, }}>
                <TouchableOpacity onPress={()=>props.navigation.navigate('Login')}>
                   
                <Image
          style={{width:30,height:30, margin:15,}}
          source={ require('../assets/arrow.png')
           
          }
          
        />
                </TouchableOpacity>

            

                <Text style={{marginTop:5, marginLeft:10,fontSize:25, fontStyle:'italic',}}>Resgister</Text>
                <Text style={{marginTop:5, marginLeft:10,fontSize:15, fontStyle:'italic',}}>Welcome back</Text>
            </View>
            <View style={{alignItems:'center'}}>
            <Image
          style={{width:100,height:100, margin:15,}}
          source={ require('../assets/unnamed.png')
           
          }
          
        />
            </View>
            
            <View style={{marginTop:30,alignItems:'center',  }}>
                <Text style={{color:'#ffa500', fontSize:25,}}>Spending Management</Text>
            </View>

            <View style={{marginTop:30,alignItems:'center',}}>
            <TextInput style={styles.Textinput} placeholder='Email' placeholderTextColor='white'  onChangeText={(txt)=>{setemail(txt)}}  ></TextInput>
       
                <TextInput style={styles.Textinput} placeholder='Username' placeholderTextColor='white' onChangeText={(txt)=>{setusername(txt)}}  ></TextInput>
                <TextInput style={styles.Textinput} placeholder='Password' placeholderTextColor='white'  textContentType="password"
            secureTextEntry={true} onChangeText={(txt)=>{setpass(txt)}} ></TextInput>

            </View>
            <View style={{alignItems:'center'}}>

            <TouchableHighlight style={{ marginTop: 20, marginBottom: 10, width: 250, backgroundColor: '#ff8c00', height:30, borderRadius:10, }}>
            <Text style={{ textAlign: 'center', marginTop: 5, color: 'white', fontWeight: 'bold' }} onPress={addUsers}  >Resgister</Text>

          </TouchableHighlight>
            </View>




            
        </View>
    );
}

const styles = StyleSheet.create({
    Textinput:{
        width: 350,
        height: 50,
        padding:15,
        backgroundColor:'#ff8c00',
        borderRadius:10,
        marginTop:10,
        

    }
})

export default Resgister;
