"use client";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  parse,
  startOfDay,
  startOfWeek,
} from "date-fns";
import DayItem from "./DayItem";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { format } from "date-fns/format";
import { useState } from "react";
import useDisclosure from "../../hooks/useDisclosure";
import AddTaskModal from "../tasks/AddTaskModal";
import MaxWidthWrapper from "@/wrappers/MaxWidthWrapper";
import useGetAllTasks from "@/hooks/useGetAllTasks";

const Calendar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const today = startOfDay(new Date());
  const [currentMonth, setCurrentMonth] = useState(() =>
    format(today, "MMMM-yyyy")
  );

  const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  let firstDayOfMonth = parse(currentMonth, "MMMM-yyyy", new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(endOfMonth(firstDayOfMonth)),
  });

  const getPrevMonth = () => {
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrentMonth(format(firstDayOfPrevMonth, "MMMM-yyyy"));
  };

  const getNextMonth = () => {
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrentMonth(format(firstDayOfNextMonth, "MMMM-yyyy"));
  };

  useGetAllTasks();

  return (
    <MaxWidthWrapper>
      {isOpen ? (
        <AddTaskModal {...{ isOpen, onClose, firstDayOfMonth }} />
      ) : null}
      <div className="flex flex-col min-w-full gap-y-3">
        <div className="flex items-center justify-between gap-x-4 w-64 self-end px-3 py-2 ">
          <ChevronLeftIcon
            className="cursor-pointer text-blue-400"
            onClick={getPrevMonth}
          />
          <p>{format(firstDayOfMonth, "MMMM-yyyy")}</p>
          <ChevronRightIcon
            className="cursor-pointer text-blue-400"
            onClick={getNextMonth}
          />
        </div>
        <div className="my-1 border-b border-white/15" />
        <div className="grid grid-cols-7 max-w-5xl items-center">
          {weekDays.map((dayOfWeek) => (
            <p
              key={dayOfWeek}
              className="font-semibold w-full text-end justify-self-end px-3 capitalize"
            >
              {dayOfWeek}
            </p>
          ))}
        </div>
        <div className="w-full max-w-5xl mx-auto grid grid-cols-7 ">
          {daysInMonth.map((day, index) => (
            <DayItem
              key={day + "day"}
              {...{
                day,
                today,
                firstDayOfMonth,
                index,
                addTaskModalOpen: onOpen,
                daysInMonth,
              }}
            />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Calendar;
