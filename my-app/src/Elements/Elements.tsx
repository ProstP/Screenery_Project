import { useEffect, useRef } from "react";
import {
  GeneralElementType,
  TextElementType,
  ImageElementType,
  GraphicElementType,
} from "../ts/types/types";
import Styles from "./Elements.module.css";
import { useAppActions } from "../Actions/Actions";

type ShowTextElementProps = {
  Elt: TextElementType;
};

type RenderElementsProps = {
  Elements: GeneralElementType[];
  Selected: string[];
  forWb: boolean;
};

type createElementProps = {
  elt: GeneralElementType;
  Elements: GeneralElementType[];
  Selected: string[];
  forWb: boolean;
};

function ShowTextElement(props: ShowTextElementProps) {
  const { Elt } = props;
  const { setNewText } = useAppActions();
  return (
    <input
      type="text"
      style={{
        width: "100%",
        height: "100%",
        border: 0,
        outlineWidth: 0,
        fontFamily: Elt.Font.FontFamily,
        fontSize: Elt.Font.FontSize + "%",
        fontStyle: Elt.Font.FontStyle,
        color: Elt.Font.Color,
        background: "transparent",
      }}
      value={Elt.Text}
      onChange={(event) => setNewText(Elt.ID, event.target.value)}
    ></input>
  );
}

function showImageElement(elt: ImageElementType) {
  return (
    <img
      style={{
        width: "100%",
        height: "100%",
      }}
      src={elt.Src}
    ></img>
  );
}

function showGraphicElement(elt: GraphicElementType) {
  return (
    <img
      style={{
        width: "100%",
        height: "100%",
      }}
      src={elt.Src}
    ></img>
  );
}

function selectTypeOfElement(elt: GeneralElementType) {
  switch (elt.Type) {
    case "text":
      return <ShowTextElement Elt={elt} />;
    case "image":
      return showImageElement(elt);
    case "graphic":
      return showGraphicElement(elt);
  }
}

function CreateElement(props: createElementProps) {
  const { elt, Elements, Selected, forWb } = props;
  const { addSelectedElement, moveElement } = useAppActions();
  const ref = useRef<HTMLDivElement>(null);
  const isSelected: boolean = Selected.indexOf("elt" + elt.ID) !== -1;
  useEffect(() => {
    const control = ref.current!;
    if (control === null) {
      return;
    }
    let isCtrlPressed = false;
    const mouseDown = (mouseDownEvent: MouseEvent) => {
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
          const elt = Elements.find((element) => "elt" + element.ID === id);
          if (htmlElt !== null && elt !== undefined) {
            htmlElt.style.left = `${elt.Position.X + x}%`;
            htmlElt.style.top = `${elt.Position.Y + y}%`;
          }
        });
      };

      const onDrop = () => {
        if ((x === 0 && y === 0) || !isSelected) {
          addSelectedElement(control.id, !isCtrlPressed);
        } else {
          moveElement(x, y, Selected);
        }
        window.removeEventListener("mousemove", onDrag);
        window.removeEventListener("mouseup", onDrop);
      };

      window.addEventListener("mousemove", onDrag);
      window.addEventListener("mouseup", onDrop);
    };

    const ctrlHandled = (event: KeyboardEvent) => {
      isCtrlPressed = event.ctrlKey;
    };

    control.addEventListener("mousedown", mouseDown);
    window.addEventListener("keydown", ctrlHandled);
    window.addEventListener("keyup", ctrlHandled);
    return () => {
      control.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("keydown", ctrlHandled);
      window.removeEventListener("keyup", ctrlHandled);
    };
  });
  return (
    <div
      id={forWb ? "elt" + elt.ID : "eltOnSlide" + elt.ID}
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

function RenderElements(props: RenderElementsProps) {
  const { Elements, Selected, forWb } = props;
  return (
    <div>
      {Elements.map((element) => (
        <CreateElement
          elt={element}
          Elements={Elements}
          Selected={Selected}
          forWb={forWb}
        />
      ))}
    </div>
  );
}

export default RenderElements;
