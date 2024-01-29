import { ModalProps } from "@/types/ui_types";
import { X } from "lucide-react";

const Modal = ({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
} & ModalProps) => {
  if (!isOpen) {
    return;
  }
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-secondary/75 transition-all">
      <div className="relative flex flex-col bg-popover rounded-md p-5 mx-3 w-full max-w-96 min-h-20">
        <X
          className=" absolute top-3 right-3 cursor-pointer"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
