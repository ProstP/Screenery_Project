import { useEffect } from "react";
import { useAppActions } from "../Redux/Actions";

function useUndoRedoListenner() {
  const { UndoAction, RedoAction } = useAppActions();
  useEffect(() => {
    const keyDown = (event: KeyboardEvent) => {
      if (!event.ctrlKey) {
        return;
      }
      if (event.code === "KeyZ") {
        UndoAction();
      }
      if (event.code === "KeyY") {
        RedoAction();
      }
    };
    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  });
}

export { useUndoRedoListenner };
