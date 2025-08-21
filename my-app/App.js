// App.js
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
import ProfileScreen from './screens/ProfileScreen';
import TranscriptScreen from './screens/TranscriptScreen';
import TranscriptDetailScreen from './screens/TranscriptDetailScreen';
import ReportScreen from './screens/ReportScreen';
import ClassDetailScreen from './screens/ClassDetailScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import LogoutScreen from './screens/LogoutScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';

const Stack = createNativeStackNavigator();

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
      {/* Home */}
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

      {/* Sinh viên */}
      <Stack.Screen name="StudentList" component={StudentListScreen} options={{ title: 'Students' }} />
      <Stack.Screen name="StudentDetail" component={StudentDetailScreen} options={{ title: 'Student Detail' }} />
      <Stack.Screen name="AddStudent" component={AddStudentScreen} options={{ title: 'Add Student' }} />

      {/* Lịch học */}
      <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'Thông tin Học tập' }} />
      <Stack.Screen name="ScheduleDetail" component={ScheduleDetailScreen} options={{ title: 'Chi tiết lịch Dạy' }} />

      {/* Hồ sơ cá nhân */}
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Thông tin cá nhân' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Chỉnh sửa hồ sơ' }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Đổi mật khẩu' }} />

      {/* Bảng điểm */}
      <Stack.Screen name="Transcript" component={TranscriptScreen} options={{ title: 'Bảng điểm' }} />
      <Stack.Screen name="TranscriptDetail" component={TranscriptDetailScreen} options={{ title: 'Bảng điểm chi tiết' }} />

      {/* Báo cáo */}
      <Stack.Screen name="Report" component={ReportScreen} options={{ title: 'Báo cáo học tập' }} />

      {/* Lớp học */}
      <Stack.Screen name="ClassDetail" component={ClassDetailScreen} options={{ title: 'Chi tiết lớp' }} />

      {/* Logout */}
      <Stack.Screen name="Logout" component={LogoutScreen} options={{ title: 'Tài khoản' }} />
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
