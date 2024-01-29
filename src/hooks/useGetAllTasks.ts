import { useLazyGetAllTasksQuery } from "@/features/calendar_api";
import { useEffect } from "react";

const useGetAllTasks = () => {
  const [getAllTasks] = useLazyGetAllTasksQuery();

  useEffect(() => {
    const tasks = setTimeout(() => {
      getAllTasks({});
    }, 10);

    return () => clearTimeout(tasks);
  }, []);
};

export default useGetAllTasks;
