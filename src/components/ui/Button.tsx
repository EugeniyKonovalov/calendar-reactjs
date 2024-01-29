import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types/ui_types";

const Button = ({ title, className, variant, type, onClick }: ButtonProps) => {
  const btnVariant = {
    primary: "bg-primary",
    outline: "bg-none border border-primary",
    clear: "",
  };

  return (
    <button
      className={cn(
        btnVariant[variant],
        "min-w-16 h-10 hover:bg-secondary rounded-sm",
        className
      )}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
