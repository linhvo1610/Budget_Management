import { Alert, Button,Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const UpdateChi = ( {route,navigation} ) => {
    var url = "https://63dc9b8a2308e3e319ea7194.mockapi.io/sanpham/listSpending"
    const [showModalDialog, setshowModalDialog] = useState(false)
    const [image, setimage] = useState(route.params.image);
    const [title, settitle] = useState(route.params.title);
    const [quantity, setquantity] = useState(route.params.quantity)
    const [id, setid] = useState(route.params.id)

    const [themanh, setthemanh] = useState('');
    const [img_base, setimg_base] = useState(null);
    const [img_soure, setimg_soure] = useState(null);

    const pickImage = async ()=>{

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3], // khung view cắt ảnh 
            quality: 1,
        });
        console.log(result);
    
        if(!result.canceled){
            setimg_soure(result.assets[0].uri);
            let a_uri = result.assets[0].uri;
            let file_ext = a_uri.substring(a_uri.lastIndexOf('.') +1);
            FileSystem.readAsStringAsync(result.assets[0].uri, {encoding:'base64'})
            .then((res)=>{
                setimg_base("data:image/" + file_ext + ";base64," + res);
                console.log(img_soure);
                setthemanh(img_soure);
            })
        }
    
    
    }

    

    const update = (id) => {
        console.log(id);
        var dataContact = {
            image: themanh,
            title: title,
            quantity: quantity,
        }
        fetch(url + "/" + id, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(dataContact)
        }).then((res) => {
            alert('Cập nhật thành công')
            navigate('/');
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const quoaylai = () =>{
        navigation.navigate('ListChi');
    }

    return (
        <View>
        <TouchableOpacity onPress={quoaylai} style={{marginTop:60}}>
        <Image source={require('../assets/arrow.png')}
                        style={{width:30,height:30,resizeMode: 'contain',alignSelf:'flex-start',marginLeft:20,}}></Image>
        </TouchableOpacity>
            <Text style={{
                alignSelf: 'center', marginTop: 20, fontSize: 27, color: 'purple'
                , fontWeight: 'bold'
            }}>Sửa loại khoản chi</Text>

            <View style={{ margin: 40 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 8 }}>Title</Text>
                <TextInput style={styles.textip} onChangeText={(text) => settitle(text)} value={title} ></TextInput>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 8 }}>Quantity</Text>
                <TextInput style={styles.textip} onChangeText={(text) => setquantity(text)} value={quantity} ></TextInput>
                <Button title="Chọn ảnh minh họa!!!" onPress={pickImage}  />
          
            {img_soure && <Image source={{ uri: img_soure }} 
            style={{ width: 240, height: 160,alignSelf:'center', marginTop:15 }} />}

                <View style={{ alignSelf: 'center', marginTop: 15, }}>
                    <Text style={styles.save} onPress={()=>update(id)}> Update </Text>
                </View>
            </View>

        </View>
    )
}

export default UpdateChi

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
        width: 80, height: 40,
        backgroundColor: 'green',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        padding: 5,
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
        padding: 15,
        width: 300,
        height: 46,
        margin: 10,
        borderRadius: 10


    }
})