import { useActions } from "@/hooks/useActions";
import { cn } from "@/lib/utils";
import { getTasks } from "@/store/tasks/tasks.selectors";
import { DayProps } from "@/types/ui_types";
import { isToday } from "date-fns";
import { format } from "date-fns/format";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

const DayItem = ({
  day,
  index,
  today,
  addTaskModalOpen,
  firstDayOfMonth,
  daysInMonth,
}: DayProps) => {
  const router = useRouter();
  const { setSelectedDay } = useActions();
  const dayString = format(day, "yyyy-MM-dd");
  const selectedMonts =
    format(day, "MMMM-yyyy") === format(firstDayOfMonth, "MMMM-yyyy");
  const isEverry7thChild = (index + 1) % 7 == 0;
  const isLastBottomLine = daysInMonth?.length < 40 ? index > 27 : index > 34;
  const [hover, setHover] = useState<boolean>(false);

  const tasks = getTasks();

  const dateTasks = tasks?.filter((item) => dayString === item?.date);

  const openAddModalHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    selectedDate: Date
  ) => {
    event.stopPropagation();
    setSelectedDay(selectedDate);
    addTaskModalOpen();
  };

  return (
    <>
      <div
        className={cn(
          `flex flex-col gap-y-1 p-2 min-h-20 sm:min-h-20 md:min-h-24 cursor-pointer  ${
            isLastBottomLine ? "" : "border-b"
          } ${
            isEverry7thChild ? "" : "border-r"
          } rounded-sm p-1 border-blue-500/25 ${
            !isToday(day) && "hover:bg-white/10"
          } ${isToday(day) && " bg-primary"}`
        )}
        onClick={() => dateTasks?.length && router.push(`/${dayString}/tasks`)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex items-center justify-between w-full">
          <p
            className={`flex items-center justify-center sm:text-xl md:text-2xl font-semibold h-8 w-8 rounded-full ${
              selectedMonts ? "" : isToday(day) ? "" : "text-gray-600/50"
            }  `}
          >
            {format(day, "d")}
          </p>
          {day >= today && hover ? (
            <div
              className={`flex items-center rounded-sm ${
                isToday(day) ? "hover:bg-white" : "hover:bg-primary"
              }`}
              title="Add task"
              onClick={(event) => openAddModalHandler(event, day)}
            >
              <PlusIcon
                className={`cursor-pointer ${
                  isToday(day) ? "hover:text-primary" : "hover:text-white"
                }`}
              />
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-y-1">
          {dateTasks?.slice(0, 2)?.map((task) => (
            <div
              key={task.id}
              className={cn(
                task?.color,
                "flex justify-between items-center w-ful h-4 rounded px-1"
              )}
            >
              <p className="text-normal font-light text-xs text-ellipsis max-w-8 overflow-hidden whitespace-nowrap md:max-w-24">
                {task?.title}
              </p>
            </div>
          ))}

          {dateTasks?.length > 2 ? (
            <Link href={`/tasks/${"1"}`}>
              <p className="text-sm text-normal text-end">more...</p>
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default memo(DayItem);
