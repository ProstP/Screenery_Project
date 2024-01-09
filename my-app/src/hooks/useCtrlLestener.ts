import { useEffect, useState } from "react";

const ctlrHandled = () => {
  const [isCtrlPressed, toggle] = useState(false);
  useEffect(() => {
    const keyPressed = (event: KeyboardEvent) => {
      toggle(event.ctrlKey);
    };

    window.addEventListener("keydown", keyPressed);
    window.addEventListener("keyup", keyPressed);
    return () => {
      window.removeEventListener("keydown", keyPressed);
      window.removeEventListener("keyup", keyPressed);
    };
  });

  return {
    isCtrlPressed,
  };
};

export { ctlrHandled };
