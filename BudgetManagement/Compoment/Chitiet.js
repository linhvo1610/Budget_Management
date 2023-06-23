import { View, Text, formatDate, Image,TouchableOpacity } from "react-native"

const Chitiet = (props) => {
    let title = props.route.params.item_update.title
    let price = props.route.params.item_update.price
    let date = props.route.params.item_update.date
    let note = props.route.params.item_update.description
    let theloai = props.route.params.item_update.id_cat.name
    let image=props.route.params.item_update.id_cat.image
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };
    return (
        <View style={{}}>
            <View style={{ borderWidth: 1, flexDirection: 'row',height:55,padding:10 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Tab')}>

                    <Image
                        style={{ width: 30, height: 30, }}
                        source={require('../assets/arrow.png')
                        }

                    />
                </TouchableOpacity>
                <Text style={{ marginLeft: 130, color: "blue", fontSize: 24, fontWeight: 'bold', }}>Thông tin chi tiết</Text>
            </View>
            <View style={{backgroundColor:'#EEEEEE',}}>
            <View style={{width:'90%', height:320,backgroundColor:'white',alignSelf:'center',marginTop:30,flexDirection:'column',padding:15,borderRadius:10}}>
            
            <View style={{flexDirection:'row'}}>
            <Image style={{borderRadius:180,width:60,height:60,resizeMode: 'stretch',}} source={{uri: "http://192.168.1.8:8000" + image}} />
            <Text style={{fontSize:24,fontWeight:'bold',marginTop:8,marginLeft:10,width:260,}}
            >{title}</Text>
            <Text style={{fontSize:24,fontWeight:'bold',marginTop:8,marginLeft:14,color:'red'}}
            >{price}</Text>
            </View>

            <View style={{borderBottomColor: '#DDDDDD', borderBottomWidth: 1,marginTop:13,margin:10}} />

            <View style={{flexDirection:'row'}}>
            <Image style={{borderRadius:180,width:40,height:40,resizeMode: 'stretch',}} source={require('../assets/diagram.png')} />
            <Text style={{fontSize:20,marginTop:9,marginLeft:10,width:120,}}
            >Phân Loại</Text>
            <Text style={{fontSize:20,marginTop:8,marginLeft:10,marginLeft:20}}
            >{theloai}</Text>
            </View>

            <View style={{borderBottomColor: '#DDDDDD', borderBottomWidth: 1,marginTop:13,margin:10}} />

            <View style={{flexDirection:'row'}}>
            <Image style={{borderRadius:180,width:40,height:40,resizeMode: 'stretch',}} source={require('../assets/calendar.png')} />
            <Text style={{fontSize:20,marginTop:9,marginLeft:10,width:120,resizeMode: 'stretch',}}
            >Ngay thang</Text>
            <Text style={{fontSize:20,marginTop:8,marginLeft:10,marginLeft:20}}
            >{formatDate(date)}</Text>
            </View>
            <View style={{borderBottomColor: '#DDDDDD', borderBottomWidth: 1,marginTop:13,margin:10}} />

            <View style={{flexDirection:'row'}}>
            <Image style={{borderRadius:180,width:40,height:40,resizeMode: 'stretch',}} source={require('../assets/writing.png')} />
            <Text style={{fontSize:20,marginTop:9,marginLeft:10,width:120,}}
            >Ghi chu</Text>
            <Text style={{fontSize:20,marginTop:8,marginLeft:10,marginLeft:20}}
            >{note}</Text>
            </View>

            </View>
        </View>



        </View>
    )
}
export default Chitiet