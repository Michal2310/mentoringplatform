import { useState } from "react";

export default function useModal() {
  const [isOpen, setisOpen] = useState(false);

  const toggle = (item?: any) => {
    isOpen ? (document.body.style.overflow = "auto") : (document.body.style.overflow = "hidden");
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    toggle,
  };
}
