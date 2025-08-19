import { configureStore, createSlice } from "@reduxjs/toolkit";

// ====================== AUTH SLICE ======================
const initialAuthState = {
  isLoggedIn: false,
  user: null,
  students: [
    { id: "72DCHT20030", name: "Nguyễn Phú Xuân Thao", dob: "01/01/2000", address: "Hà Nội", email: "thao@example.com" },
    { id: "72DCHT20004", name: "Nguyễn Đình Minh", dob: "02/02/2000", address: "Hà Nội", email: "minh@example.com" },
  ],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex((s) => s.id === action.payload.id);
      if (index >= 0) state.students[index] = action.payload;
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter((s) => s.id !== action.payload);
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
  },
});

export const { login, logout, updateStudent, deleteStudent, addStudent } = authSlice.actions;


// ====================== SCHEDULE SLICE ======================
// Dữ liệu mẫu: lịch học cho các ngày trong tuần
const initialScheduleState = {
  schedules: {
    "Thứ 2": [
      { id: "1", start: "6h46", end: "9h25", subject: "Lập trình Mobile App" },
      { id: "2", start: "9h30", end: "12h10", subject: "Nhập môn tương tác người dùng máy" },
      { id: "3", start: "13h40", end: "17h15", subject: "Lập trình Web (C2.102)" },
    ],
    "Thứ 3": [
      { id: "4", start: "7h40", end: "10h20", subject: "Thương mại điện tử" },
      { id: "5", start: "13h45", end: "15h25", subject: "Lập trình Web" },
    ],
    "Thứ 6": [
      { id: "6", start: "6h45", end: "9h25", subject: "Nhập môn tương tác người và máy" },
      { id: "7", start: "9h30", end: "12h10", subject: "Thương mại điện tử" },
    ],
  },
  selectedDay: null, // ngày đang được chọn để hiển thị chi tiết
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: initialScheduleState,
  reducers: {
    selectDay: (state, action) => {
      state.selectedDay = action.payload; // chọn ngày (Thứ 2, Thứ 3, ...)
    },
    addSchedule: (state, action) => {
      const { day, schedule } = action.payload;
      if (!state.schedules[day]) state.schedules[day] = [];
      state.schedules[day].push(schedule);
    },
    removeSchedule: (state, action) => {
      const { day, id } = action.payload;
      state.schedules[day] = state.schedules[day].filter((item) => item.id !== id);
    },
  },
});

export const { selectDay, addSchedule, removeSchedule } = scheduleSlice.actions;


// ====================== STORE ======================
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    schedule: scheduleSlice.reducer,
  },
});
