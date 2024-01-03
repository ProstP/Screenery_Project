import { useEffect, useRef } from "react";
import {
  GeneralElementType,
  TextElementType,
  ImageElementType,
  GraphicElementType,
  PresentationType,
  ListOfSelectedType,
} from "../ts/types/types";
import Styles from "./Elements.module.css";
import {
  FontFamilyEnum,
  FontWeightEnum,
  TextDecorationEnum,
} from "../ts/enum/FontEnum";

const INTERVAL = 3;

type ShowTextElementProps = {
  element: TextElementType;
  presentation: PresentationType;
  setPresentation: (presentation: PresentationType) => void;
};

type createElementProps = {
  element: GeneralElementType;
  elements: GeneralElementType[];
  presentation: PresentationType;
  selected: ListOfSelectedType;
  setPresentation: (presentation: PresentationType) => void;
  setSelected: (selected: ListOfSelectedType) => void;
  forWb: boolean;
};

type RenderElementsProps = {
  elements: GeneralElementType[];
  presentation: PresentationType;
  selected: ListOfSelectedType;
  setPresentation: (presentation: PresentationType) => void;
  setSelected: (selected: ListOfSelectedType) => void;
  forWb: boolean;
};

function ShowTextElement(props: ShowTextElementProps) {
  const { element, presentation, setPresentation } = props;
  return (
    <input
      type="text"
      style={{
        width: "100%",
        height: "100%",
        border: 0,
        outlineWidth: 0,
        fontFamily: element.Font.FontFamily,
        fontSize: element.Font.FontSize + "%",
        fontStyle: FontFamilyEnum.includes(element.Font.FontStyle)
          ? element.Font.FontStyle
          : "normal",
        fontWeight: FontWeightEnum.includes(element.Font.FontStyle)
          ? element.Font.FontStyle
          : "normal",
        textDecoration: TextDecorationEnum.includes(element.Font.FontStyle)
          ? element.Font.FontStyle
          : "none",
        color: element.Font.Color,
        background: "transparent",
      }}
      value={element.Text}
      onChange={(event) => {
        const slides = presentation.ListOfSlides;
        const current = slides.find(
          (slide) => "slide" + slide.ID === presentation.CurentSlide,
        );
        if (current === undefined) {
          return;
        }
        const elt = current.ListOfElements.find((e) => (e.ID = element.ID));
        if (elt === undefined || elt.Type !== "text") {
          return;
        }
        elt.Text = event.target.value;
        setPresentation({
          ...presentation,
          ListOfSlides: slides,
        });
      }}
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

function selectTypeOfElement(
  elt: GeneralElementType,
  presentation: PresentationType,
  setPresentation: (presentation: PresentationType) => void,
) {
  switch (elt.Type) {
    case "text":
      return (
        <ShowTextElement
          element={elt}
          presentation={presentation}
          setPresentation={setPresentation}
        />
      );
    case "image":
      return showImageElement(elt);
    case "graphic":
      return showGraphicElement(elt);
  }
}

function CreateElement(props: createElementProps) {
  const {
    element,
    elements,
    presentation,
    selected,
    setPresentation,
    setSelected,
    forWb,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const isSelected: boolean =
    selected.Elements.indexOf("elt" + element.ID) !== -1;
  useEffect(() => {
    const control = ref.current!;
    if (control === null) {
      return;
    }
    let isCtrlPressed = false;
    const mouseDown = (mouseDownEvent: MouseEvent) => {
      let resize: number = 0;
      if (
        mouseDownEvent.offsetX < INTERVAL &&
        mouseDownEvent.offsetX > -INTERVAL
      ) {
        resize = 1;
      }
      if (
        mouseDownEvent.offsetX < INTERVAL + control.offsetWidth &&
        mouseDownEvent.offsetX > -INTERVAL + control.offsetWidth
      ) {
        resize = 2;
      }
      if (
        mouseDownEvent.offsetY < INTERVAL &&
        mouseDownEvent.offsetY > -INTERVAL
      ) {
        resize = 3;
      }
      if (
        mouseDownEvent.offsetY < INTERVAL + control.offsetHeight &&
        mouseDownEvent.offsetY > -INTERVAL + control.offsetHeight
      ) {
        resize = 4;
      }
      let x = 0;
      let y = 0;

      const onDrag = (dragEvent: MouseEvent) => {
        const wb = document.getElementById("workplace");
        if (wb === null || !isSelected) {
          return;
        }
        x = ((dragEvent.x - mouseDownEvent.x) / wb.offsetWidth) * 100;
        y = ((dragEvent.y - mouseDownEvent.y) / wb.offsetHeight) * 100;
        selected.Elements.forEach((id) => {
          const htmlElt = document.getElementById(id);
          const elt = elements.find((element) => "elt" + element.ID === id);
          if (htmlElt !== null && elt !== undefined) {
            if (resize !== 0) {
              if (resize === 1) {
                htmlElt.style.left = `${elt.Position.X + x}%`;
                htmlElt.style.width = `${elt.Scale.Wigth - x}%`;
              }
              if (resize === 2) {
                htmlElt.style.width = `${elt.Scale.Wigth + x}%`;
              }
              if (resize === 3) {
                htmlElt.style.top = `${elt.Position.Y + y}%`;
                htmlElt.style.height = `${elt.Scale.Height - y}%`;
              }
              if (resize === 4) {
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
          if (isCtrlPressed) {
            setSelected({
              Slides: [],
              Elements: [...selected.Elements, control.id],
            });
          } else {
            setSelected({
              Slides: [],
              Elements: [control.id],
            });
          }
        } else {
          const slides = presentation.ListOfSlides;
          for (let i = 0; i < slides.length; i++) {
            for (let j = 0; j < slides[i].ListOfElements.length; j++) {
              if (
                selected.Elements.indexOf(
                  "elt" + slides[i].ListOfElements[j].ID,
                ) !== -1
              ) {
                if (resize === 0) {
                  slides[i].ListOfElements[j].Position.X += x;
                  slides[i].ListOfElements[j].Position.Y += y;
                }
                if (resize === 1) {
                  slides[i].ListOfElements[j].Position.X += x;
                  slides[i].ListOfElements[j].Scale.Wigth -= x;
                }
                if (resize === 2) {
                  slides[i].ListOfElements[j].Scale.Wigth += x;
                }
                if (resize === 3) {
                  slides[i].ListOfElements[j].Position.Y += y;
                  slides[i].ListOfElements[j].Scale.Height -= y;
                }
                if (resize === 4) {
                  slides[i].ListOfElements[j].Scale.Height += y;
                }
              }
            }
          }
          setPresentation({
            ...presentation,
            ListOfSlides: slides,
          });
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
      id={forWb ? "elt" + element.ID : "eltOnSlide" + element.ID}
      ref={forWb ? ref : null}
      className={
        isSelected ? `${Styles.element} ${Styles.selected}` : Styles.element
      }
      style={{
        zIndex: isSelected ? "5" : "2",
        top: element.Position.Y + "%",
        left: element.Position.X + "%",
        width: element.Scale.Wigth + "%",
        height: element.Scale.Height + "%",
      }}
    >
      {selectTypeOfElement(element, presentation, setPresentation)}
    </div>
  );
}

function RenderElements(props: RenderElementsProps) {
  const {
    elements,
    presentation,
    selected,
    setPresentation,
    setSelected,
    forWb,
  } = props;
  return (
    <div>
      {elements.map((element) => (
        <CreateElement
          element={element}
          elements={elements}
          presentation={presentation}
          selected={selected}
          setPresentation={setPresentation}
          setSelected={setSelected}
          forWb={forWb}
        />
      ))}
    </div>
  );
}

export default RenderElements;
