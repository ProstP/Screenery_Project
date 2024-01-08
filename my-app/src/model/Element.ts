type PositionType = {
  X: number;
  Y: number;
};

type ScaleType = {
  Wigth: number;
  Height: number;
};

type FontType = {
  FontFamily: string;
  FontStyle: string;
  FontSize: number;
  Color: string;
};

type ElementType = {
  ID: string;
  Position: PositionType;
  Scale: ScaleType;
};

type TextElementType = ElementType & {
  Type: "text";
  Text: string;
  Font: FontType;
};

type ImageElementType = ElementType & {
  Type: "image";
  Src: string;
};

type GraphicElementType = ElementType & {
  Type: "graphic";
  PrimitivesVariant: "rectangle" | "ellipse" | "triangle";
  readonly Src: string;
  Color: string;
};

type GeneralElementType =
  | TextElementType
  | ImageElementType
  | GraphicElementType;

export type {
  TextElementType,
  ImageElementType,
  GraphicElementType,
  GeneralElementType,
};
