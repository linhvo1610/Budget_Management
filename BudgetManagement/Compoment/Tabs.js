import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Khoanthu from './Khoanthu';
import Khoanchi from './Khoanchi';
import Thongke from './Thongke';
import Setting from './setting';
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator  screenOptions={{headerShown:false}}
        >
          <Tab.Screen name="Khoanthu" component={Khoanthu} options={{
            tabBarIcon: () =>(
              <Image style={{width:30, height:30,}} resizeMode="stretch" source={require('../assets/khoanthu.png')}/>          )}}         />
         
         
          <Tab.Screen name="Khoanchi" component={Khoanchi} options={{
            tabBarIcon: () =>(
              <Image style={{width:30, height:30,}} resizeMode="stretch" source={require('../assets/Khoanchi.png')}/>          )}} />
          <Tab.Screen name="Thongke" component={Thongke}
          options={{
            tabBarIcon: () =>(
              <Image style={{width:30, height:30,}} resizeMode="stretch" source={require('../assets/Thongke.png')}/>          )}} />

               <Tab.Screen name="Setting" component={Setting}
          options={{
            tabBarIcon: () =>(
              <Image style={{width:30, height:30,}} resizeMode="stretch" source={require('../assets/Info.png')}/>          )}} />
        </Tab.Navigator>
  
    );
}

const styles = StyleSheet.create({})

export default Tabs;
