import { Modal, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'

const Khoanthu = (props) => {

        // var url = "https://63dc9b8a2308e3e319ea7194.mockapi.io/sanpham/listSpending"
        var url ="http://192.168.1.8:3000/tb_khoanthu"
        const [listcontact, setlistcontact] = useState([])
        const [reloading, setreloading] = useState(false)
    
        const [title, setphone] = useState("")
        const [price, setprice] = useState(0)
        const [date, setdate] = useState('')
        const [note, setnote] = useState('')
    
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
    
    
            return (
                <View>
                    <View style={styles.item}>
    
                        <TouchableOpacity style={{ marginLeft: 20, width: 200, }} >
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18, }}
                            >{item.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 20, width: 200, }} >
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18, }}
                            >{item.price}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 20, width: 200, }} >
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18, }}
                            >{item.date}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 20, width: 200, }} >
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18, }}
                            >{item.note}</Text>
                        </TouchableOpacity>
    
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
            props.navigation.navigate('AddKhoanthu');
        }
        const quoaylai = () => {
            props.navigation.navigate('Home');
        }
    
    
        return (
            <View style={{ flex: 1 }}>
    
            <View style={{flexDirection:'row',marginTop:60,
                justifyContent: 'center', alignItems: 'center', textAlign: "center",
                fontSize: 20, color: 'blue', backgroundColor: 'white', margin: 10, padding: 5, borderRadius: 20, elevation: 10
            }}>

                <Text style={{fontSize: 20, color: 'blue', backgroundColor: 'white',alignSelf:'center'}}>
                    Quản lý loại thu chi</Text>
            </View>
            <TouchableOpacity onPress={chuyenAdd} >
            <Image source={require('../assets/add.png')}
                style={{ width: 40, height: 40, resizeMode: 'contain',alignSelf:'flex-end',marginRight:30 }}></Image>
        </TouchableOpacity>
    
    
                <FlatList
                    data={listcontact}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl refreshing={reloading} onRefresh={reloadData} />
                    }
                    renderItem={renderContact}
                >
                </FlatList>
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
    centerredView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:22,
    },
    modalView:{
        margin:20,
        backgroundColor:'white',
        borderRadius:20,
        width:'90%',
        padding:35,
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5,
    }
})