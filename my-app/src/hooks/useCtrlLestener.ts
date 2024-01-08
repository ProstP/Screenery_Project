import { useEffect } from "react";

let isCtrlPressed: boolean = false;

const ctlrHandled = () => {
  useEffect(() => {
    const keyPressed = (event: KeyboardEvent) => {
      isCtrlPressed = event.ctrlKey;
    };

    window.addEventListener("keydown", keyPressed);
    window.addEventListener("keyup", keyPressed);
    return () => {
      window.removeEventListener("keydown", keyPressed);
      window.removeEventListener("keyup", keyPressed);
    };
  });
};

export { ctlrHandled, isCtrlPressed };
