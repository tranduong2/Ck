import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import { TouchableOpacity, Text } from 'react-native';
import { store } from './store';

// ====== Các màn hình ======
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import StudentListScreen from './screens/StudentListScreen';
import StudentDetailScreen from './screens/StudentDetailScreen';
import AddStudentScreen from './screens/AddStudentScreen';
import ScheduleScreen from './screens/ScheduleScreen';          
import ScheduleDetailScreen from './screens/ScheduleDetailScreen'; 

const Stack = createNativeStackNavigator();

// ====== Điều hướng chính ======
function RootNavigator() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    // Nếu chưa đăng nhập → chỉ cho Login & Register
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    );
  }

  // Nếu đã đăng nhập → hiển thị toàn bộ app
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={({ navigation }) => ({
          title: 'Home',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('AddStudent')}>
              <Text style={{ marginRight: 15, fontSize: 24, fontWeight: 'bold', color: '#007AFF' }}>+</Text>
            </TouchableOpacity>
          ),
        })}
      />

      {/* Màn hình Sinh viên */}
      <Stack.Screen 
        name="StudentList" 
        component={StudentListScreen} 
        options={({ navigation }) => ({
          title: 'Students',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('AddStudent')}>
              <Text style={{ marginRight: 15, fontSize: 24, fontWeight: 'bold', color: '#007AFF' }}>+</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen 
        name="StudentDetail" 
        component={StudentDetailScreen} 
        options={{ title: 'Student Detail' }} 
      />
      <Stack.Screen 
        name="AddStudent" 
        component={AddStudentScreen} 
        options={{ title: 'Add Student' }} 
      />

      {/* Màn hình Lịch học */}
      <Stack.Screen 
        name="Schedule" 
        component={ScheduleScreen} 
        options={{ title: 'Thông tin Học tập' }} 
      />
      <Stack.Screen 
        name="ScheduleDetail" 
        component={ScheduleDetailScreen} 
        options={{ title: 'Chi tiết lịch học' }} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
