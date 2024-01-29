"use client";

import { useDeleteTaskMutation } from "@/features/calendar_api";
import useDisclosure from "@/hooks/useDisclosure";
import useGetAllTasks from "@/hooks/useGetAllTasks";
import { cn } from "@/lib/utils";
import { getTasks } from "@/store/tasks/tasks.selectors";
import { ArrowBigLeft, Edit, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import AddTaskModal from "./AddTaskModal";
import { format } from "date-fns/format";
import Spinner from "../ui/Spinner";
import { useActions } from "@/hooks/useActions";
import StatusSelect from "./StatusSelect";

const DetailTask = () => {
  useGetAllTasks();
  const { setCurrentTask, setIsEditTask } = useActions();
  const router = useRouter();
  const params = useParams();
  const id = params?.task;
  const tasks = getTasks();
  const [deleteTask] = useDeleteTaskMutation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const currentTask = tasks.find((item) => item.id === id);

  const editTaskHandler = () => {
    setCurrentTask(currentTask);
    setIsEditTask(true);
    onOpen();
  };

  const deleteTaskHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string | undefined
  ) => {
    event.stopPropagation();
    deleteTask(id);
    router.back();
  };

  return (
    <>
      {currentTask ? (
        <>
          {isOpen ? <AddTaskModal {...{ isOpen, onClose }} /> : null}
          <div className="flex flex-col gap-y-5 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <div
                  className={cn(`w-10 h-10 rounded-full`, currentTask?.color)}
                />
                <StatusSelect
                  {...{ selected: currentTask?.status, id: currentTask?.id }}
                />
              </div>
              <div className="flex items-center gap-x-3">
                <div
                  className=" cursor-pointer"
                  title="Back"
                  onClick={() => router.back()}
                >
                  <ArrowBigLeft className="w-8 h-8" />
                </div>
                <div className=" cursor-pointer" onClick={editTaskHandler}>
                  <Edit />
                </div>
                <div
                  className=" cursor-pointer"
                  onClick={(e) => deleteTaskHandler(e, currentTask?.id)}
                >
                  <Trash2 />
                </div>
              </div>
            </div>
            <div className="border-b border-primary" />
            <h2 className="text-3xl font-bold text-center">
              {currentTask?.title}
            </h2>

            <pre className="font-bold text-md">{currentTask?.description}</pre>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default DetailTask;
