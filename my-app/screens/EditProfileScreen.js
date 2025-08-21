// screens/EditProfileScreen.js
import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";

export default function EditProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAvatar(user.avatar || null);
    }
  }, [user]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Quyền bị từ chối", "Cần cấp quyền truy cập thư viện ảnh!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const saveProfile = async () => {
    if (!name || !email || !phone) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://your-backend.com/api/user/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, avatar }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        // Cập nhật Redux
        dispatch(actions.login({ ...user, name, email, phone, avatar }));
        Alert.alert("Thành công", "Thông tin cá nhân đã được cập nhật!");
        navigation.goBack();
      } else {
        Alert.alert("Lỗi", data.message || "Không lưu được thông tin");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Lỗi", "Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: "#F9F9F9" }}>
      <Text style={styles.title}>✏️ Chỉnh sửa hồ sơ cá nhân</Text>

      <TouchableOpacity style={styles.avatarBtn} onPress={pickImage}>
        <Image
          source={avatar ? { uri: avatar } : require("../assets/icon1.png")}
          style={styles.avatar}
        />
        <Ionicons
          name="camera-outline"
          size={24}
          color="#007AFF"
          style={styles.cameraIcon}
        />
      </TouchableOpacity>

      <Text style={styles.label}>Tên</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nhập tên" />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Nhập email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>SĐT</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Nhập số điện thoại"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={saveProfile} disabled={loading}>
        <Text style={styles.saveText}>{loading ? "Đang lưu..." : "Lưu thông tin"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  avatarBtn: { alignSelf: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#eee" },
  cameraIcon: { position: "absolute", bottom: 0, right: 0 },
  label: { fontSize: 14, color: "#555", marginBottom: 4, marginTop: 12 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 12, marginBottom: 12, backgroundColor: "#fff" },
  saveBtn: { backgroundColor: "#007AFF", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 20 },
  saveText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
