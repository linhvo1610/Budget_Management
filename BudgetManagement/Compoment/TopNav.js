import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CurrentMonth from './CurrentMonth';
import LastMonth from './LastMonth';
import Custom from './Custom';
const Tab = createMaterialTopTabNavigator();

const TopNav = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="THÁNG TRƯỚC" component={LastMonth}

      />
      <Tab.Screen name="THÁNG HIỆN TẠI" component={CurrentMonth}

      />
      <Tab.Screen name="CUSTOM" component={Custom}

/>



    </Tab.Navigator>


  );
}

const styles = StyleSheet.create({})

export default TopNav;
