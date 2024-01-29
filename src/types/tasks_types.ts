export interface Status {
  type: "not started" | "in progress" | "closed";
  color: string;
}

export type Tasks = {
  id: string;
  title: string;
  description: string;
  date: string;
  createdAt: Date;
  color: string;
  status: Status;
};
export type TasksResponse = Tasks[];

export type TasksParams = {
  prevMonth: string;
  curMonth: string;
  nextMonth: string;
};
