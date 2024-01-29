import { useAppSelector } from "@/hooks/useRedux";

const getTasks = () => useAppSelector((state) => state.tasks.tasks);
const getSelectedDate = () =>
  useAppSelector((state) => state.tasks.selectedDate);
const getCurrentTask = () => useAppSelector((state) => state.tasks.currentTask);
const getIsEdit = () => useAppSelector((state) => state.tasks.isEdit);

export { getTasks, getSelectedDate, getCurrentTask, getIsEdit };
