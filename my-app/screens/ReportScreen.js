import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function ReportScreen() {
  const students = useSelector((state) => state.auth.students);

  // Một vài thống kê cơ bản
  const total = students.length;
  const firstStudent = total > 0 ? students[0].name : "Chưa có sinh viên";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Báo cáo thống kê</Text>
      <Text style={styles.item}>Tổng số sinh viên: {total}</Text>
      <Text style={styles.item}>Sinh viên đầu tiên: {firstStudent}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, color: "#333" },
  item: { fontSize: 16, marginBottom: 6, color: "#555" },
});
