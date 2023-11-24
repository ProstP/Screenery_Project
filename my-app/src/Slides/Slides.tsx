import React from "react";
import { PresentationType } from "../ts/types/types";
import RenderElements from "../Elements/Elements";
import Styles from "./Slides.module.css";

function RenderSlides(presentation: PresentationType) {
  return (
    <ul className={Styles.list}>
      {presentation.ListOfSlides.map((slide) => (
        <li>
          <div
            className={`${Styles.slide} ${Styles.current}`}
            style={{
              backgroundColor: slide.Color,
            }}
          >
            {RenderElements(slide.List_of_Elements)}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default RenderSlides;
