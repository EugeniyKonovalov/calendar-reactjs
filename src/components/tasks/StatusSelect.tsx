import { useEditTaskMutation } from "@/features/calendar_api";
import useDisclosure from "@/hooks/useDisclosure";
import { cn } from "@/lib/utils";
import { Status } from "@/types/tasks_types";

const StatusSelect = ({ selected, id }: { selected: Status; id: string }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [editTask] = useEditTaskMutation();

  const statuses = [
    { type: "not started", color: "primary" },
    { type: "in progress", color: "green-600" },
    { type: "closed", color: "gray-600" },
  ];

  const changeStatusHandler = (item: Status) => {
    editTask({ id, status: item });
    onToggle();
  };

  return (
    <div className="relative flex flex-col w-36">
      <div
        className={cn(
          `${"text-" + selected?.color}`,
          `text-xl first-letter:capitalize font-bold py-2 px-3 rounded-md border-2 cursor-pointer`,
          `${"border-" + selected.color}`
        )}
        onClick={onToggle}
      >
        <p className="">{selected?.type}</p>
      </div>
      {isOpen ? (
        <div className="flex flex-col absolute top-12 w-full h-fit border-2 rounded-lg border-blue-400/75 bg-black/90">
          {statuses?.map((item) => {
            return true ? (
              <p
                key={item?.type}
                className={cn(
                  `text-lg font-bold ps-3 py-2 cursor-pointer hover:bg-blue-200/10`,
                  `${"text-" + item.color}`
                )}
                onClick={() => changeStatusHandler(item as Status)}
              >
                {item?.type}
              </p>
            ) : null;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default StatusSelect;
