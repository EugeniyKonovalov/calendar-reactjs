import { ModalProps } from "@/types/ui_types";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import { Controller, useForm } from "react-hook-form";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import {
  getCurrentTask,
  getIsEdit,
  getSelectedDate,
} from "@/store/tasks/tasks.selectors";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns/format";
import { Tasks } from "@/types/tasks_types";
import {
  useAddTaskMutation,
  useEditTaskMutation,
} from "@/features/calendar_api";
import { useActions } from "@/hooks/useActions";

interface FormInput {
  title: string;
  description: string;
}

const AddTaskModal = ({ isOpen, onClose }: ModalProps) => {
  const { setIsEditTask } = useActions();
  const selectedDate = getSelectedDate();
  const currentTask = getCurrentTask();
  const isEdit = getIsEdit();
  const [bgColor, setBgColor] = useState<string>("");
  const { control, watch, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      title: "",
      description: "",
    },
    values: {
      title: isEdit ? currentTask?.title || "" : "",
      description: isEdit ? currentTask?.description || "" : "",
    },
  });

  const [addTask] = useAddTaskMutation();
  const [editTask] = useEditTaskMutation();

  const onCloseHandler = () => {
    onClose();
    setIsEditTask(false);
  };

  const addTaskHandler = (data: { title: string; description: string }) => {
    const options = {
      id: isEdit ? currentTask?.id : uuidv4(),
      title: data?.title,
      description: data?.description,
      date: isEdit ? currentTask?.date : format(selectedDate, "yyyy-MM-dd"),
      createdAt: isEdit ? currentTask?.createdAt : new Date(selectedDate),
      color: isEdit ? currentTask?.color : bgColor,
      status: isEdit
        ? currentTask?.status
        : { type: "not started", color: "blue-400" },
    };
    !isEdit ? addTask(options) : editTask(options);
    onClose();
    setIsEditTask(false);
  };

  useEffect(() => {
    const generateRundomNum = () => {
      const randomColor: { [key: number]: string } = {
        1: "bg-teal-600",
        2: "bg-purple-600",
        3: "bg-green-600",
        4: "bg-pink-600",
        5: "bg-lime-600 ",
      };

      const rNum = Math.floor(Math.random() * (5 - 1) + 1);
      setBgColor(randomColor[rNum]);
    };
    generateRundomNum();
  }, []);

  return (
    <Modal {...{ isOpen, onClose: onCloseHandler }}>
      <form onSubmit={handleSubmit(addTaskHandler)}>
        <div className="flex flex-col gap-y-5">
          <h2 className="font-bold text-center text-xl">
            {isEdit ? "Edit task" : "Add task"}
          </h2>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input {...{ input: { id: "title", ...field } }} />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...{
                  textarea: { id: "description", ...field },
                  label: "Description",
                }}
              />
            )}
          />
          <Button
            {...{
              title: isEdit ? "Edit" : "Add",
              variant: "primary",
              type: "submit",
            }}
            className="w-36 self-end"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
