import { Modal, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler'

const Khoanchi = (props) => {
    var url = "http://192.168.1.109:3000/tb_khoanchi"
    const [listcontact, setlistcontact] = useState([])
    const [reloading, setreloading] = useState(false)

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
        const xoaKhoanchi = () => {
            var url = "http://192.168.1.109:3000/tb_khoanchi/" + item.id
            fetch(url, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    console.log(response.status);
                    // nếu log là 201 thì là tạo thành công
                    if (response.status == 200)
                        alert("Xóa thành công");
                    getData();
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        return (
            <View>
                <View style={styles.item}>

                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, width: 50, }} >Title: </Text>
                        <TouchableOpacity style={{ marginLeft: 7, width: 250, flexDirection: 'row' }}
                        // onPress={() => {
                        //     props.navigation.navigate('ChitietKhoanchi', { item_ct: item })
                        // }}
                        >
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 18, }}>{item.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginRight: -20 }}
                            onPress={() => {
                                props.navigation.navigate('UpdateKhoanchi', { item_thuchi: item })
                            }}
                        >
                            <Image style={styles.img} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10308/10308391.png' }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, width: 50, }} >Price: </Text>
                        <TouchableOpacity style={{ marginLeft: 7, width: 250, flexDirection: 'row' }} >
                            <Text style={{ color: 'black', fontSize: 18, }}
                            >{item.price} vnđ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={xoaKhoanchi}>
                            <Image style={styles.img} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9068/9068885.png' }} />
                        </TouchableOpacity>
                    </View>
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
        props.navigation.navigate('AddKhoanchi');
    }
    const quoaylai = () => {
        props.navigation.navigate('Home');
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignSelf: 'center', margin: 40 }}>
                <View style={{
                    backgroundColor: 'white', padding: 10, borderRadius: 20, elevation: 10, width: 300, alignSelf: 'center'
                }}>

                    <Text style={{ fontSize: 25, color: '#FF4500', backgroundColor: 'white', alignSelf: 'center', fontWeight: 'bold' }}>
                        Quản Lý Khoản Chi
                    </Text>
                </View>

                <TouchableOpacity onPress={chuyenAdd} >
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2921/2921226.png' }}
                        style={{ width: 40, height: 40, marginLeft: 20, marginTop: 8 }}></Image>
                </TouchableOpacity>
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

export default Khoanchi

const styles = StyleSheet.create({
    img: {
        width: 27,
        height: 27,
    },
    item: {
        elevation: 10,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        borderColor: '#FF4500',
        borderWidth: 1,
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
    centerredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
})