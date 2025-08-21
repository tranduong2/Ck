import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store"; // dùng actions để cập nhật store

export default function ReportScreen({ navigation }) {
  const dispatch = useDispatch();
  const transcripts = useSelector((state) => state.transcript.transcripts);

  // Lấy danh sách môn học (unique từ toàn bộ transcript)
  const allSubjects = Object.values(transcripts).flat().map((t) => t.subject);
  const uniqueSubjects = [...new Set(allSubjects)];

  // Fetch từ backend khi mở màn hình
  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const res = await fetch("https://your-backend.com/api/transcripts");
        const data = await res.json();
        if (res.ok && data.success) {
          // data.transcripts là object { studentId: [{subject, midterm, final}, ...], ... }
          dispatch(actions.setTranscripts(data.transcripts));
        }
      } catch (err) {
        console.log(err);
        Alert.alert("Lỗi", "Không thể lấy dữ liệu báo cáo từ server");
      }
    };
    fetchTranscripts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách môn học dạy</Text>
      <FlatList
        data={uniqueSubjects}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.classItem}
            onPress={() => navigation.navigate("ClassDetail", { subject: item })}
          >
            <Text style={styles.classText}>📘 {item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, color: "#333" },
  classItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  classText: { fontSize: 18, color: "#333" },
});
