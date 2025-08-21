import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addTranscript, updateTranscript, setTranscripts } from "../store";

export default function TranscriptDetailScreen({ route, navigation }) {
  const { studentId } = route.params;
  const dispatch = useDispatch();

  const transcripts =
    useSelector((state) => state.transcript.transcripts[studentId]) || [];

  const [scores, setScores] = useState(transcripts.map((t) => ({ ...t })));
  const [loading, setLoading] = useState(false);

  // Fetch dữ liệu từ API khi màn hình load
  useEffect(() => {
    const fetchTranscripts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://your-backend.com/api/students/${studentId}/transcripts`
        );
        const data = await res.json();
        if (res.ok) {
          setScores(data.transcripts || []);
          dispatch(
            setTranscripts({ studentId, transcripts: data.transcripts || [] })
          );
        } else {
          Alert.alert("Lỗi", data.message || "Không lấy được bảng điểm");
        }
      } catch (err) {
        console.log(err);
        Alert.alert("Lỗi", "Không thể kết nối tới server");
      } finally {
        setLoading(false);
      }
    };
    fetchTranscripts();
  }, []);

  const handleAddSubject = () => {
    setScores([...scores, { subject: "", midterm: "", final: "" }]);
  };

  const handleDeleteSubject = (index) => {
    Alert.alert("Xác nhận", "Bạn có muốn xóa môn này không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          const newScores = scores.filter((_, i) => i !== index);
          setScores(newScores);
        },
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const newScores = scores.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    );
    setScores(newScores);
  };

  const handleSave = async () => {
    if (scores.length === 0) {
      Alert.alert("Chưa có môn học", "Vui lòng thêm ít nhất 1 môn.");
      return;
    }

    try {
      const res = await fetch(
        `https://your-backend.com/api/students/${studentId}/transcripts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transcripts: scores }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        scores.forEach((item) => {
          if (!item.subject) return;
          const existed = transcripts.find((t) => t.subject === item.subject);
          if (existed) {
            dispatch(
              updateTranscript({
                studentId,
                subject: item.subject,
                midterm: parseFloat(item.midterm) || 0,
                final: parseFloat(item.final) || 0,
              })
            );
          } else {
            dispatch(
              addTranscript({
                studentId,
                transcript: {
                  subject: item.subject,
                  midterm: parseFloat(item.midterm) || 0,
                  final: parseFloat(item.final) || 0,
                },
              })
            );
          }
        });
        Alert.alert("Thành công", "Bảng điểm đã được lưu!");
        navigation.goBack();
      } else {
        Alert.alert("Lỗi", data.message || "Không lưu được bảng điểm");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Lỗi", "Không thể kết nối tới server");
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <TextInput
        style={[styles.input, { flex: 2 }]}
        placeholder="Môn học"
        value={item.subject}
        onChangeText={(text) => handleChange(index, "subject", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Giữa kỳ"
        value={item.midterm?.toString() || ""}
        keyboardType="numeric"
        onChangeText={(text) => handleChange(index, "midterm", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cuối kỳ"
        value={item.final?.toString() || ""}
        keyboardType="numeric"
        onChangeText={(text) => handleChange(index, "final", text)}
      />
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDeleteSubject(index)}
      >
        <Text style={{ color: "red", fontWeight: "bold" }}>X</Text>
      </TouchableOpacity>
    </View>
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
      <Text style={styles.title}>Bảng điểm chi tiết</Text>

      <View style={styles.header}>
        <Text style={[styles.headerCell, { flex: 2 }]}>Môn học</Text>
        <Text style={styles.headerCell}>Giữa kỳ</Text>
        <Text style={styles.headerCell}>Cuối kỳ</Text>
        <Text style={styles.headerCell}>Xóa</Text>
      </View>

      <FlatList
        data={scores}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.addBtn} onPress={handleAddSubject}>
        <Text style={styles.addText}>+ Thêm môn</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Lưu bảng điểm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 5,
  },
  headerCell: { flex: 1, fontWeight: "bold", textAlign: "center" },
  row: { flexDirection: "row", alignItems: "center", marginVertical: 6 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 6,
    textAlign: "center",
    marginHorizontal: 3,
  },
  deleteBtn: {
    paddingHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtn: {
    borderWidth: 1,
    borderColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  addText: { color: "#007bff", fontWeight: "bold" },
  button: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
