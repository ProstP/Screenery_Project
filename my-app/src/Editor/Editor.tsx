import React from "react";
import { EditorType } from "../ts/types/types";
import { Editor } from "../ts/const/const";
import RenderSlides from "../Slides/Slides";
import Styles from "./Editor.module.css";
import RenderElements from "../Elements/Elements";
import Background from "../img/background.png";
import Logo from "../img/screenery_logo_1.png";

function SaveOnJSON(Editor: EditorType) {
  const jsonData = JSON.stringify(Editor);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "data.json";
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
  return;
}

const LoadFromJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files === null) {
    return;
  }
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const jsonData = e.target?.result as string;
      const data: EditorType = JSON.parse(jsonData);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  reader.readAsText(file);
};

function RenderEditor() {
  const slides = RenderSlides(Editor.Presentation);
  const workplace = RenderElements(
    Editor.Presentation.ListOfSlides[Editor.Presentation.CurentSlide]
      .List_of_Elements,
  );
  const savePresentation = () => SaveOnJSON(Editor);
  return (
    <div className={Styles.editor}>
      <div>
        <button onClick={savePresentation}>Save</button>
        <input type="file" onChange={LoadFromJSON}></input>
      </div>
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
