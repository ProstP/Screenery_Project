import {
  newTextElt,
  newImageElt,
  newTriangleElt,
  newEllipseElt,
  newRectangleElt,
} from "../ts/defaultElements";
import { GeneralElementType, PresentationType } from "../ts/types/types";
import Styles from "./btnsCreator.module.css";

type BtnsCreatorProps = {
  presentation: PresentationType;
  setPresentation: (presentation: PresentationType) => void;
};

function BtnsCreator(props: BtnsCreatorProps) {
  const { presentation: presentation, setPresentation } = props;
  const addElement = (newElt: GeneralElementType) => {
    const slides = presentation.ListOfSlides;
    const counter = presentation.EltCounter + 1;
    const current = slides.find(
      (slide) => "slide" + slide.ID === presentation.CurentSlide,
    );
    newElt.ID = counter;
    current?.ListOfElements.push(newElt);
    setPresentation({
      ...presentation,
      EltCounter: counter,
      ListOfSlides: slides,
    });
  };
  return (
    <div className={Styles.blockwithaddbtns}>
      <button
        className={Styles.addbtns}
        onClick={() => addElement(newTextElt())}
      >
        AddText
      </button>
      <button
        className={Styles.addbtns}
        onClick={() => addElement(newImageElt())}
      >
        AddImg
      </button>
      <button
        className={Styles.addbtns}
        onClick={() => addElement(newTriangleElt())}
      >
        AddTriangle
      </button>
      <button
        className={Styles.addbtns}
        onClick={() => addElement(newRectangleElt())}
      >
        AddRectangle
      </button>
      <button
        className={Styles.addbtns}
        onClick={() => addElement(newEllipseElt())}
      >
        AddEllipse
      </button>
    </div>
  );
}

export { BtnsCreator };
