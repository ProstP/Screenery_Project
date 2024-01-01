import { useEffect, useRef } from "react";
import {
  ListOfSelectedType,
  PresentationType,
  SlideType,
} from "../ts/types/types";
import RenderElements from "../Elements/Elements";
import Styles from "./Slides.module.css";

type RenderSlidesProps = {
  presentation: PresentationType;
  selected: ListOfSelectedType;
  setPresentation: (presentation: PresentationType) => void;
  setSelected: (selected: ListOfSelectedType) => void;
};

type ShowSlideProps = {
  slide: SlideType;
  presentation: PresentationType;
  selected: ListOfSelectedType;
  setPresentation: (presentation: PresentationType) => void;
  setSelected: (selected: ListOfSelectedType) => void;
};

function ShowSlide(props: ShowSlideProps) {
  const { slide, presentation, selected, setPresentation, setSelected } = props;
  const ref = useRef<HTMLDivElement>(null);
  const isSelected: boolean =
    selected.Slides.indexOf("slide" + slide.ID) !== -1;
  const isCurrent: boolean = "slide" + slide.ID === presentation.CurentSlide;
  const slides = presentation.ListOfSlides;

  useEffect(() => {
    const control = ref.current;
    if (control === null) {
      return;
    }
    let isCtrlPressed: boolean = false;

    const mouseDown = (mouseDownEvent: MouseEvent) => {
      let y: number = 0;
      const onDrag = (dragEvent: MouseEvent) => {
        const block = document.getElementById("slides");
        if (block === null || !isSelected) {
          return;
        }
        y = dragEvent.clientY - mouseDownEvent.clientY;
        selected.Slides.forEach((id) => {
          const htmlElt = document.getElementById(id);
          if (htmlElt !== null) {
            htmlElt.style.zIndex = "5";
            htmlElt.style.top = `${y}px`;
          }
        });
      };
      const onDrop = () => {
        let minY: number = -1;
        let minIndexFrom: number = -1;
        let minIndexTo: number = -1;
        if (y === 0 || !isSelected) {
          if (isCtrlPressed) {
            setSelected({
              Slides: [...selected.Slides, control.id],
              Elements: [],
            });
          } else {
            setSelected({
              Slides: [control.id],
              Elements: [],
            });
          }
        } else {
          selected.Slides.forEach((id) => {
            const htmlElt = document.getElementById(id);
            if (minY === -1 || minY > htmlElt!.offsetTop) {
              minY = htmlElt!.offsetTop;
              minIndexFrom = slides.indexOf(
                slides.find((slide) => "slide" + slide.ID === id)!,
              );
            }
          });
          if (minY !== -1) {
            for (let i = 0; i < slides.length; i++) {
              if (selected.Slides.indexOf("slide" + slides[i].ID) !== -1) {
                continue;
              }
              const htmlElt = document.getElementById("slide" + slides[i].ID);
              if (minY < htmlElt!.offsetTop + htmlElt!.offsetHeight / 2) {
                if (i < minIndexTo || minIndexTo === -1) {
                  minIndexTo = i;
                }
              }
            }
          }
        }
        if (minY !== -1) {
          console.log(minIndexFrom, minIndexTo);
          const deleted = slides.splice(minIndexFrom, selected.Slides.length);
          const newState = presentation;
          if (minIndexTo === -1) {
            const newSlideList = [...slides, ...deleted];
            newState.ListOfSlides = newSlideList;
            console.log(newSlideList, newState);
            setPresentation(newState);
          }
          const to =
            minIndexTo >= minIndexFrom
              ? minIndexTo - selected.Slides.length
              : minIndexTo;
          const firstPart = slides.splice(0, to);
          newState.ListOfSlides = [...firstPart, ...deleted, ...slides];
          setPresentation(newState);
        }
        selected.Slides.forEach((id) => {
          const elt = document.getElementById(id);
          if (elt !== null) {
            elt.style.visibility = "visible";
            elt.style.top = "0";
            elt.style.zIndex = "2";
          }
        });
        setPresentation({
          ...presentation,
          CurentSlide: control.id,
        });
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
      id={"slide" + slide.ID}
      ref={ref}
      className={
        isSelected || isCurrent
          ? `${Styles.slide} ${Styles.current}`
          : `${Styles.slide}`
      }
      style={{
        backgroundColor: slide.Color,
        backgroundImage: `url(${slide.Background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        visibility: "visible",
      }}
    >
      <RenderElements
        elements={slide.ListOfElements}
        presentation={presentation}
        selected={{ Slides: [], Elements: [] }}
        setPresentation={setPresentation}
        setSelected={setSelected}
        forWb={false}
      />
    </div>
  );
}

function RenderSlides(props: RenderSlidesProps) {
  const { presentation, selected, setPresentation, setSelected } = props;
  return (
    <div id="slides" className={Styles.list}>
      {presentation.ListOfSlides.map((slide) => (
        <ShowSlide
          slide={slide}
          presentation={presentation}
          selected={selected}
          setPresentation={setPresentation}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
}

export default RenderSlides;
