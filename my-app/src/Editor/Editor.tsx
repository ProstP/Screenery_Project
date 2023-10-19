import React from "react";
import { SlideType } from "../ts/types/types";
import { Editor } from "../ts/const/const";
import RenderSlides from "../Slides/Slides";

function RenderEditor() {
  const slide1: SlideType = {
    ID: 1,
    List_of_Elements: [],
    Background: "",
    Color: "red",
  };
  Editor.Presentation.ListOfSlides.push(slide1);
  Editor.Presentation.CurentSlide = 1;

  const slides = RenderSlides(Editor.Presentation);

  return (
    <div>
      <p>{Editor.Presentation.Name}</p>
      {slides}
    </div>
  );
}

export default RenderEditor;
