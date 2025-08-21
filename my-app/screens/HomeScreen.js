import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setStudents } from "../store"; // action redux lưu dữ liệu

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const students = useSelector((state) => state.auth.students);

  const [search, setSearch] = useState("");

  useEffect(() => {
    // Load dữ liệu user & students từ backend
    const fetchData = async () => {
      try {
        // giả lập API
        const userRes = await fetch("https://your-backend.com/api/user");
        const userData = await userRes.json();
        dispatch(setUser(userData));

        const studentsRes = await fetch("https://your-backend.com/api/students");
        const studentsData = await studentsRes.json();
        dispatch(setStudents(studentsData));
      } catch (err) {
        console.log("Error fetching data:", err);
        Alert.alert("Lỗi", "Không thể tải dữ liệu từ server");
      }
    };

    fetchData();
  }, [dispatch]);

  const studentCount = students.length;

  // Danh sách chức năng
  const features = [
    { id: 1, title: "Danh sách SV", icon: "book-outline", screen: "StudentList" },
    { id: 2, title: "Hồ Sơ", icon: "person-outline", screen: "Profile" },
    { id: 3, title: "Báo Cáo", icon: "document-text-outline", screen: "Report" },
    { id: 4, title: "Chỉnh Sửa", icon: "create-outline", screen: "EditProfile" },
    { id: 5, title: "Lịch Dạy", icon: "calendar-outline", screen: "Schedule" },
    { id: 6, title: "Trao đổi", icon: "chatbubble-outline", screen: "Chat" },
    { id: 7, title: "Báo Cáo Khác", icon: "document-attach-outline", screen: "OtherReport" },
    { id: 8, title: "Bảng Điểm", icon: "school-outline", screen: "Transcript" },
  ];

  const filteredFeatures = features.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchBar}>
        <Ionicons name="menu" size={24} color="#333" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm chức năng..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons
          name="notifications-outline"
          size={22}
          color="#333"
          style={{ marginHorizontal: 8 }}
        />
        <Ionicons name="person-circle-outline" size={26} color="#333" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 15, paddingBottom: 100 }}>
        {/* Box thông tin nhanh */}
        <View style={styles.infoBox}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Chào mừng</Text>
            <Text style={styles.infoValue}>
              {user?.username || "Người dùng"}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Số sinh viên</Text>
            <Text style={styles.infoValue}>{studentCount}</Text>
          </View>
        </View>

        {/* Kết quả tìm kiếm */}
        {search.length > 0 ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Kết quả tìm kiếm</Text>
            <View style={styles.grid}>
              {filteredFeatures.length > 0 ? (
                filteredFeatures.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.iconBox}
                    onPress={() => navigation.navigate(item.screen)}
                  >
                    <Ionicons name={item.icon} size={28} color="#007AFF" />
                    <Text style={styles.iconText}>{item.title}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={{ textAlign: "center", color: "#888" }}>
                  Không tìm thấy chức năng
                </Text>
              )}
            </View>
          </View>
        ) : (
          <>
            {/* Thông tin cơ bản */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Thông Tin Cơ Bản</Text>
              <View style={styles.grid}>
                <TouchableOpacity
                  style={styles.iconBox}
                  onPress={() => navigation.navigate("StudentList")}
                >
                  <Ionicons name="book-outline" size={28} color="#007AFF" />
                  <Text style={styles.iconText}>Danh sách SV</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBox}
                  onPress={() => navigation.navigate("Profile")}
                >
                  <Ionicons name="person-outline" size={28} color="#007AFF" />
                  <Text style={styles.iconText}>Hồ Sơ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBox}
                  onPress={() => navigation.navigate("Report")}
                >
                  <Ionicons name="document-text-outline" size={28} color="#007AFF" />
                  <Text style={styles.iconText}>Báo Cáo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBox}
                  onPress={() => navigation.navigate("Transcript")}
                >
                  <Ionicons name="school-outline" size={28} color="#007AFF" />
                  <Text style={styles.iconText}>Bảng Điểm</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Gần đây */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Gần Đây</Text>
              <View style={styles.grid}>
                <TouchableOpacity
                  style={styles.iconBox}
                  onPress={() => navigation.navigate("Schedule")}
                >
                  <Ionicons name="calendar-outline" size={28} color="#007AFF" />
                  <Text style={styles.iconText}>Lịch Dạy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBox}
                  onPress={() => navigation.navigate("Chat")}
                >
                  <Ionicons name="chatbubble-outline" size={28} color="#007AFF" />
                  <Text style={styles.iconText}>Trao đổi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBox}
                  onPress={() => navigation.navigate("OtherReport")}
                >
                  <Ionicons name="document-attach-outline" size={28} color="#007AFF" />
                  <Text style={styles.iconText}>Báo Cáo Khác</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* TabBar iOS style */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("StudentList")}
        >
          <Ionicons name="book-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItemCenter}
          onPress={() => navigation.navigate("AddStudent")}
        >
          <Ionicons name="add-circle" size={56} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Ionicons name="people-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Logout")}
        >
          <Ionicons name="settings-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 36,
    marginHorizontal: 8,
    color: "#333",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  infoItem: { flex: 1, alignItems: "center" },
  infoLabel: { fontSize: 14, color: "#777" },
  infoValue: { fontSize: 17, fontWeight: "600", color: "#111", marginTop: 4 },
  divider: { width: 1, backgroundColor: "#eee" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#222",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  iconBox: {
    width: "45%",
    alignItems: "center",
    marginVertical: 14,
  },
  iconText: { marginTop: 6, fontSize: 14, color: "#333" },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  tabItem: { flex: 1, alignItems: "center" },
  tabItemCenter: { marginTop: -25 },
});
