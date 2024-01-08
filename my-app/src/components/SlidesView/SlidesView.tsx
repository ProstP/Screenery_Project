import { useEffect, useRef } from "react";
import { SlideType } from "../../model/Slide";
import { ElementsView } from "../ElementsView/ElementsView";
import Styles from "./Slides.module.css";
import { useAppActions } from "../../Redux/Actions";
import { isCtrlPressed } from "../../hooks/useCtrlLestener";

type SlidesViewProps = {
  Slides: SlideType[];
  Current: string;
  Selected: string[];
};

type ShowSlideProps = {
  Slide: SlideType;
  Slides: SlideType[];
  Current: string;
  Selected: string[];
};

function ShowSlide(props: ShowSlideProps) {
  const { Slide, Slides, Current, Selected } = props;
  const { goToSlideAction, addSelectedSlide, changeOrders } = useAppActions();
  const ref = useRef<HTMLLIElement>(null);
  const isSelected: boolean = Selected.indexOf(Slide.ID) !== -1;
  const isCurrent: boolean = Slide.ID === Current;

  useEffect(() => {
    const control = ref.current;
    if (control === null) {
      return;
    }
    // let isCtrlPressed: boolean = false;

    const mouseDown = (mouseDownEvent: MouseEvent) => {
      let y: number = 0;
      const onDrag = (dragEvent: MouseEvent) => {
        const block = document.getElementById("slides");
        if (block === null || !isSelected) {
          return;
        }
        y = dragEvent.clientY - mouseDownEvent.clientY;
        Selected.forEach((id) => {
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
          addSelectedSlide(control.id, !isCtrlPressed);
        } else {
          Selected.forEach((id) => {
            const htmlElt = document.getElementById(id);
            if (minY === -1 || minY > htmlElt!.offsetTop) {
              minY = htmlElt!.offsetTop;
              minIndexFrom = Slides.indexOf(
                Slides.find((slide) => slide.ID === id)!,
              );
            }
          });
          if (minY !== -1) {
            for (let i = 0; i < Slides.length; i++) {
              if (Selected.indexOf(Slides[i].ID) !== -1) {
                continue;
              }
              const htmlElt = document.getElementById(Slides[i].ID);
              if (minY < htmlElt!.offsetTop + htmlElt!.offsetHeight / 2) {
                if (i < minIndexTo || minIndexTo === -1) {
                  minIndexTo = i;
                  console.log(minIndexTo);
                }
              }
            }
          }
        }
        if (minY !== -1) {
          changeOrders(minIndexFrom, minIndexTo, Selected.length);
        }
        Selected.forEach((id) => {
          const elt = document.getElementById(id);
          if (elt !== null) {
            elt.style.visibility = "visible";
            elt.style.top = "0";
            elt.style.zIndex = "2";
          }
        });
        goToSlideAction(control.id);
        window.removeEventListener("mousemove", onDrag);
        window.removeEventListener("mouseup", onDrop);
      };
      window.addEventListener("mousemove", onDrag);
      window.addEventListener("mouseup", onDrop);
    };
    // const ctrlHandled = (event: KeyboardEvent) => {
    //   isCtrlPressed = event.ctrlKey;
    // };

    control.addEventListener("mousedown", mouseDown);
    // window.addEventListener("keydown", ctrlHandled);
    // window.addEventListener("keyup", ctrlHandled);
    return () => {
      control.removeEventListener("mousedown", mouseDown);
      // window.removeEventListener("keydown", ctrlHandled);
      // window.removeEventListener("keyup", ctrlHandled);
    };
  });
  return (
    <li
      id={Slide.ID}
      ref={ref}
      className={
        isSelected || isCurrent
          ? `${Styles.slide} ${Styles.current}`
          : `${Styles.slide}`
      }
      style={{
        backgroundColor: Slide.Color,
        backgroundImage: `url(${Slide.Background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        visibility: "visible",
      }}
    >
      <ElementsView
        Elements={Slide.ListOfElements}
        Selected={[]}
        forWb={false}
      />
    </li>
  );
}

function SlidesView(props: SlidesViewProps) {
  const { Slides, Current, Selected } = props;
  return (
    <ul id="slides" className={Styles.list}>
      {Slides.map((slide) => (
        <ShowSlide
          Slide={slide}
          Slides={Slides}
          Current={Current}
          Selected={Selected}
        />
      ))}
    </ul>
  );
}

export { SlidesView };
