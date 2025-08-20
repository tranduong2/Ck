import { configureStore, createSlice } from "@reduxjs/toolkit";

// ====================== AUTH SLICE ======================
const initialAuthState = {
  isLoggedIn: false,
  user: null,
  students: [
    {
      id: "72DCHT20030",
      name: "Nguyễn Phú Xuân Thao",
      dob: "01/01/2000",
      address: "Hà Nội",
      email: "thao@example.com",
    },
    {
      id: "72DCHT20004",
      name: "Nguyễn Đình Minh",
      dob: "02/02/2000",
      address: "Hà Nội",
      email: "minh@example.com",
    },
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

export const { login, logout, updateStudent, deleteStudent, addStudent } =
  authSlice.actions;

// ====================== TRANSCRIPT SLICE ======================
const initialTranscriptState = {
  transcripts: {
    "72DCHT20030": [
      { subject: "Lập trình Web", score: 8.5 },
      { subject: "Cơ sở dữ liệu", score: 7.5 },
    ],
    "72DCHT20004": [
      { subject: "Mạng máy tính", score: 9.0 },
      { subject: "Lập trình Mobile", score: 8.0 },
    ],
  },
};

const transcriptSlice = createSlice({
  name: "transcript",
  initialState: initialTranscriptState,
  reducers: {
    addTranscript: (state, action) => {
      const { studentId, transcript } = action.payload;
      if (!state.transcripts[studentId]) state.transcripts[studentId] = [];
      state.transcripts[studentId].push(transcript);
    },
    updateTranscript: (state, action) => {
      const { studentId, subject, score } = action.payload;
      const record = state.transcripts[studentId]?.find(
        (t) => t.subject === subject
      );
      if (record) record.score = score;
    },
  },
});

export const { addTranscript, updateTranscript } = transcriptSlice.actions;

// ====================== REPORT SLICE ======================
const initialReportState = {
  reports: {
    "72DCHT20030": "Học tập tốt, cần cải thiện kỹ năng thuyết trình.",
    "72DCHT20004": "Tích cực tham gia lớp học, có tiềm năng phát triển.",
  },
};

const reportSlice = createSlice({
  name: "report",
  initialState: initialReportState,
  reducers: {
    addReport: (state, action) => {
      const { studentId, report } = action.payload;
      state.reports[studentId] = report;
    },
    updateReport: (state, action) => {
      const { studentId, report } = action.payload;
      if (state.reports[studentId]) state.reports[studentId] = report;
    },
  },
});

export const { addReport, updateReport } = reportSlice.actions;

// ====================== SCHEDULE SLICE ======================
const initialScheduleState = {
  schedules: {
    "Thứ 2": [
      { subject: "Lập trình Web", date: "2025-09-10", time: "08:00" },
      { subject: "Cơ sở dữ liệu", date: "2025-09-15", time: "13:30" },
    ],
    "Thứ 4": [
      { subject: "Mạng máy tính", date: "2025-09-12", time: "09:00" },
      { subject: "Lập trình Mobile", date: "2025-09-20", time: "14:00" },
    ],
  },
  selectedDay: null, // 👈 thêm để tránh lỗi selectDay
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: initialScheduleState,
  reducers: {
    selectDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    addSchedule: (state, action) => {
      const { studentId, schedule } = action.payload;
      if (!state.schedules[studentId]) state.schedules[studentId] = [];
      state.schedules[studentId].push(schedule);
    },
    updateSchedule: (state, action) => {
      const { studentId, subject, newSchedule } = action.payload;
      const index = state.schedules[studentId]?.findIndex(
        (s) => s.subject === subject
      );
      if (index >= 0) state.schedules[studentId][index] = newSchedule;
    },
    deleteSchedule: (state, action) => {
      const { studentId, subject } = action.payload;
      state.schedules[studentId] = state.schedules[studentId]?.filter(
        (s) => s.subject !== subject
      );
    },
  },
});

export const { selectDay, addSchedule, updateSchedule, deleteSchedule } =
  scheduleSlice.actions;

// ====================== STORE ======================
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    transcript: transcriptSlice.reducer,
    report: reportSlice.reducer,
    schedule: scheduleSlice.reducer,
  },
});
