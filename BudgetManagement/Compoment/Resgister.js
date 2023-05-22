import React from 'react';
import {View, StyleSheet, Text, Image, TouchableHighlight, TextInput, TouchableOpacity} from 'react-native';

const Resgister = (props) => {
    return (
        <View style={{flex:1,}}>
            <View style={{marginTop:30,}}>
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
            <View style={{marginTop:30,alignItems:'center'}}>
                <Text>Logo</Text>
            </View>
            <View style={{marginTop:30,alignItems:'center',  }}>
                <Text style={{color:'#ffa500', fontSize:25,}}>Spending Management</Text>
            </View>

            <View style={{marginTop:30,alignItems:'center',}}>
            <TextInput style={styles.Textinput} placeholder='Fullname' placeholderTextColor='white'></TextInput>
                <TextInput style={styles.Textinput} placeholder='Username' placeholderTextColor='white'></TextInput>
                <TextInput style={styles.Textinput} placeholder='Password' placeholderTextColor='white'  textContentType="password"
            secureTextEntry={true}></TextInput>

            </View>
            <View style={{alignItems:'center'}}>

            <TouchableHighlight style={{ marginTop: 20, marginBottom: 10, width: 250, backgroundColor: '#ff8c00', height:30, borderRadius:10, }}>
            <Text style={{ textAlign: 'center', marginTop: 5, color: 'white', fontWeight: 'bold' }} onPress={()=>props.navigation.navigate('Login')}  >Resgister</Text>

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
