import { calendarApi } from "@/features/calendar_api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasks/tasks.slice";

const rootRedusers = combineReducers({
  [calendarApi.reducerPath]: calendarApi.reducer,
  tasks: tasksSlice.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootRedusers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        calendarApi.middleware
      ),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
