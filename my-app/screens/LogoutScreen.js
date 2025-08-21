// screens/LogoutScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";

export default function LogoutScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user); // Lấy dữ liệu từ store

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => {
          dispatch(actions.logout()); // xóa user khỏi store
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image
        source={user?.avatar ? { uri: user.avatar } : require("../assets/icon1.png")}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.phone}>{user?.phone}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditProfile")}>
        <Text style={styles.buttonText}>Chỉnh sửa hồ sơ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ChangePassword")}>
        <Text style={styles.buttonText}>Đổi mật khẩu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={[styles.buttonText, { color: "#fff" }]}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 20, backgroundColor: "#eee" },
  name: { fontSize: 20, fontWeight: "bold" },
  email: { fontSize: 14, color: "#555", marginBottom: 4 },
  phone: { fontSize: 14, color: "#555", marginBottom: 20 },
  button: { width: "80%", padding: 14, borderRadius: 10, alignItems: "center", marginVertical: 6, borderWidth: 1, borderColor: "#007AFF" },
  buttonText: { color: "#007AFF", fontWeight: "600", fontSize: 16 },
  logoutButton: { backgroundColor: "#FF3B30", borderColor: "#FF3B30" },
});
