export type PositionType = {
  X: number;
  Y: number;
};

export type ScaleType = {
  Wigth: number;
  Height: number;
};

export type FontType = {
  FontFamily: string;
  FontStyle: string;
  FontSize: number;
  Color: string;
};

export type ElementType = {
  ID: number;
  Type: string;
  Position: PositionType;
  Scale: ScaleType;
};

export type TextElementType = ElementType & {
  Type: "text";
  Text: string;
  Font: FontType;
};

export type ImageElementType = ElementType & {
  Type: "image";
  Src: string;
};

export type GraphicElementType = ElementType & {
  Type: "graphic";
  PrimitivesVariant: "rectangle" | "ellipse" | "triangle";
  readonly Src: string;
  Color: string;
};

export type GeneralElementType =
  | TextElementType
  | ImageElementType
  | GraphicElementType;

export type SlideType = {
  ID: number;
  List_of_Elements: GeneralElementType[];
  Background: string;
  Color: string;
};

export type ListOfSelectedType = {
  Slides: SlideType[];
  Elements: ElementType[];
};

export type PresentationType = {
  Name: string;
  CurentSlide: number;
  ListOfSlides: SlideType[];
  ListOfSelected: ListOfSelectedType;
};

export type HistoryOfActionsType = {
  Actions: PresentationType[];
};

export type EditorType = {
  Presentation: PresentationType;
  History: HistoryOfActionsType;
};
