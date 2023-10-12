type EditorType = {
  Presentation: PresentationType;
  History: HistoryOfActionsType;
};

type PresentationType = {
  Name: string;
  CurentSlide: number;
  ListOfSlides: SlideType[];
  ListOfSelected: ListOfSelectedType;
};

type ListOfSelectedType = {
  Slides: SlideType[];
  Elements: ElementType[];
};

type HistoryOfActionsType = {
  Actions: PresentationType[];
};

type SlideType = {
  ID: number;
  List_of_Elements: ElementType[];
  Background: string;
  Color: string;
};

type ElementType = {
  ID: number;
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
  Color: string;
};

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
