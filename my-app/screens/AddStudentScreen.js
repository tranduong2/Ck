import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addStudent } from "../store";

export default function AddStudentScreen({ navigation }) {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const handleAdd = () => {
    if (!id || !name || !address || !email) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin sinh viên");
      return;
    }
    dispatch(addStudent({ id, name, address, email }));
    Alert.alert("Thành công", "Sinh viên đã được thêm!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thêm Sinh Viên</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Avatar */}
        <View style={styles.avatarRow}>
          <TouchableOpacity style={styles.avatarBtn}>
            <Ionicons name="image-outline" size={32} color="#007AFF" />
          </TouchableOpacity>
          <Image
            source={require("../assets/icon1.png")} // hoặc một URL mặc định
            style={styles.avatar}
          />
        </View>

        {/* Form */}
        <View style={styles.card}>
          <Text style={styles.label}>Mã sinh viên:</Text>
          <TextInput style={styles.input} value={id} onChangeText={setId} placeholder="Nhập mã sinh viên" />

          <Text style={styles.label}>Tên sinh viên *</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nhập tên sinh viên" />

          <Text style={styles.label}>Quê quán *</Text>
          <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Nhập quê quán" />

          <Text style={styles.label}>Email sinh viên *</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Nhập email" keyboardType="email-address" />

          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.addText}>Tạo hồ sơ sinh viên</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* TabBar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}><Ionicons name="home" size={24} color="#007AFF" /></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Ionicons name="book-outline" size={24} color="#666" /></TouchableOpacity>
        <TouchableOpacity style={styles.tabItemCenter}><Ionicons name="add-circle" size={48} color="#007AFF" /></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Ionicons name="people-outline" size={24} color="#666" /></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><Ionicons name="settings-outline" size={24} color="#666" /></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#007AFF",
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "600" },
  avatarRow: { flexDirection: "row", justifyContent: "center", marginVertical: 16, alignItems: "center" },
  avatarBtn: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#eee" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: { fontSize: 14, color: "#555", marginBottom: 4, fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#F7F7F7",
    color: "#333",
  },
  addBtn: { backgroundColor: "#007AFF", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 8 },
  addText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
  },
  tabItem: { flex: 1, alignItems: "center" },
  tabItemCenter: { marginTop: -20 },
});
