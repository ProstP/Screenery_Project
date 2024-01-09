import { useAppActions } from "../../Redux/Actions";
import {
  newTextElt,
  newImageElt,
  newTriangleElt,
  newEllipseElt,
  newRectangleElt,
} from "../../data/ElementsCreator";
import Styles from "./ElementsCreateBtns.module.css";
import newTextIcon from "../../img/element_text_button.png";
import newImageIcon from "../../img/element_image_button.png";
import newTriangleIcon from "../../img/element_triangle_button.png";
import newRectangleIcon from "../../img/element_rectangle_button.png";
import newEllipseIcon from "../../img/element_ellipse_button.png";

function ElementsCreateBtns() {
  const { addElementAction } = useAppActions();
  return (
    <div>
      <div className={Styles.blockwithaddbtns}>
        <button
          className={Styles.addbtns}
          onClick={() => addElementAction(newTextElt())}
        >
          <img 
            src={newTextIcon} 
            style={{
              width: "100%", 
              height: "100%", 
            }}
          />
        </button>
        <button
          className={Styles.addbtns}
          onClick={() => addElementAction(newImageElt())}
        >
          <img 
            src={newImageIcon} 
            style={{
              width: "100%", 
              height: "100%", 
            }}
          />
        </button>
        <button
          className={Styles.addbtns}
          onClick={() => addElementAction(newTriangleElt())}
        >
          <img 
            src={newTriangleIcon} 
            style={{
              width: "100%", 
              height: "100%", 
            }}
          />
        </button>
        <button
          className={Styles.addbtns}
          onClick={() => addElementAction(newRectangleElt())}
        >
          <img 
            src={newRectangleIcon} 
            style={{
              width: "100%", 
              height: "100%", 
            }}
          />
        </button>
        <button
          className={Styles.addbtns}
          onClick={() => addElementAction(newEllipseElt())}
        >
          <img 
            src={newEllipseIcon} 
            style={{
              width: "100%", 
              height: "100%", 
            }}
          />
        </button>
      </div>
      <div
        style={{ 
          zIndex: "2",
          position: "absolute", 
          top: "1%", 
          height: "7%",
          width: "0.5%",
          left: "51.5%", 
          display: "flex", 
          alignContent: "center", 
          justifyContent: "space-around",
          backgroundImage: "linear-gradient(#008170, #006658)",
          borderStyle: "none",
          borderRadius: "5px",
          boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
          }}
      >
      </div>
    </div>
  );
}

export { ElementsCreateBtns };
