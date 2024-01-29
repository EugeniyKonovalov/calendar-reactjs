import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosService } from "./axios_service";
import { Tasks, TasksParams, TasksResponse } from "@/types/tasks_types";
import { tasksActions } from "@/store/tasks/tasks.slice";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";

export const calendarApi = createApi({
  reducerPath: "calendar",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      async queryFn(_, { dispatch }) {
        try {
          const snapshot = await getDocs(collection(db, "tasks"));
          const tasks = snapshot?.docs?.map((doc) => ({
            ...(doc.data() as Tasks),
          }));

          dispatch(tasksActions.setTasks(tasks));

          return { data: tasks };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["tasks"],
    }),

    addTask: builder.mutation({
      async queryFn(options) {
        try {
          await setDoc(doc(db, "tasks", `${options?.id}`), options);

          return { data: null };
        } catch (error: any) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["tasks"],
    }),

    editTask: builder.mutation({
      async queryFn(options) {
        try {
          await updateDoc(doc(db, "tasks", options?.id), options);

          return { data: null };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["tasks"],
    }),

    deleteTask: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "tasks", id));

          return { data: null };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useLazyGetAllTasksQuery,
  useAddTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = calendarApi;
