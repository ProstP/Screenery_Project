import { useAppActions } from "../../Redux/Actions";
import {
  newTextElt,
  newImageElt,
  newTriangleElt,
  newEllipseElt,
  newRectangleElt,
} from "../../data/ElementsCreator";
import Styles from "./ElementsCreateBtns.module.css";

function ElementsCreateBtns() {
  const { addElementAction } = useAppActions();
  return (
    <div className={Styles.blockwithaddbtns}>
      <button
        className={Styles.addbtns}
        onClick={() => addElementAction(newTextElt())}
      >
        AddText
      </button>
      <button
        className={Styles.addbtns}
        onClick={() => addElementAction(newImageElt())}
      >
        AddImg
      </button>
      <button
        className={Styles.addbtns}
        onClick={() => addElementAction(newTriangleElt())}
      >
        AddTriangle
      </button>
      <button
        className={Styles.addbtns}
        onClick={() => addElementAction(newRectangleElt())}
      >
        AddRectangle
      </button>
      <button
        className={Styles.addbtns}
        onClick={() => addElementAction(newEllipseElt())}
      >
        AddEllipse
      </button>
    </div>
  );
}

export { ElementsCreateBtns };
