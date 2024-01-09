import { useEffect, useRef } from "react";
import { useAppActions } from "../../Redux/Actions";
import { GeneralElementType } from "../../model/Element";
import { selectTypeOfElement } from "./SelectTypeOfElement";
import Styles from "./Elements.module.css";

const INTERVAL = 3;
const NOT_RESIZE = 0;
const UP_RESIZE = 1;
const DOWN_RESIZE = 2;
const LEFT_RESIZE = 3;
const RIGHT_RESIZE = 4;

type ShowElementProps = {
  elt: GeneralElementType;
  Elements: GeneralElementType[];
  Selected: string[];
  forWb: boolean;
  isCtrlPressed: boolean;
};

type ElementsViewProps = {
  Elements: GeneralElementType[];
  Selected: string[];
  forWb: boolean;
  isCtrlPressed: boolean;
};

function findResizeBorder(
  mouseOffsetX: number,
  mouseOffsetY: number,
  eltWidth: number,
  eltHeight: number,
): number {
  if (mouseOffsetX < INTERVAL && mouseOffsetX > -INTERVAL) {
    return LEFT_RESIZE;
  }
  if (
    mouseOffsetX < INTERVAL + eltWidth &&
    mouseOffsetX > -INTERVAL + eltWidth
  ) {
    return RIGHT_RESIZE;
  }
  if (mouseOffsetY < INTERVAL && mouseOffsetY > -INTERVAL) {
    return UP_RESIZE;
  }
  if (
    mouseOffsetY < INTERVAL + eltHeight &&
    mouseOffsetY > -INTERVAL + eltHeight
  ) {
    return DOWN_RESIZE;
  }
  return NOT_RESIZE;
}

function ShowElement(props: ShowElementProps) {
  const { elt, Elements, Selected, forWb, isCtrlPressed } = props;
  const {
    addSelectedElement,
    moveSelectedElement,
    changeScaleSelectedElements,
  } = useAppActions();
  const ref = useRef<HTMLDivElement>(null);
  const isSelected: boolean = Selected.indexOf(elt.ID) !== -1;
  useEffect(() => {
    const control = ref.current!;
    if (control === null) {
      return;
    }
    const mouseDown = (mouseDownEvent: MouseEvent) => {
      const resize = findResizeBorder(
        mouseDownEvent.offsetX,
        mouseDownEvent.offsetY,
        control.offsetWidth,
        control.offsetHeight,
      );
      let x = 0;
      let y = 0;

      const onDrag = (dragEvent: MouseEvent) => {
        const wb = document.getElementById("workplace");
        if (wb === null || !isSelected) {
          return;
        }
        x = ((dragEvent.x - mouseDownEvent.x) / wb.offsetWidth) * 100;
        y = ((dragEvent.y - mouseDownEvent.y) / wb.offsetHeight) * 100;
        Selected.forEach((id) => {
          const htmlElt = document.getElementById(id);
          const elt = Elements.find((element) => element.ID === id);
          if (htmlElt !== null && elt !== undefined) {
            if (resize !== 0) {
              if (resize === LEFT_RESIZE) {
                htmlElt.style.left = `${elt.Position.X + x}%`;
                htmlElt.style.width = `${elt.Scale.Wigth - x}%`;
              }
              if (resize === RIGHT_RESIZE) {
                htmlElt.style.width = `${elt.Scale.Wigth + x}%`;
              }
              if (resize === UP_RESIZE) {
                htmlElt.style.top = `${elt.Position.Y + y}%`;
                htmlElt.style.height = `${elt.Scale.Height - y}%`;
              }
              if (resize === DOWN_RESIZE) {
                htmlElt.style.height = `${elt.Scale.Height + y}%`;
              }
            } else {
              htmlElt.style.left = `${elt.Position.X + x}%`;
              htmlElt.style.top = `${elt.Position.Y + y}%`;
            }
          }
        });
      };

      const onDrop = () => {
        if ((x === 0 && y === 0) || !isSelected) {
          addSelectedElement(control.id, !isCtrlPressed);
        } else {
          switch (resize) {
            case NOT_RESIZE:
              moveSelectedElement(x, y);
              break;
            case UP_RESIZE:
              moveSelectedElement(0, y);
              changeScaleSelectedElements(0, -y);
              break;
            case DOWN_RESIZE:
              changeScaleSelectedElements(0, y);
              break;
            case LEFT_RESIZE:
              moveSelectedElement(x, 0);
              changeScaleSelectedElements(-x, 0);
              break;
            case RIGHT_RESIZE:
              changeScaleSelectedElements(x, 0);
              break;
            default:
              break;
          }
        }
        window.removeEventListener("mousemove", onDrag);
        window.removeEventListener("mouseup", onDrop);
      };

      window.addEventListener("mousemove", onDrag);
      window.addEventListener("mouseup", onDrop);
    };

    control.addEventListener("mousedown", mouseDown);
    return () => {
      control.removeEventListener("mousedown", mouseDown);
    };
  });
  return (
    <div
      id={forWb ? elt.ID : "onSlide" + elt.ID}
      ref={forWb ? ref : null}
      className={
        isSelected ? `${Styles.element} ${Styles.selected}` : Styles.element
      }
      style={{
        zIndex: isSelected ? "5" : "2",
        top: elt.Position.Y + "%",
        left: elt.Position.X + "%",
        width: elt.Scale.Wigth + "%",
        height: elt.Scale.Height + "%",
      }}
    >
      {selectTypeOfElement(elt)}
    </div>
  );
}

function ElementsView(props: ElementsViewProps) {
  const { Elements, Selected, forWb, isCtrlPressed } = props;
  return (
    <div>
      {Elements.map((element) => (
        <ShowElement
          elt={element}
          Elements={Elements}
          Selected={Selected}
          forWb={forWb}
          isCtrlPressed={isCtrlPressed}
        />
      ))}
    </div>
  );
}

export { ElementsView };
