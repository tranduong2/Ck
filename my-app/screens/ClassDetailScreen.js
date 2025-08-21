// screens/ClassDetailScreen.js
import React, { useState, useEffect } from "react";
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";

export default function ClassDetailScreen({ route }) {
  const { subject } = route.params;
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [classStudents, setClassStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [midterm, setMidterm] = useState("");
  const [final, setFinal] = useState("");

  // Lấy danh sách sinh viên + bảng điểm từ API
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch(`https://your-backend.com/api/class/${subject}`);
        const data = await res.json();
        if (res.ok) {
          setClassStudents(data.students || []);
        } else {
          Alert.alert("Lỗi", data.message || "Không lấy được danh sách lớp");
        }
      } catch (err) {
        console.log(err);
        Alert.alert("Lỗi", "Lỗi kết nối server");
      } finally {
        setLoading(false);
      }
    };
    fetchClass();
  }, [subject]);

  const passCount = classStudents.filter(s => (s.midterm*0.3 + s.final*0.7) >= 5).length;
  const failCount = classStudents.filter(s => (s.midterm*0.3 + s.final*0.7) < 5).length;

  const openEdit = (student) => {
    setSelectedStudent(student);
    setMidterm(student.midterm?.toString() || "0");
    setFinal(student.final?.toString() || "0");
    setModalVisible(true);
  };

  const saveEdit = async () => {
    if (!selectedStudent) return;

    const updated = { 
      studentId: selectedStudent.id, 
      subject, 
      midterm: parseFloat(midterm), 
      final: parseFloat(final) 
    };

    try {
      const res = await fetch(`https://your-backend.com/api/update-grade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Cập nhật Redux
        dispatch(actions.updateTranscript(updated));

        // Cập nhật local state để UI phản ánh ngay
        setClassStudents(prev =>
          prev.map(s => s.id === selectedStudent.id ? { ...s, midterm: updated.midterm, final: updated.final } : s)
        );

        Alert.alert("Thành công", "Điểm đã được cập nhật!");
      } else {
        Alert.alert("Lỗi", data.message || "Không lưu được điểm");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Lỗi", "Lỗi kết nối server");
    } finally {
      setModalVisible(false);
    }
  };

  if (loading) return <Text style={{ padding:20 }}>Đang tải dữ liệu...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📘 Môn học: {subject}</Text>
      <Text style={styles.item}>Tổng số sinh viên: {classStudents.length}</Text>
      <Text style={styles.item}>Đậu (≥5): {passCount}</Text>
      <Text style={styles.item}>Trượt (&lt;5): {failCount}</Text>

      <Text style={[styles.title, { marginTop: 20 }]}>👩‍🎓 Danh sách sinh viên:</Text>
      <FlatList
        data={classStudents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.studentItem} onPress={() => openEdit(item)}>
            <Text style={styles.studentText}>
              {item.name} - Điểm TB: {((item.midterm*0.3)+(item.final*0.7)).toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal chỉnh sửa */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>✏️ Sửa điểm: {selectedStudent?.name}</Text>
            <TextInput
              style={styles.input}
              value={midterm}
              keyboardType="numeric"
              placeholder="Điểm giữa kỳ"
              onChangeText={setMidterm}
            />
            <TextInput
              style={styles.input}
              value={final}
              keyboardType="numeric"
              placeholder="Điểm cuối kỳ"
              onChangeText={setFinal}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Button title="Lưu" onPress={saveEdit} />
              <Button title="Hủy" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  item: { fontSize: 16, marginBottom: 5 },
  studentItem: { padding: 15, borderBottomWidth: 1, borderColor: "#ccc" },
  studentText: { fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.3)" },
  modalBox: { width: "80%", padding: 20, backgroundColor: "#fff", borderRadius: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginVertical: 10, fontSize: 16 },
});
