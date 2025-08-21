import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setStudents } from "../store";

export default function TranscriptScreen({ navigation }) {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.auth.students) || [];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://your-backend.com/api/students");
        const data = await res.json();
        if (res.ok) {
          dispatch(setStudents(data.students || []));
        } else {
          Alert.alert("Lỗi", data.message || "Không lấy được danh sách sinh viên");
        }
      } catch (err) {
        console.log(err);
        Alert.alert("Lỗi", "Không thể kết nối tới server");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("TranscriptDetail", { studentId: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.info}>MSSV: {item.id}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sinh viên</Text>
      {students.length === 0 ? (
        <Text style={styles.empty}>Chưa có dữ liệu sinh viên</Text>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, color: "#333" },
  empty: { fontSize: 16, color: "#888", marginTop: 20, textAlign: "center" },
  card: {
    padding: 14,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: "500", marginBottom: 4 },
  info: { fontSize: 14, color: "#555" },
});
