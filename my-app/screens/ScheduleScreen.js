import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";

export default function ScheduleDetailScreen() {
  const dispatch = useDispatch();
  const { selectedDay, schedules } = useSelector((state) => state.schedule);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://your-backend.com/api/schedules");
        const data = await res.json();
        if (res.ok && data.schedules) {
          dispatch(actions.setSchedules(data.schedules));
        } else {
          Alert.alert("Lỗi", "Dữ liệu lịch không hợp lệ từ server");
        }
      } catch (err) {
        console.log(err);
        Alert.alert("Lỗi", "Không thể lấy dữ liệu lịch từ server");
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, [dispatch]);

  if (!selectedDay) {
    return <Text style={{ padding: 20 }}>Chưa chọn ngày nào</Text>;
  }

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  let subjects = schedules[selectedDay] || [];
  subjects = [...subjects].sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{selectedDay}</Text>
      {subjects.length === 0 ? (
        <Text style={styles.empty}>Chưa có môn học nào</Text>
      ) : (
        subjects.map((item, index) => (
          <View key={`${selectedDay}-${item.subject}-${index}`} style={styles.card}>
            <Text style={styles.time}>{item.date} - {item.time}</Text>
            <Text style={styles.subject}>{item.subject}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#333" },
  card: { backgroundColor: "#fff", padding: 20, marginBottom: 15, borderRadius: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 3 }, shadowRadius: 5, elevation: 3 },
  time: { fontSize: 16, fontWeight: "bold", color: "#007bff" },
  subject: { fontSize: 18, marginTop: 5, color: "#333" },
  empty: { fontSize: 16, color: "#666", fontStyle: "italic" },
});
