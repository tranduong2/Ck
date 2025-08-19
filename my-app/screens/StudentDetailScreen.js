import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { updateStudent, deleteStudent } from "../store";

export default function StudentDetailScreen({ route, navigation }) {
  const { student } = route.params;
  const dispatch = useDispatch();

  const [name, setName] = useState(student.name);
  const [dob, setDob] = useState(student.dob);
  const [address, setAddress] = useState(student.address);
  const [email, setEmail] = useState(student.email);

  const handleUpdate = () => {
    dispatch(updateStudent({ id: student.id, name, dob, address, email }));
    Alert.alert("Thành công", "Thông tin đã được cập nhật!");
  };

  const handleDelete = () => {
    dispatch(deleteStudent(student.id));
    Alert.alert("Đã xóa", "Sinh viên đã bị xóa!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header iOS */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông Tin Sinh Viên</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.card}>
          <Text style={styles.label}>Mã sinh viên:</Text>
          <TextInput style={styles.input} value={student.id} editable={false} />

          <Text style={styles.label}>Họ tên:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Ngày sinh:</Text>
          <TextInput style={styles.input} value={dob} onChangeText={setDob} />

          <Text style={styles.label}>Quê quán:</Text>
          <TextInput style={styles.input} value={address} onChangeText={setAddress} />

          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteText}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateText}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: { fontSize: 14, color: "#555", marginBottom: 4, fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#F7F7F7",
    color: "#333",
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 8 },
  deleteBtn: {
    flex: 1,
    backgroundColor: "#e74c3c",
    padding: 14,
    borderRadius: 10,
    marginRight: 8,
    alignItems: "center",
  },
  deleteText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  updateBtn: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    marginLeft: 8,
    alignItems: "center",
  },
  updateText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
