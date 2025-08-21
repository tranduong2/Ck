// screens/ChangePasswordScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";

export default function ChangePasswordScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới không khớp.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://your-backend.com/api/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          oldPassword,
          newPassword
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Cập nhật Redux
        dispatch(actions.login({ ...user, password: newPassword }));
        Alert.alert("Thành công", "Mật khẩu đã được thay đổi!");
        navigation.goBack();
      } else {
        Alert.alert("Lỗi", data.message || "Không thể đổi mật khẩu.");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Lỗi", "Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔑 Đổi mật khẩu</Text>
      <TextInput
        placeholder="Mật khẩu cũ"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Mật khẩu mới"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Xác nhận mật khẩu mới"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Đang xử lý..." : "Đổi mật khẩu"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, justifyContent:"center" },
  title:{ fontSize:20, fontWeight:"bold", marginBottom:20, textAlign:"center" },
  input:{ borderWidth:1, borderColor:"#ddd", borderRadius:10, padding:12, marginBottom:12 },
  button:{ backgroundColor:"#007AFF", padding:14, borderRadius:10, alignItems:"center", marginTop:10 },
  buttonText:{ color:"#fff", fontWeight:"600", fontSize:16 },
});
