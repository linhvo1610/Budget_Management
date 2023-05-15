import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Compoment/Login';
import Resgister from './Compoment/Resgister';
import Home from './Compoment/Home';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}  initialRouteName='Res'>
            <Stack.Screen name='Login' component={Login} options={ {title:'Login'}} />
            <Stack.Screen name='Res' component={Resgister} options={ {title:'Res'}} />
            <Stack.Screen name='Home' component={Home} options={ {title:'Home'}} />
            

	
          </Stack.Navigator>
      </NavigationContainer>

  );
}

