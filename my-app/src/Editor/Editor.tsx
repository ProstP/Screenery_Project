import React from "react";
import { Editor } from "../ts/const/const";
import RenderSlides from "../Slides/Slides";
import Styles from "./Editor.module.css";
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
    <div className={Styles.editor}>
      <img className={Styles.background} src={Background}></img>
      <img className={Styles.logo} src={Logo}></img>
      <div className={Styles.nameblock}>
        <p className={Styles.name}>{Editor.Presentation.Name}</p>
      </div>
      <div className={Styles.slides}>{slides}</div>
      <div
        className={Styles.workplace}
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
