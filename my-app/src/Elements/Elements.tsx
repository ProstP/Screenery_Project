import React from "react";
import {
  GeneralElementType,
  TextElementType,
  ImageElementType,
  GraphicElementType,
} from "../ts/types/types";
import Styles from "./Elements.module.css";

function ShowTextElement(Element: TextElementType) {
  return (
    <p
      className={Styles.element}
      style={{
        top: Element.Position.Y + "%",
        left: Element.Position.X + "%",
        width: Element.Scale.Wigth + "%",
        height: Element.Scale.Height + "%",
        fontFamily: Element.Font.FontFamily,
        fontSize: Element.Font.FontSize + "%",
        fontStyle: Element.Font.FontStyle,
        color: Element.Font.Color,
      }}
    >
      {Element.Text}
    </p>
  );
}

function ShowImageElement(Element: ImageElementType) {
  return (
    <img
      className={Styles.element}
      src={Element.Src}
      style={{
        top: Element.Position.Y + "%",
        left: Element.Position.X + "%",
        width: Element.Scale.Wigth + "%",
        height: Element.Scale.Height + "%",
      }}
    ></img>
  );
}

function ShowGraphicElement(Element: GraphicElementType) {
  return (
    <img
      className={Styles.element}
      src={Element.Src}
      style={{
        top: Element.Position.Y + "%",
        left: Element.Position.X + "%",
        width: Element.Scale.Wigth + "%",
        height: Element.Scale.Height + "%",
      }}
    ></img>
  );
}

function SelectTypeOfElement(Element: GeneralElementType) {
  switch (Element.Type) {
    case "text":
      return ShowTextElement(Element);
    case "image":
      return ShowImageElement(Element);
    case "graphic":
      return ShowGraphicElement(Element);
  }
}

function RenderElements(Elements: GeneralElementType[]) {
  return <div>{Elements.map((element) => SelectTypeOfElement(element))}</div>;
}

export default RenderElements;
