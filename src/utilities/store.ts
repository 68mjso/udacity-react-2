import { Question } from "@models/Question";
import { User } from "@models/User";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null as User | null,
    question: null as Question | null,
    users: [],
    questions: [],
    isLogin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { setUser, setUsers, setQuestion, setQuestions, setIsLogin } =
  appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

// Export the store
export default store;
