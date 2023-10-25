import React from "react";
import { PresentationType } from "../ts/types/types";
import RenderElements from "../Elements/Elements";
import "./Slides.css";

function RenderSlides(presentation: PresentationType) {
  return (
    <ul className="list-of-slides">
      {presentation.ListOfSlides.map((slide) => (
        <li>
          {slide.ID == presentation.CurentSlide ? (
            <div
              className="slide current"
              style={{
                backgroundColor: slide.Color,
              }}
            >
              {RenderElements(slide.List_of_Elements)}
            </div>
          ) : (
            <div
              className="slide"
              style={{
                backgroundColor: slide.Color,
              }}
            >
              {RenderElements(slide.List_of_Elements)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default RenderSlides;
