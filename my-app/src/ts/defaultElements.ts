import {
  GraphicElementType,
  ImageElementType,
  TextElementType,
} from "./types/types";

import cate from "../img/kote.jpg";
import circle from "../img/circle.png";
import square from "../img/square.png";
import triangle from "../img/triangle.png";

function newTextElt(): TextElementType {
  return {
    Type: "text",
    ID: 0,
    Text: "Text",
    Font: {
      Color: "black",
      FontSize: 120,
      FontFamily: "Arial",
      FontStyle: "normal",
    },
    Position: {
      X: 10,
      Y: 10,
    },
    Scale: {
      Wigth: 20,
      Height: 10,
    },
  };
}

function newImageElt(): ImageElementType {
  return {
    ID: 0,
    Type: "image",
    Src: cate,
    Position: {
      X: 10,
      Y: 10,
    },
    Scale: {
      Wigth: 20,
      Height: 24,
    },
  };
}

function newRectangleElt(): GraphicElementType {
  return {
    ID: 0,
    Type: "graphic",
    PrimitivesVariant: "rectangle",
    Color: "black",
    Src: square,
    Position: {
      X: 10,
      Y: 10,
    },
    Scale: {
      Wigth: 10,
      Height: 15,
    },
  };
}

function newEllipseElt(): GraphicElementType {
  return {
    ID: 0,
    Type: "graphic",
    PrimitivesVariant: "ellipse",
    Color: "black",
    Src: circle,
    Position: {
      X: 10,
      Y: 10,
    },
    Scale: {
      Wigth: 15,
      Height: 15,
    },
  };
}

function newTriangleElt(): GraphicElementType {
  return {
    ID: 0,
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
}

export {
  newTextElt,
  newImageElt,
  newEllipseElt,
  newRectangleElt,
  newTriangleElt,
};
