import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store"; // dùng actions để cập nhật store

export default function ScheduleDetailScreen() {
  const dispatch = useDispatch();
  const { selectedDay, schedules } = useSelector((state) => state.schedule);

  // Fetch lịch từ backend
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch("https://your-backend.com/api/schedules");
        const data = await res.json();
        if (res.ok && data.success) {
          // data.schedules = { "2025-08-21": [{ subject, date, time }, ...], ... }
          dispatch(actions.setSchedules(data.schedules));
        }
      } catch (err) {
        console.log(err);
        Alert.alert("Lỗi", "Không thể lấy dữ liệu lịch từ server");
      }
    };
    fetchSchedules();
  }, []);

  if (!selectedDay) {
    return <Text style={{ padding: 20 }}>Chưa chọn ngày nào</Text>;
  }

  // Lấy danh sách môn học của ngày được chọn
  let subjects = schedules[selectedDay] || [];

  // Sắp xếp theo ngày và giờ tăng dần
  subjects = [...subjects].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{selectedDay}</Text>
      {subjects.length === 0 ? (
        <Text style={styles.empty}>Chưa có môn học nào</Text>
      ) : (
        subjects.map((item, index) => (
          <View
            key={`${selectedDay}-${item.subject}-${index}`}
            style={styles.card}
          >
            <Text style={styles.time}>
              {item.date} - {item.time}
            </Text>
            <Text style={styles.subject}>{item.subject}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  subject: {
    fontSize: 18,
    marginTop: 5,
    color: "#333",
  },
  empty: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
});
