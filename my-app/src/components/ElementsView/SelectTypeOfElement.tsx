import {
  GeneralElementType,
  TextElementType,
  ImageElementType,
  GraphicElementType,
} from "../../model/Element";
import { useAppActions } from "../../Redux/Actions";
import {
  FontFamilyEnum,
  FontWeightEnum,
  TextDecorationEnum,
} from "../../model/FontEnum";

type ShowTextElementProps = {
  Elt: TextElementType;
};

function ShowTextElement(props: ShowTextElementProps) {
  const { Elt } = props;
  const { setNewText } = useAppActions();
  return (
    <textarea
      style={{
        width: "100%",
        height: "100%",
        resize: "none",
        border: 0,
        outlineWidth: 0,
        fontFamily: Elt.Font.FontFamily,
        fontSize: Elt.Font.FontSize + "%",
        fontStyle: FontFamilyEnum.includes(Elt.Font.FontStyle)
          ? Elt.Font.FontStyle
          : "normal",
        fontWeight: FontWeightEnum.includes(Elt.Font.FontStyle)
          ? Elt.Font.FontStyle
          : "normal",
        textDecoration: TextDecorationEnum.includes(Elt.Font.FontStyle)
          ? Elt.Font.FontStyle
          : "none",
        color: Elt.Font.Color,
        background: "transparent",
      }}
      unselectable="on"
      value={Elt.Text}
      onChange={(event) => setNewText(Elt.ID, event.target.value)}
    ></textarea>
  );
}

function showImageElement(elt: ImageElementType) {
  return (
    <img
      style={{
        width: "100%",
        height: "100%",
      }}
      src={elt.Src}
    ></img>
  );
}

function showRectangle(elt: GraphicElementType) {
  return (
    <svg width="100%" height="100%">
      <rect width="100%" height="100%" style={{ fill: elt.Color }} />
    </svg>
  );
}

function showEllipse(elt: GraphicElementType) {
  return (
    <svg width="100%" height="100%">
      <ellipse
        cx="50%"
        cy="50%"
        rx="50%"
        ry="50%"
        style={{ fill: elt.Color }}
      ></ellipse>
    </svg>
  );
}

function showTriangle(elt: GraphicElementType) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polygon
        points="0 100, 50 0, 100 100"
        style={{ fill: elt.Color }}
      ></polygon>
    </svg>
  );
}

function showGraphicElement(elt: GraphicElementType) {
  switch (elt.PrimitivesVariant) {
    case "rectangle":
      return showRectangle(elt);
    case "ellipse":
      return showEllipse(elt);
    case "triangle":
      return showTriangle(elt);
    default:
      return null;
  }
}

function selectTypeOfElement(elt: GeneralElementType) {
  switch (elt.Type) {
    case "text":
      return <ShowTextElement Elt={elt} />;
    case "image":
      return showImageElement(elt);
    case "graphic":
      return showGraphicElement(elt);
    default:
      return null;
  }
}

export { selectTypeOfElement };
