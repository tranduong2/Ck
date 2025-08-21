// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null, // { username, email?, avatar?, phone? }
    students: [
      {
        id: "SV001",
        name: "Nguyễn Văn A",
        dob: "2000-01-01",
        address: "Hà Nội",
        email: "a@gmail.com",
        avatar: null,
        transcripts: [
          { subject: "Toán", midterm: 7, final: 8 },
          { subject: "Lập trình C", midterm: 6, final: 7 },
        ],
      },
      {
        id: "SV002",
        name: "Trần Thị B",
        dob: "2000-02-02",
        address: "Hải Phòng",
        email: "b@gmail.com",
        avatar: null,
        transcripts: [
          { subject: "Toán", midterm: 8, final: 9 },
          { subject: "Lập trình C", midterm: 7, final: 8 },
        ],
      },
    ],
  },
  reducers: {
    // ====== Auth ======
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = { username: action.payload.username };
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },

    // ====== Sinh viên ======
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const idx = state.students.findIndex(s => s.id === action.payload.id);
      if (idx !== -1) {
        state.students[idx] = { ...state.students[idx], ...action.payload };
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(s => s.id !== action.payload);
    },

    // ====== Bảng điểm ======
    addTranscript: (state, action) => {
      const { studentId, transcript } = action.payload;
      const student = state.students.find(s => s.id === studentId);
      if (student) {
        student.transcripts.push(transcript);
      }
    },
    updateTranscript: (state, action) => {
      const { studentId, subject, midterm, final } = action.payload;
      const student = state.students.find(s => s.id === studentId);
      if (student) {
        const idx = student.transcripts.findIndex(t => t.subject === subject);
        if (idx !== -1) {
          student.transcripts[idx] = { subject, midterm, final };
        } else {
          student.transcripts.push({ subject, midterm, final });
        }
      }
    },
    updateScore: (state, action) => {
      const { studentId, transcripts } = action.payload;
      const student = state.students.find((s) => s.id === studentId);
      if (student) {
        student.transcripts = transcripts;
      }
    },
  },
});

export const {
  login,
  logout,
  addStudent,
  updateStudent,
  deleteStudent,
  addTranscript,
  updateTranscript,
  updateScore,
} = authSlice.actions;

export default authSlice.reducer;
