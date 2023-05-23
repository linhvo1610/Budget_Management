import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Compoment/Login';
import Resgister from './Compoment/Resgister';
import Home from './Compoment/Home';
import Khoanthu from './Compoment/Khoanthu';
import Khoanchi from './Compoment/Khoanchi';
import Thongke from './Compoment/Thongke';
import Setting from './Compoment/setting';
import Tabs from './Compoment/Tabs';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}  initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login} options={ {title:'Login'}} />
            <Stack.Screen name='Res' component={Resgister} options={ {title:'Res'}} />
            <Stack.Screen name='Tab' component={Tabs} options={ {title:'Tab'}} />
          
            <Stack.Screen name='Khoanthu' component={Khoanthu} options={ {title:'Khoanthu'}} />
            <Stack.Screen name='Khoanchi' component={Khoanchi} options={ {title:'Khoanchi'}} />
            <Stack.Screen name='Thongke' component={Thongke} options={ {title:'Thongke'}} />
            <Stack.Screen name='Setting' component={Setting} options={ {title:'Setting'}} />
            

	
          </Stack.Navigator>
      </NavigationContainer>

  );
}

