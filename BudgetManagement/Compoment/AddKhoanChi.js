import { Modal, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-modern-datepicker';
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { SelectList } from 'react-native-dropdown-select-list'


const AddKhoanchi = ({ navigation }) => {


    var url = 'http://192.168.1.109:3000/tb_khoanchi';
    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState('')
    const [listcontact, setlistcontact] = useState([])
    const [reloading, setreloading] = useState(false)

    const [title, settitle] = useState("")
    const [price, setprice] = useState('')
    const [note, setnote] = useState('')
    const [dateee, setdateee] = useState('')

    function hanlerOnPress() {
        setOpen(!open);
    }
    function hanlerChange(propDate) {
        console.log(propDate);
        setDate(propDate);
    }

    const validate = () => {
        if (title.length == 0) {
            alert("không để title ")
            return false;
        } else {
            return true;
        }

    }
    var dataContact = {
        title: title,
        price: price,
        date: date,
        note: note,
    }

    const AddKchi = () => {
        if (validate() == true) {
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataContact)
            })
                .then((response) => {
                    console.log(response.status);
                    // nếu log là 201 thì là tạo thành công
                    if (response.status == 201)
                        alert("Thêm mới thành công");
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }
    const quoaylai = () => {
        navigation.navigate('Tab');
    }

    const [selected, setSelected] = React.useState("");

    const [data, setData] = React.useState([]);

    const getData = () => {
        let link_api = 'http://192.168.1.109:3000/td_loaiChi'
        fetch(link_api)
            .then((res) => {
                return res.json();
            })
            .then((res_json) => {
                let arr_for = res_json.map((item, index, src_arr) => {
                    return { label: item.id, value: item.title }
                });
                setData(arr_for);
            })
    }
    React.useEffect(() => {
        getData();
    });


    return (
        <View>
            <View style={{ flexDirection: 'row', marginTop: 40 }}>
                <TouchableOpacity style={{}} onPress={quoaylai} >
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/786/786399.png' }}
                        style={{ width: 25, height: 25, resizeMode: 'contain', marginLeft: 20, marginTop: 5 }}></Image>
                </TouchableOpacity>

                <Text style={{
                    alignSelf: 'center', fontSize: 27, color: 'red', fontWeight: 'bold', marginLeft: 50
                }}>Thêm Khoản Chi</Text>
            </View>
            <View style={{ marginLeft: 12 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 19, marginLeft: 18, marginTop: 30, }}>Title</Text>
                <TextInput style={styles.textip} onChangeText={(text) => settitle(text)} ></TextInput>

                <Text style={{ fontWeight: 'bold', fontSize: 19, marginLeft: 18, marginTop: 10 }}>Price</Text>
                <TextInput style={styles.textip} onChangeText={(text) => setprice(text)} keyboardType='numeric'></TextInput>

                <View style={{ width: 350, marginLeft: 10, borderRadius: 20, marginTop: 10 }}>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        placeholder='Loai chi'
                    />
                </View>


                <Text style={{ fontWeight: 'bold', fontSize: 19, marginLeft: 18, marginTop: 10 }}>Date</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.textipdate} value={date} onChangeText={(text) => setDate(text)} ></TextInput>

                    <TouchableOpacity onPress={hanlerOnPress}>
                        <Image source={require('../assets/lich.png')}
                            style={{ width: 50, height: 50, resizeMode: 'contain', marginLeft: -65, marginTop: 9 }}></Image>
                    </TouchableOpacity>

                </View>

                <Text style={{ fontWeight: 'bold', fontSize: 19, marginLeft: 18, marginTop: 10 }}>Note</Text>
                <TextInput style={styles.textip} onChangeText={(text) => setnote(text)} ></TextInput>

            </View>

            <View style={{ alignSelf: 'center', marginTop: 25, }}>
                <Text style={styles.save} onPress={AddKchi}> Thêm </Text>
            </View>

            <Modal animationType='slide'
                transparent={true}
                visible={open} >

                <View style={styles.centerredView}>
                    <View style={styles.modalView}>

                        <DatePicker
                            mode='calendar'
                            minimumDate={startDate}
                            selected={date}
                            onDateChange={hanlerChange}
                        />

                        <TouchableOpacity onPress={hanlerOnPress}>
                            <Text>Close</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </Modal>

        </View >
    )
}

export default AddKhoanchi
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
        width: 350,
        height: 50,
        margin: 10,
        borderRadius: 10,
        fontSize: 17,
    },
    textipdate: {
        borderWidth: 1.5,
        borderColor: 'orange',
        padding: 16,
        width: 350,
        height: 50,
        margin: 10,
        borderRadius: 10,
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
    },
})