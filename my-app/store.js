// store.js
import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ====================== API THUNKS ======================

// Fetch students từ backend
export const fetchStudentsAPI = createAsyncThunk(
  "auth/fetchStudents",
  async () => {
    const res = await fetch("https://your-backend.com/api/students");
    const data = await res.json();
    return data.students || [];
  }
);

// Fetch transcripts
export const fetchTranscriptsAPI = createAsyncThunk(
  "transcript/fetchTranscripts",
  async () => {
    const res = await fetch("https://your-backend.com/api/transcripts");
    const data = await res.json();
    return data.transcripts || {};
  }
);

// Fetch reports
export const fetchReportsAPI = createAsyncThunk(
  "report/fetchReports",
  async () => {
    const res = await fetch("https://your-backend.com/api/reports");
    const data = await res.json();
    return data.reports || {};
  }
);

// Fetch schedules
export const fetchSchedulesAPI = createAsyncThunk(
  "schedule/fetchSchedules",
  async () => {
    const res = await fetch("https://your-backend.com/api/schedules");
    const data = await res.json();
    return data.schedules || {};
  }
);

// ====================== AUTH SLICE ======================
const initialAuthState = {
  isLoggedIn: false,
  user: null,
  students: [],
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
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const idx = state.students.findIndex(s => s.id === action.payload.id);
      if (idx >= 0) state.students[idx] = action.payload;
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(s => s.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudentsAPI.fulfilled, (state, action) => {
      state.students = action.payload;
    });
  }
});

// ====================== TRANSCRIPT SLICE ======================
const transcriptSlice = createSlice({
  name: "transcript",
  initialState: { transcripts: {} },
  reducers: {
    addTranscript: (state, action) => {
      const { studentId, transcript } = action.payload;
      if (!state.transcripts[studentId]) state.transcripts[studentId] = [];
      state.transcripts[studentId].push(transcript);
    },
    updateTranscript: (state, action) => {
      const { studentId, subject, midterm, final } = action.payload;
      const record = state.transcripts[studentId]?.find(t => t.subject === subject);
      if (record) { record.midterm = midterm; record.final = final; }
    },
    initTranscript: (state, action) => {
      const { studentId } = action.payload;
      if (!state.transcripts[studentId]) state.transcripts[studentId] = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTranscriptsAPI.fulfilled, (state, action) => {
      state.transcripts = action.payload;
    });
  }
});

// ====================== REPORT SLICE ======================
const reportSlice = createSlice({
  name: "report",
  initialState: { reports: {} },
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
  extraReducers: (builder) => {
    builder.addCase(fetchReportsAPI.fulfilled, (state, action) => {
      state.reports = action.payload;
    });
  }
});

// ====================== SCHEDULE SLICE ======================
const scheduleSlice = createSlice({
  name: "schedule",
  initialState: { schedules: {}, selectedDay: null },
  reducers: {
    selectDay: (state, action) => { state.selectedDay = action.payload; },
    addSchedule: (state, action) => {
      const { studentId, schedule } = action.payload;
      if (!state.schedules[studentId]) state.schedules[studentId] = [];
      state.schedules[studentId].push(schedule);
    },
    updateSchedule: (state, action) => {
      const { studentId, subject, newSchedule } = action.payload;
      const idx = state.schedules[studentId]?.findIndex(s => s.subject === subject);
      if (idx >= 0) state.schedules[studentId][idx] = newSchedule;
    },
    deleteSchedule: (state, action) => {
      const { studentId, subject } = action.payload;
      state.schedules[studentId] = state.schedules[studentId]?.filter(s => s.subject !== subject);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSchedulesAPI.fulfilled, (state, action) => {
      state.schedules = action.payload;
    });
  }
});

// ====================== EXPORT ACTIONS & STORE ======================
export const actions = {
  ...authSlice.actions,
  ...transcriptSlice.actions,
  ...reportSlice.actions,
  ...scheduleSlice.actions,
};

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    transcript: transcriptSlice.reducer,
    report: reportSlice.reducer,
    schedule: scheduleSlice.reducer,
  },
});
