import { inputClassName, labelClassName } from "@/lib/classes";
import { cn } from "@/lib/utils";
import { InputProps } from "@/types/ui_types";

const Input = ({ input, label }: InputProps) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <label htmlFor={input.id} className={cn(labelClassName)}>
        Title
      </label>
      <input className={cn(inputClassName, "h-10")} {...input} />
    </div>
  );
};

export default Input;
