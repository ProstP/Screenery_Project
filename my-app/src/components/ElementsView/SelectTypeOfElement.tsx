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
    <input
      type="text"
      style={{
        width: "100%",
        height: "100%",
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
      value={Elt.Text}
      onChange={(event) => setNewText(Elt.ID, event.target.value)}
    ></input>
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

function showGraphicElement(elt: GraphicElementType) {
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

function selectTypeOfElement(elt: GeneralElementType) {
  switch (elt.Type) {
    case "text":
      return <ShowTextElement Elt={elt} />;
    case "image":
      return showImageElement(elt);
    case "graphic":
      return showGraphicElement(elt);
  }
}

export { selectTypeOfElement };
