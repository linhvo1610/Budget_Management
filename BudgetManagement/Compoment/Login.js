import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableHighlight} from 'react-native';


const Login = (props) => {


    return (
        <View style={{flex:1}}>
            <View>
                <Text style={{marginTop:15, marginLeft:25,fontSize:25, fontStyle:'italic',}}>Login</Text>
                <Text style={{marginTop:5, marginLeft:10,fontSize:15, fontStyle:'italic',}}>Welcome back</Text>
            </View>
            <View style={{marginTop:30,alignItems:'center'}}>
                <Text>Logo</Text>
            </View>
            <View style={{marginTop:30,alignItems:'center',  }}>
                <Text style={{color:'#ffa500', fontSize:25,}}>Spending Management</Text>
            </View>

            <View style={{marginTop:30,alignItems:'center',}}>
                <TextInput style={styles.Textinput} placeholder='Username' placeholderTextColor='white'></TextInput>
                <TextInput style={styles.Textinput} placeholder='Password' placeholderTextColor='white'  textContentType="password"
            secureTextEntry={true}></TextInput>

            </View>
            <View style={{alignItems:'center'}}>

            <TouchableHighlight style={{ marginTop: 20, marginBottom: 10, width: 250, backgroundColor: '#ff8c00', height:30, borderRadius:10, }}>
            <Text style={{ textAlign: 'center', marginTop: 5, color: 'white', fontWeight: 'bold' }} onPress={()=> props.navigation.navigate('Home')}  >LOGIN</Text>

          </TouchableHighlight>
            </View>
            <View style={{marginTop:15,alignItems:'center'}}>
           
                <TouchableHighlight style={{ marginTop: 20, marginBottom: 10, width: 400  }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}  >You don't have an account?
            <Text style={{marginLeft:5,color:'#ff8c00'}} onPress={() => props.navigation.navigate("Res")} >Singup</Text>
            
            </Text>

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

export default Login;
