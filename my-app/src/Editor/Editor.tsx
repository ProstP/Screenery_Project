import { PresentationType } from "../ts/types/types";
import RenderSlides from "../Slides/Slides";
import Styles from "./Editor.module.css";
import RenderElements from "../Elements/Elements";
import Background from "../img/background.png";
import Logo from "../img/screenery_logo_1.png";
import findSlideById from "../Slides/FindSlideById";
import { BtnsCreator } from "../btnsCreator/btnsCreator";
import { newSlide } from "../Slides/SlidesCreator";
import { EltFeatures } from "../EltFeatures/EltFeatures";
import { useState } from "react";
import { Editor, Presentation } from "../ts/const/const";

const SaveOnJSON = (Presentation: PresentationType) => {
  const jsonData = JSON.stringify(Presentation);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${Presentation.Name}.json`;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
  return;
};

function RenderEditor() {
  const [selected, setSelected] = useState(Editor.ListOfSelected);
  const [presentation, setPresentation] = useState(Presentation);

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
        const data: PresentationType = JSON.parse(jsonData);
        setPresentation(data);
      } catch (error) {
        console.error(error);
      }
    };
    reader.readAsText(file);
  };
  return (
    <div className={Styles.editor}>
      <button className={Styles.openmenubtn}>File</button>
      <div className={Styles.blockwithbtn}>
        <button className={Styles.btn} onClick={() => SaveOnJSON(presentation)}>
          Save
        </button>
        <input
          id="input"
          className={Styles.inputload}
          type="file"
          onChange={LoadFromJSON}
        ></input>
        <button
          className={Styles.btn}
          onClick={() => document.getElementById("input")?.click()}
        >
          Load
        </button>
      </div>
      <div style={{ position: "absolute", top: "1%", left: "45%", zIndex: 2 }}>
        <p style={{ color: "white" }}>Background</p>
        <input
          type="color"
          style={{ width: "20%" }}
          value={
            findSlideById(presentation.ListOfSlides, presentation.CurentSlide)
              .Color
          }
          onChange={(event) => {
            const slides = presentation.ListOfSlides;
            const current = slides.find(
              (slide) => "slide" + slide.ID === presentation.CurentSlide,
            );
            if (current === undefined) {
              return;
            }
            current.Color = event.target.value;
            setPresentation({
              ...presentation,
              ListOfSlides: slides,
            });
          }}
        ></input>
        <input
          id="changeBack"
          type="file"
          style={{ visibility: "hidden", position: "absolute" }}
          onChange={(event) => {
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
                const slides = presentation.ListOfSlides;
                const current = slides.find(
                  (slide) => "slide" + slide.ID === presentation.CurentSlide,
                );
                if (current === undefined) {
                  return;
                }
                current.Background = e.target!.result as string;
                setPresentation({
                  ...presentation,
                  ListOfSlides: slides,
                });
              } catch (error) {
                console.error(error);
              }
            };
            reader.readAsDataURL(file);
          }}
        ></input>
        <button onClick={() => document.getElementById("changeBack")?.click()}>
          New background
        </button>
      </div>
      <BtnsCreator
        presentation={presentation}
        setPresentation={setPresentation}
      />
      {selected.Elements.length === 1 ? (
        <EltFeatures
          presentation={presentation}
          setPresentation={setPresentation}
          setSelected={setSelected}
          elt={
            findSlideById(
              presentation.ListOfSlides,
              presentation.CurentSlide,
            ).ListOfElements.find(
              (elt) => "elt" + elt.ID === selected.Elements[0],
            )!
          }
        />
      ) : null}
      <img className={Styles.background} src={Background}></img>
      <img className={Styles.logo} src={Logo}></img>
      <input
        className={Styles.name}
        type="text"
        value={presentation.Name}
        onChange={(event) => {
          setPresentation({
            ...presentation,
            Name: event.target.value,
          });
        }}
      ></input>
      <div className={Styles.slides}>
        <RenderSlides
          presentation={presentation}
          selected={selected}
          setPresentation={setPresentation}
          setSelected={setSelected}
        />
      </div>
      <div
        id="workplace"
        className={Styles.workplace}
        style={{
          backgroundColor: findSlideById(
            presentation.ListOfSlides,
            presentation.CurentSlide,
          ).Color,
          backgroundImage: `url(${
            findSlideById(presentation.ListOfSlides, presentation.CurentSlide)
              .Background
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <RenderElements
          elements={
            findSlideById(presentation.ListOfSlides, presentation.CurentSlide)
              .ListOfElements
          }
          presentation={presentation}
          selected={selected}
          setPresentation={setPresentation}
          setSelected={setSelected}
          forWb={true}
        />
      </div>
      <div style={{ position: "absolute", bottom: "1%", left: "1%" }}>
        <button
          onClick={() => {
            const slides = presentation.ListOfSlides;
            const slide = newSlide();
            const counter = presentation.SlideCounter + 1;
            slide.ID = counter;
            slides.push(slide);
            setPresentation({
              ...presentation,
              ListOfSlides: slides,
              SlideCounter: counter,
            });
          }}
        >
          Add new slide
        </button>
        <button
          onClick={() => {
            const slides = presentation.ListOfSlides;
            selected.Slides.forEach((id) => {
              slides.splice(
                slides.indexOf(
                  slides.find((slide) => "slide" + slide.ID === id)!,
                ),
                1,
              );
            });
            setPresentation({
              ...presentation,
              ListOfSlides: slides,
            });
            setSelected({
              Slides: [],
              Elements: [],
            });
          }}
        >
          Delete slide
        </button>
      </div>
    </div>
  );
}

export default RenderEditor;
