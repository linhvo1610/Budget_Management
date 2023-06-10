import { View, Text,Modal,TouchableOpacity,LinearGradient } from 'react-native'
import React from 'react'

const Sysmodel = ({message,visible,onHide,ondangx}) => {
  return (
    <Modal visible={visible} transparent={true} >
                <View style={{flex:1,backgroundColor:'rgba(00,00,00,.5)',
                                justifyContent:'center',alignItems:'center',padding:20 }}>
                                <View style={{
                                    width:280,backgroundColor:'white',borderRadius:10,padding:20}}>
                                    
                                        <View style={{justifyContent:'center',
                                                alignItems:'center',marginBottom:5}}> 
                                        </View>
                                        <View>
                                                <Text style={{fontSize:20,textAlign:'center',}}>Đăng xuất khỏi tài khoản của bạn?</Text>
                                        </View>
                                        <View style={{borderBottomColor: '#DDDDDD', borderBottomWidth: 1,marginTop:13}} />
                                             <View style={{width:200,marginTop:20}}>
                                                <View style={{width:120,flexDirection:'row',marginLeft:0}}>
                                                <TouchableOpacity style={{backgroundColor:'#DDDDDD',width:'100%',height:40,borderRadius:8}}
                                                onPress={onHide}>
                                                <Text style={{fontSize:17,textAlign:'center',marginTop:6,color:'blue'}} >Hủy</Text>
                                                </TouchableOpacity>
                                                <View style={{width:120}}>
                                                <TouchableOpacity style={{backgroundColor:'#DDDDDD',width:'100%',height:40,borderRadius:8}}
                                                onPress={ondangx}>
                                                <Text style={{fontSize:17,textAlign:'center',marginTop:6,color:'red'}} >Đăng xuất</Text>
                                                </TouchableOpacity>
                                                </View>
                                                </View>
                                            </View>
                                    
                                        </View>
                </View>
            </Modal>
  )
}

export default Sysmodel
// <View style={{
//     width:'100%',backgroundColor:'white',borderRadius:10,padding:20}}>
//     // heard
//     <View style={{justifyContent:'center',
//                 alignItems:'center',marginBottom:20}}>
    
//     <Text style={{fontSize:20,color:'black'}}>
//     Thong bao
//     </Text>
//     </View>

//     <View>
//         <Text>Ban muon dang xuat</Text>
//     </View>

//     // footer
//     <View>
//         <TouchableOpacity>
//             <LinearGradient style={{
//                 padding:10,borderRadius:30,with:'100%',justifyContent:'center',alignItems:'center'}}
//                 color={['#AED6F1', '#3498DB', '#2F86C1']} useAngle ={true} angle={45}>
//                 <Text>Close</Text>
//             </LinearGradient>
//         </TouchableOpacity>
//     </View>

// </View>