import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectDay } from "../store";

export default function ScheduleScreen({ navigation }) {
  const schedules = useSelector((state) => state.schedule.schedules);
  const dispatch = useDispatch();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(schedules).map((day) => {
        const subjects = schedules[day];
        const firstSubject = subjects.length > 0 ? subjects[0].subject : "Chưa có môn học";

        return (
          <TouchableOpacity
            key={day}
            style={styles.card}
            onPress={() => {
              dispatch(selectDay(day));
              navigation.navigate("ScheduleDetail");
            }}
          >
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.subText}>{subjects.length} môn học</Text>
            <Text style={styles.subjectPreview}>• {firstSubject}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  card: {
    backgroundColor: "#f0f8ff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  dayText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
  },
  subText: {
    fontSize: 16,
    marginTop: 5,
    color: "#555",
  },
  subjectPreview: {
    fontSize: 15,
    marginTop: 8,
    fontStyle: "italic",
    color: "#333",
  },
});
