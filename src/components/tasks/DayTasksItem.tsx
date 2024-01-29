import { useDeleteTaskMutation } from "@/features/calendar_api";
import { cn } from "@/lib/utils";
import { Tasks } from "@/types/tasks_types";
import { ArrowBigRight, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const DayTasksItem = ({ task }: { task: Tasks }) => {
  const router = useRouter();
  const params = useParams();
  const [hover, setHover] = useState<boolean>(false);
  const [deleteTask] = useDeleteTaskMutation();

  const deleteTaskHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    event?.stopPropagation();
    deleteTask(id);
  };

  return (
    <div
      key={task?.id}
      className={cn(
        `flex items-center justify-between px-6 py-2 rounded-md`,
        task?.color
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p className=" text-lg font-normal">{task?.title}</p>
      <div className="flex items-center gap-x-8">
        {hover ? (
          <div
            className="flex items-center cursor-pointer"
            onClick={(event) => deleteTaskHandler(event, task?.id)}
            title="Delete"
          >
            <Trash2 />
          </div>
        ) : null}
        <div
          className="cursor-pointer"
          title="Show Detail"
          onClick={() => router.push(`/${params?.date}/tasks/${task?.id}`)}
        >
          <ArrowBigRight className="w-8 h-8" />
        </div>
        <p
          className={cn(
            "text-md font-bold bg-black/90 px-4 py-2 w-32 text-center rounded-md first-letter:capitalize",
            `text-${task?.status.color}`
          )}
        >
          {task?.status?.type}
        </p>
      </div>
    </div>
  );
};

export default DayTasksItem;
