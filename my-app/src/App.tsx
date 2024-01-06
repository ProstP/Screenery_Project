import Styles from "./App.module.css";
import { SaveAndLoadBtns } from "./components/Toolbar/SaveAndLoadBtns";
import { useAppSelector } from "./Redux/Reducer";
import { SlideFeatures } from "./components/Toolbar/SlideFeatures";
import { ElementsCreateBtns } from "./components/Toolbar/ElementsCreateBtns";
import { DeleteElementsBtn } from "./components/Toolbar/DeleteElementsBtn";
import { EelementFeatures } from "./components/Toolbar/ElementFeatures";
import Background from "./img/background.png";
import Logo from "./img/screenery_logo_1.png";
import { Title } from "./components/Title/Title";
import { SlidesView } from "./components/SlidesView/SlidesView";
import { Workplace } from "./components/Workplace/Workplace";
import { SlideCreateAndDeleteBtns } from "./components/Toolbar/SlideCreateDeleteBtns";

function App() {
  const editor = useAppSelector((state) => state.editor);
  return (
    <div className={Styles.editor}>
      <SaveAndLoadBtns Presentation={editor.Presentation} />
      <SlideFeatures
        Slide={
          editor.Presentation.ListOfSlides.find(
            (slide) => slide.ID === editor.Presentation.CurentSlide,
          )!
        }
      />
      <ElementsCreateBtns />
      {editor.ListOfSelected.Elements.length === 1 ? (
        <EelementFeatures
          Elt={editor.Presentation.ListOfSlides.find(
            (slide) => slide.ID === editor.Presentation.CurentSlide,
          )?.ListOfElements.find(
            (elt) => elt.ID === editor.ListOfSelected.Elements[0],
          )}
        />
      ) : null}
      <DeleteElementsBtn />
      <img className={Styles.background} src={Background}></img>
      <img className={Styles.logo} src={Logo}></img>
      <Title Title={editor.Presentation.Name} />
      <SlidesView
        Slides={editor.Presentation.ListOfSlides}
        Current={editor.Presentation.CurentSlide}
        Selected={editor.ListOfSelected.Slides}
      />
      <Workplace
        Slide={
          editor.Presentation.ListOfSlides.find(
            (slide) => slide.ID === editor.Presentation.CurentSlide,
          )!
        }
        Selected={editor.ListOfSelected.Elements}
      />
      <SlideCreateAndDeleteBtns />
    </div>
  );
}

export default App;
