"use client";

import { getTasks } from "@/store/tasks/tasks.selectors";
import MaxWidthWrapper from "@/wrappers/MaxWidthWrapper";
import { format } from "date-fns/format";
import { useParams, useRouter } from "next/navigation";
import DayTasksItem from "./DayTasksItem";
import useGetAllTasks from "@/hooks/useGetAllTasks";
import { Timestamp } from "firebase/firestore";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

const DayTasks = () => {
  const router = useRouter();
  const params: { date: string } = useParams();
  const date = params?.date;
  const tasks = getTasks();

  const currentDayTasks = tasks?.filter((item) => item?.date === date);
  const currentDayDate = format(date, "dd,MMMM,yyyy");

  useGetAllTasks();
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col pt-6 relative">
        <h2 className=" text-3xl font-bold text-center py-4 mb-5">
          {currentDayDate}
        </h2>
        <div className="absolute right-8 top-12" title="Back to Calendar">
          <Link href={"/"} about="Back to home">
            <ArrowBigLeft className="w-10 h-10" />
          </Link>
        </div>
        <div className="flex flex-col gap-y-6">
          {currentDayTasks?.map((task) => (
            <DayTasksItem key={task?.id} {...{ task }} />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default DayTasks;
