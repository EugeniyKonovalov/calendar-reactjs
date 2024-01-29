import { useState } from "react";

const useDisclosure = () => {
  const [toggle, setToggle] = useState(false);

  const onOpen = () => setToggle(true);

  const onToggle = () => setToggle(!toggle);

  const onClose = () => setToggle(false);

  return {
    isOpen: toggle,
    onOpen,
    onToggle,
    onClose,
  };
};

export default useDisclosure;
