import { PresentationType } from "../ts/types/types";
import RenderSlides from "../Slides/Slides";
import Styles from "./Editor.module.css";
import RenderElements from "../Elements/Elements";
import Background from "../img/background.png";
import Logo from "../img/screenery_logo_1.png";
import { useAppSelector } from "../Store/Reducer";
import { useAppActions } from "../Actions/Actions";
import findSlideById from "../Slides/FindSlideById";
import { BtnsCreator } from "../btnsCreator/btnsCreator";
import { newSlide } from "../Slides/SlidesCreator";
import { EltFeatures } from "../EltFeatures/EltFeatures";

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
  const {
    changePresentationName,
    goToSlideAction,
    setSlides,
    addSlideAction,
    deleteSlides,
    changeBackground,
    changeSlideColor,
  } = useAppActions();
  const presentation = useAppSelector((state) => state.presentation);
  const selected = useAppSelector((state) => state.selected);

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
        setSlides(data.ListOfSlides);
        goToSlideAction(data.CurentSlide);
        changePresentationName(data.Name);
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
          type="text"
          style={{ width: "20%" }}
          value={
            findSlideById(presentation.ListOfSlides, presentation.CurentSlide)
              .Color
          }
          onChange={(event) => changeSlideColor(event.target.value)}
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
                changeBackground(e.target!.result as string);
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
      <BtnsCreator />
      {selected.Elements.length === 1 ? (
        <EltFeatures
          Elt={
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
          changePresentationName(event.target.value);
        }}
      ></input>
      <div className={Styles.slides}>
        <RenderSlides
          Slides={presentation.ListOfSlides}
          Current={presentation.CurentSlide}
          Selected={selected.Slides}
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
          Elements={
            findSlideById(presentation.ListOfSlides, presentation.CurentSlide)
              .ListOfElements
          }
          Selected={selected.Elements}
          forWb={true}
        />
      </div>
      <div style={{ position: "absolute", bottom: "1%", left: "1%" }}>
        <button onClick={() => addSlideAction(newSlide())}>
          Add new slide
        </button>
        <button onClick={() => deleteSlides(selected.Slides)}>
          Delete slide
        </button>
      </div>
    </div>
  );
}

export default RenderEditor;
