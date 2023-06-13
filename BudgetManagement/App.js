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
import AddThu from './ListLoai/AddThu';
import ListThu from './ListLoai/ListThu';
import UpdateThu from './ListLoai/UpdateThu';
import AddChi from './ListLoai/AddChi';
import ListChi from './ListLoai/ListChi';
import UpdateChi from './ListLoai/UpdateChi';
import AddKhoanchi from './Compoment/AddKhoanChi';
import UpdateKhoanchi from './Compoment/UpdateKhoanChi';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name='Res' component={Resgister} options={{ title: 'Res' }} />
        <Stack.Screen name='Tab' component={Tabs} options={{ title: 'Tab' }} />

        <Stack.Screen name='Khoanthu' component={Khoanthu} options={{ title: 'Khoanthu' }} />
        <Stack.Screen name='Khoanchi' component={Khoanchi} options={{ title: 'Khoanchi' }} />
        <Stack.Screen name='Thongke' component={Thongke} options={{ title: 'Thongke' }} />
        <Stack.Screen name='Home' component={Tabs} options={{ title: 'Home' }} />
        <Stack.Screen name='AddThu' component={AddThu} options={{ title: 'Them loai thu' }} />
        <Stack.Screen name='UpdateThu' component={UpdateThu} options={{ title: 'Danh sach loai thu' }} />
        <Stack.Screen name='ListThu' component={ListThu} options={{ title: 'Update loai thu' }} />
        <Stack.Screen name='AddChi' component={AddChi} options={{ title: 'Them loai chi' }} />
        <Stack.Screen name='UpdateChi' component={UpdateChi} options={{ title: 'Danh sach loai chi' }} />
        <Stack.Screen name='ListChi' component={ListChi} options={{ title: 'Update loai chi' }} />
        <Stack.Screen name='AddKhoanchi' component={AddKhoanchi} options={{ title: 'Add khoan chi' }} />
        <Stack.Screen name='UpdateKhoanchi' component={UpdateKhoanchi} options={{ title: 'Add khoan chi' }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

