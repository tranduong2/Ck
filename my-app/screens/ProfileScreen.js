import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  // Dữ liệu mẫu
  const student = {
    msv: "72DCHT20030",
    name: "Nguyễn Đình Minh",
    email: "nguyendinhminh@gmail.com",
    gpa: 3.43,
    hometown: "Thanh Hóa",
    school: "Đại học công nghệ giao thông vận tải",
    phone: "+84 828007345",
    avatar: "https://i.pravatar.cc/150?img=12", // thay bằng URL ảnh của bạn
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}></View>
        <Image source={{ uri: student.avatar }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.msv}>MSV: {student.msv}</Text>
          <Text style={styles.text}>Họ Tên: {student.name}</Text>
          <Text style={styles.text}>email: {student.email}</Text>
          <Text style={styles.text}>GPA: {student.gpa}</Text>
          <Text style={styles.text}>Quê quán: {student.hometown}</Text>
          <Text style={styles.text}>Trường học: {student.school}</Text>
          <Text style={styles.text}>Số điện thoại: {student.phone}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    height: 100,
    backgroundColor: "#2ecc71", // màu xanh giống hình
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginTop: -50,
  },
  info: {
    marginTop: 10,
    alignItems: "flex-start",
    width: "80%",
  },
  msv: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    alignSelf: "center",
  },
  text: {
    fontSize: 14,
    color: "#1a73e8",
    marginBottom: 4,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#1a73e8",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
