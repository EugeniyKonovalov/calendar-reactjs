import { useMemo } from "react";
import { useAppDispatch } from "./useRedux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { tasksActions } from "@/store/tasks/tasks.slice";
const rootActions = {
  ...tasksActions,
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
