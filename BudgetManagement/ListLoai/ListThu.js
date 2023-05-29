import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { Linking } from 'react-native'
import { Switch } from 'react-native';
import Home from '../Compoment/Home';


const ListThu = (props) => {
    // var url = "https://63dc9b8a2308e3e319ea7194.mockapi.io/sanpham/listThu"
    var url= "http://192.168.1.6:3000/tb_loaiThu";
    const [listcontact, setlistcontact] = useState([])
    const [reloading, setreloading] = useState(false)

    const [isEnabled, setIsEnabled] = useState(false);
    const [title, setphone] = useState("")
    const [quantity, setemail] = useState("")
    const [image, setimage] = useState('');

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

        const handleDelete = () => {
            Alert.alert("Xóa loại khoản chi tiêu!", "Bạn có chắc chắn xóa ?", [
                {
                    text: 'Không',
                    style: 'Cancel'
                },
                {
                    text: "Đồng ý", onPress: () => {
                        fetch(url + "/" + item.id, {
                            method: 'DELETE'
                        })
                            .then((response => response.json()
                            ))
                            .then(data => {
                                const newPosts = listcontact.filter(listcontact => listcontact.id !== item.id);
                                setlistcontact(newPosts);
                            })
                            .catch(error => console.error(error));
                    }
                }
            ])
        };

        const chuyentrangEdit = () => {
            props.navigation.navigate('UpdateThu', { id: item.id, title: item.title, quantity: item.quantity, image: item.image });
        }

        return (
            <View>
                <View style={styles.item}>

                    <View >
                        <TouchableOpacity>
                            <Image style={{
                                color: '#1877f2', width: 70, height: 70, borderRadius: 20, marginLeft: 10
                            }} source={{ uri: item.image }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginLeft: 20, width: 200, }} >
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18, }}
                        >{item.title}</Text>


                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 55, }}>
                        <Text >{item.quantity}</Text>
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
        props.navigation.navigate('AddThu');
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
        <TouchableOpacity onPress={quoaylai} >
                    <Image source={require('../assets/arrow.png')}
                        style={{ width: 20, height: 20, resizeMode: 'contain',marginRight:80 }}></Image>
                </TouchableOpacity>
            <Text style={{fontSize: 20, color: 'blue', backgroundColor: 'white',marginRight:90}}>
                Quản lý loại thu chi</Text>
        </View>


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


export default ListThu

const styles = StyleSheet.create({

    xdong: {
        flexDirection: 'column',
    },
    item: {
        alignItems: 'center',
        elevation: 10,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        height: 100,
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
    item4: {
        alignItems: 'center',
        elevation: 10,
        margin: 10,
        backgroundColor: '#0099CC',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        height: 100,
    },
    item3: {
        alignItems: 'center',
        elevation: 10,
        margin: 10,
        backgroundColor: '#9966FF',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        height: 100,
    },
    item2: {
        alignItems: 'center',
        elevation: 10,
        margin: 10,
        backgroundColor: '#00CCFF',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        height: 100,
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
        backgroundColor: 'cyan',
        padding: 5,
        width: 300,
        height: 30,
        margin: 10,
        borderRadius: 10


    }

})