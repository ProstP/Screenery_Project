import React from "react";
import { Editor } from "../ts/const/const";
import RenderSlides from "../Slides/Slides";
import "./Editor.css";
import RenderElements from "../Elements/Elements";
import Background from "../img/background.png";
import Logo from "../img/screenery_logo_1.png";

function RenderEditor() {
  const slides = RenderSlides(Editor.Presentation);
  const workplace = RenderElements(
    Editor.Presentation.ListOfSlides[Editor.Presentation.CurentSlide]
      .List_of_Elements,
  );

  return (
    <div className="editor">
      <img className="background" src={Background}></img>
      <img className="logo" src={Logo}></img>
      <p className="name">{Editor.Presentation.Name}</p>
      <div className="slides">{slides}</div>
      <div
        className="workplace"
        style={{
          backgroundColor:
            Editor.Presentation.ListOfSlides[Editor.Presentation.CurentSlide]
              .Color,
        }}
      >
        {workplace}
      </div>
    </div>
  );
}

export default RenderEditor;
