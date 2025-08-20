import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function TranscriptScreen() {
  const transcripts = useSelector((state) => state.auth.transcripts) || [];

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.subject}>{item.subject}</Text>
      <Text style={styles.score}>Điểm: {item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📘 Bảng điểm</Text>

      {transcripts.length === 0 ? (
        <Text style={styles.empty}>Chưa có dữ liệu bảng điểm</Text>
      ) : (
        <FlatList
          data={transcripts}
          keyExtractor={(item, index) => item.id || `${item.subject}-${index}`}
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
  subject: { fontSize: 16, fontWeight: "500", marginBottom: 4 },
  score: { fontSize: 15, color: "#555" },
});
