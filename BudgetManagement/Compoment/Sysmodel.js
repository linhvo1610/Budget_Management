import { View, Text,Modal,TouchableOpacity,LinearGradient } from 'react-native'
import React from 'react'

const Sysmodel = ({message,visible,onHide,ondangx}) => {
  return (
    <Modal visible={visible} transparent={true} >
                <View style={{flex:1,backgroundColor:'rgba(00,00,00,.5)',
                                justifyContent:'center',alignItems:'center',padding:20 }}>
                                <View style={{
                                    width:280,height:138,backgroundColor:'white',borderRadius:10,padding:20}}>
                                    
                                        <View style={{justifyContent:'center',
                                                alignItems:'center',marginBottom:5}}> 
                                        </View>
                                        <View>
                                                <Text style={{fontSize:20,textAlign:'center',}}>Đăng xuất khỏi tài khoản của bạn?</Text>
                                        </View>
                                             <View style={{width:200,marginTop:20}}>
                                                <View style={{width:120,flexDirection:'row',marginLeft:0}}>
                                                <TouchableOpacity style={{width:'100%',height:40,borderRadius:0,borderTopWidth:0.5}}
                                                onPress={onHide}>
                                                <Text style={{fontSize:17,textAlign:'center',marginTop:6,color:'blue'}} >Hủy</Text>
                                                </TouchableOpacity>
                                                <View style={{width:120}}>
                                                <TouchableOpacity style={{width:'100%',height:40,borderRadius:0,borderLeftWidth:0.5,borderTopWidth:0.5}}
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