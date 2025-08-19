import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = () => {
    if (!username || !password || !confirm) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (password !== confirm) {
      Alert.alert('Lỗi', 'Mật khẩu không trùng khớp');
      return;
    }

    // Giả lập đăng ký thành công
    Alert.alert('Thành công', 'Đăng ký thành công!');

    // Quay lại màn hình Login
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>

      <TextInput
        placeholder="Tên đăng nhập"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Mật khẩu"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Nhập lại mật khẩu"
        secureTextEntry
        style={styles.input}
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.btnText}>Đăng ký</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>Quay về Đăng Nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  backButton: { marginTop: 15 },
  backText: { color: '#4a90e2', textAlign: 'center', fontSize: 16 },
});
