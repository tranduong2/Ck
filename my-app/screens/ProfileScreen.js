// screens/ProfileScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Lấy dữ liệu user từ backend khi mở màn hình
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://your-backend.com/api/user/${user.id}`);
        const data = await res.json();
        if (res.ok && data.success) {
          dispatch(actions.login({ ...user, ...data.user }));
        }
      } catch (err) {
        console.log(err);
        Alert.alert("Lỗi", "Không thể lấy thông tin user");
      }
    };
    if (user?.id) fetchUser();
  }, [user?.id]);

  const InfoRow = ({ icon, text, bold }) => (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={20} color="#1a73e8" style={{ marginRight: 10 }} />
      <Text style={[styles.infoText, bold && { fontWeight: "600" }]}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <LinearGradient colors={["#4facfe", "#00f2fe"]} style={styles.header} />

        <Image
          source={user?.avatar ? { uri: user.avatar } : require("../assets/icon1.png")}
          style={styles.avatar}
        />

        <View style={styles.info}>
          <InfoRow icon="person-circle-outline" text={`Họ tên: ${user?.name || ""}`} bold />
          <InfoRow icon="mail-outline" text={`Email: ${user?.email || ""}`} />
          <InfoRow icon="call-outline" text={`SĐT: ${user?.phone || ""}`} />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <LinearGradient colors={["#1a73e8", "#4285f4"]} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Chỉnh sửa hồ sơ</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f2f6fc", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  card: {
    width: 340,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  header: { 
    height: 120, 
    width: "100%", 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20 
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#fff",
    marginTop: -55,
  },
  info: { marginTop: 12, width: "85%" },
  infoRow: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  infoText: { fontSize: 14, color: "#444" },
  button: { marginTop: 20, borderRadius: 12, overflow: "hidden", width: "70%" },
  buttonGradient: { paddingVertical: 12, alignItems: "center", borderRadius: 12 },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
