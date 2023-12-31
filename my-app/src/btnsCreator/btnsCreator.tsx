import { useAppActions } from "../Actions/Actions";
import {
  newTextElt,
  newImageElt,
  newTriangleElt,
  newEllipseElt,
  newRectangleElt,
} from "../ts/defaultElements";
import Styles from "./btnsCreator.module.css";

function BtnsCreator() {
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

export { BtnsCreator };
