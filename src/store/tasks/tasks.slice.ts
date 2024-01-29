import { Tasks } from "@/types/tasks_types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialTasks = {
  tasks: Tasks[];
  selectedDate: Date | string;
  currentTask: Tasks | undefined | null;
  isEdit: boolean;
};

const initialState: InitialTasks = {
  tasks: [],
  selectedDate: "",
  currentTask: null,
  isEdit: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, { payload }: PayloadAction<Tasks[]>) => {
      state.tasks = payload;
    },

    setSelectedDay: (state, { payload }: PayloadAction<Date>) => {
      state.selectedDate = payload;
    },

    setCurrentTask: (state, { payload }: PayloadAction<Tasks | undefined>) => {
      state.currentTask = payload;
    },
    setIsEditTask: (state, { payload }: PayloadAction<boolean>) => {
      state.isEdit = payload;
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice;
