export type DayProps = {
  day: Date;
  today: Date;
  index: number;
  addTaskModalOpen: () => void;
  firstDayOfMonth: Date;
  daysInMonth: Date[];
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type ButtonProps = {
  title: string;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  variant: "primary" | "outline" | "clear";
  onClick?: () => void;
};

export type InputProps = {
  input: React.InputHTMLAttributes<HTMLInputElement>;
  label?: string;
};

export type TextareaProps = {
  textarea: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  label?: string;
  classNames?: string;
};
