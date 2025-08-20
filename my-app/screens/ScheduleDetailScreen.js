import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

export default function ScheduleDetailScreen() {
  const { selectedDay, schedules } = useSelector((state) => state.schedule);

  if (!selectedDay) {
    return <Text style={{ padding: 20 }}>Chưa chọn ngày nào</Text>;
  }

  const subjects = schedules[selectedDay] || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{selectedDay}</Text>
      {subjects.length === 0 ? (
        <Text style={styles.empty}>Chưa có môn học nào</Text>
      ) : (
        subjects.map((item) => (
          <View
            key={`${selectedDay}-${item.subject}-${item.start}-${item.end}`}
            style={styles.card}
          >
            <Text style={styles.time}>
              {item.start} - {item.end}
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
