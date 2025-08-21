import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";

export default function StudentListScreen({ navigation }) {
  const dispatch = useDispatch();
  const students = useSelector(state => state.auth.students);

  // Fetch danh sách sinh viên từ API khi màn hình load
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("https://your-backend.com/api/students");
        const data = await res.json();
        if (res.ok) {
          // data.students = [{id, name, dob, address, email, avatar}, ...]
          dispatch(actions.setStudents(data.students));
        } else {
          Alert.alert("Lỗi", data.message || "Không thể lấy danh sách sinh viên");
        }
      } catch (err) {
        console.log(err);
        Alert.alert("Lỗi", "Không thể kết nối tới server");
      }
    };
    fetchStudents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Danh sách sinh viên</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("StudentDetail", { student: item })}
          >
            {item.avatar ? (
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
            ) : (
              <Ionicons name="person-circle-outline" size={48} color="#007AFF" style={{ marginRight: 16 }} />
            )}

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.id}>Mã SV: {item.id}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#ccc" />
          </TouchableOpacity>
        )}
      />
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 16 },
  name: { fontSize: 16, fontWeight: "500", color: "#111" },
  id: { fontSize: 14, color: "#555", marginTop: 4 },
});
