import {
  TextElementType,
  ImageElementType,
  GraphicElementType,
} from "../model/Element";
import { HistoryOfActionsType } from "../model/History";
import { SlideType } from "../model/Slide";
import { PresentationType } from "../model/Presentation";
import { EditorType } from "../model/Editor";

import cate from "../img/kote.jpg";

import circle from "../svg/circle.svg";
import triangle from "../svg/triangle.svg";
import square from "../svg/square.svg";

export const TextElt: TextElementType = {
  ID: "",
  Type: "text",
  Text: "New Текст",
  Font: {
    Color: "black",
    FontSize: 120,
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
  ID: "",
  Type: "image",
  Src: cate,
  Position: {
    X: 20,
    Y: 23,
  },
  Scale: {
    Wigth: 20,
    Height: 24,
  },
};

export const RectangleElt: GraphicElementType = {
  ID: "",
  Type: "graphic",
  PrimitivesVariant: "rectangle",
  Color: "black",
  Src: square,
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
  ID: "",
  Type: "graphic",
  PrimitivesVariant: "ellipse",
  Color: "black",
  Src: circle,
  Position: {
    X: 70,
    Y: 25,
  },
  Scale: {
    Wigth: 40,
    Height: 10,
  },
};

export const TriangleElt: GraphicElementType = {
  ID: "",
  Type: "graphic",
  PrimitivesVariant: "triangle",
  Color: "black",
  Src: triangle,
  Position: {
    X: 10,
    Y: 10,
  },
  Scale: {
    Wigth: 10,
    Height: 10,
  },
};

export const HistoryOfActions: HistoryOfActionsType = {
  RedoActions: [],
  UndoActions: [],
};

export const Slide: SlideType = {
  ID: "slide0",
  ListOfElements: [],
  Background: "",
  Color: "white",
};

export const Presentation: PresentationType = {
  Name: "New name",
  CurentSlide: "slide0",
  ListOfSlides: [Slide],
  EltCounter: 0,
  SlideCounter: 0,
};

export const Editor: EditorType = {
  Presentation: Presentation,
  ListOfSelected: {
    Slides: [],
    Elements: [],
  },
  History: HistoryOfActions,
};
