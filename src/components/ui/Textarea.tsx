import { inputClassName, labelClassName } from "@/lib/classes";
import { cn } from "@/lib/utils";
import { TextareaProps } from "@/types/ui_types";

const Textarea = ({ textarea, classNames, label }: TextareaProps) => {
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <label htmlFor={textarea.id} className={cn(labelClassName)}>
        {label}
      </label>
      <textarea
        className={cn(inputClassName, " h-32 resize-none", classNames)}
        {...textarea}
      />
    </div>
  );
};

export default Textarea;
