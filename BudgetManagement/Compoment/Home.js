import {StyleSheet , View, Text,Image,ScrollView, Dimensions,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { Component, useState } from 'react'


const images = [
    'https://tse3.mm.bing.net/th?id=OIP.i0EhYlhSgyDXcbRqzcqz4AHaEy&pid=Api&P=0&h=180',
    'https://tse4.mm.bing.net/th?id=OIP.CEjRZRlx4jlOfmN740fQYwHaEo&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.yKmq1Utmjq1e4kG8zWnklQHaEK&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.99y-tyFEvNeUWaoOr9kCGAHaD4&pid=Api&P=0&h=180',
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Home = ({navigation}) => {
    const [imgActive, setimgActive] = useState(0);
    
    onchange = (nativeEvent) =>{
        if(nativeEvent){
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if(slide != imgActive){
                setimgActive(slide);
            }
        }
    }

    return(
        <View>
        
        <View style={styles.ngang}>
        <Image style={styles.img} source={require( '../assets/icon.png' )} />
        <Text style={{fontSize:25,fontWeight:'bold',marginTop:20}}> Hai Nguyen </Text>
        </View>
        
        <View>
        <SafeAreaView style={styles.container}>
        <View style={styles.wrap}>
        <ScrollView onScroll={({nativeEvent}) => onchange(nativeEvent)}
        showsHorizontalScrollIndicator= {false}
        pagingEnabled
        horizontal
        style={styles.wrap}
        >
        {
            images.map((e, index)=> 
            <Image key={e}
            resizeMode='stretch'
            style={styles.wrap}
            source={{uri : e}} />
            )
        }
        
        </ScrollView>
        <View style={styles.wrapDot}>
        {
            images.map((e, index)=>
            <Text ket ={e} style={imgActive == index ? styles.doActive : styles.dot}>
            •
            </Text>
            )
        }
        </View>
        </View>
        </SafeAreaView>
        </View>

        <View style={{marginTop:70,width:250,alignSelf:'center'}}>
        <View style={styles.item0}>
            <View style={{ marginLeft: 20,  }} >
                <Text style={{fontWeight:'bold',color:'white',fontSize:24,}} > Quản lý chi tiêu </Text>
            </View>
        </View>
        </View>

        <View style={{marginTop:20}}>
        <View style={styles.item1}>
        <View >
                <TouchableOpacity>
                    <Image source={require('../assets/khoanthu.png')} style={{
                         width: 70, height: 70, borderRadius: 20,marginLeft:10
                    }} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginLeft: 20,  }} 
        
            >
                <Text style={{fontWeight:'bold',color:'white',fontSize:18,}} 
                onPress={() => { navigation.navigate('ListThu') }} > Danh sách loại thu </Text>
            </TouchableOpacity>

        </View>
        </View>
        <View style={{marginTop:0}}>
        <View style={styles.item1}>
        <View >
                <TouchableOpacity>
                    <Image source={require('../assets/Khoanchi.png')} style={{
                         width: 70, height: 70, borderRadius: 20,marginLeft:10
                    }} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginLeft: 20,  }} >
                <Text style={{fontWeight:'bold',color:'white',fontSize:18,}} 
                onPress={() => { navigation.navigate('ListChi') }} > Danh sách loại chi </Text>
            </TouchableOpacity>

        </View>
        </View>

        </View>
    )
}
export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop:70,
      justifyContent: 'center',
    },
    ngang:{
        flexDirection: 'row',
        marginTop:50,
    },
    img:{
        width:60,
        height:60,
        borderRadius:180,
        margin:10,
        resizeMode: 'contain',
    },
    wrap:{
        width: WIDTH,
        height: HEIGHT * 0.25
    },
    wrapDot:{
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        alignSelf:'center'
    },
    doActive:{
        margin:3,
        color:'black',
    },
    dot:{
        margin:3,
        color:'white'
    },
    item0: {
        alignItems: 'center',
        elevation: 10,
        margin: 10,
        backgroundColor: '#FF99CC',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        height: 70,
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
  });