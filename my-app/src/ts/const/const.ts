import {
  TextElementType,
  ImageElementType,
  GraphicElementType,
  HistoryOfActionsType,
  SlideType,
  PresentationType,
  EditorType,
} from "../types/types";

import cate from "../../img/kote.jpg";

import circle from "../../img/circle.png";
import triangle from "../../img/triangle.png";
import square from "../../img/square.png";

export const TextElt: TextElementType = {
  Type: "text",
  ID: 0,
  Text: "New Текст",
  Font: {
    Color: "black",
    FontSize: 100,
    FontFamily: "Arial",
    FontStyle: "normal",
  },
  Position: {
    X: 15,
    Y: 10,
  },
  Scale: {
    Wigth: 40,
    Height: 20,
  },
};

export const ImageElt: ImageElementType = {
  Type: "image",
  ID: 0,
  Src: cate,
  Position: {
    X: 11,
    Y: 23,
  },
  Scale: {
    Wigth: 20,
    Height: 24,
  },
};

export const RectangleElt: GraphicElementType = {
  Type: "graphic",
  PrimitivesVariant: "rectangle",
  Color: "black",
  Src: square,
  ID: 0,
  Position: {
    X: 80,
    Y: 80,
  },
  Scale: {
    Wigth: 10,
    Height: 15,
  },
};

export const EllipseElt: GraphicElementType = {
  Type: "graphic",
  PrimitivesVariant: "ellipse",
  Color: "black",
  ID: 0,
  Src: circle,
  Position: {
    X: 13,
    Y: 25,
  },
  Scale: {
    Wigth: 40,
    Height: 10,
  },
};

export const TriangleElt: GraphicElementType = {
  Type: "graphic",
  PrimitivesVariant: "triangle",
  Color: "black",
  Src: triangle,
  ID: 0,
  Position: {
    X: 10,
    Y: 70,
  },
  Scale: {
    Wigth: 10,
    Height: 10,
  },
};

export const HistoryOfActions: HistoryOfActionsType = {
  Actions: [],
};

export const Slide: SlideType = {
  ID: 0,
  List_of_Elements: [TextElt, ImageElt, RectangleElt, EllipseElt, TriangleElt],
  Background: "",
  Color: "white",
};

export const Presentation: PresentationType = {
  Name: "New name",
  CurentSlide: 0,
  ListOfSlides: [Slide],
  ListOfSelected: {
    Slides: [],
    Elements: [],
  },
};

export const Editor: EditorType = {
  Presentation: Presentation,
  History: HistoryOfActions,
};
