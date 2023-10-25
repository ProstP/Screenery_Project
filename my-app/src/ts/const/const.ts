import {
  TextElementType,
  ImageElementType,
  GraphicElementType,
  HistoryOfActionsType,
  SlideType,
  PresentationType,
  EditorType,
} from "../types/types";

export const TextElt: TextElementType = {
  Type: "text",
  ID: 0,
  Text: "New Text",
  Font: {
    Color: "black",
    FontSize: 12,
    FontFamily: "Arial",
    FontStyle: "normal",
  },
  Position: {
    X: 0,
    Y: 0,
  },
  Scale: {
    Wigth: 0,
    Height: 0,
  },
};

export const ImageElt: ImageElementType = {
  Type: "image",
  ID: 0,
  Src: "default.txt",
  Position: {
    X: 0,
    Y: 0,
  },
  Scale: {
    Wigth: 0,
    Height: 0,
  },
};

export const RectangleElt: GraphicElementType = {
  Type: "graphic",
  PrimitivesVariant: "rectangle",
  Color: "black",
  ID: 0,
  Position: {
    X: 0,
    Y: 0,
  },
  Scale: {
    Wigth: 0,
    Height: 0,
  },
};

export const EllipseElt: GraphicElementType = {
  Type: "graphic",
  PrimitivesVariant: "ellipse",
  Color: "black",
  ID: 0,
  Position: {
    X: 0,
    Y: 0,
  },
  Scale: {
    Wigth: 0,
    Height: 0,
  },
};

export const TriangleElt: GraphicElementType = {
  Type: "graphic",
  PrimitivesVariant: "triangle",
  Color: "black",
  ID: 0,
  Position: {
    X: 0,
    Y: 0,
  },
  Scale: {
    Wigth: 0,
    Height: 0,
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
