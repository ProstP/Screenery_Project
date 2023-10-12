const text_elt: TextElementType = {
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

const image_elt: ImageElementType = {
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

const rectangle_elt: GraphicElementType = {
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

const ellipse_elt: GraphicElementType = {
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

const triangle_elt: GraphicElementType = {
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

const history_of_actions: HistoryOfActionsType = {
  Actions: [],
};

const slide: SlideType = {
  ID: 0,
  List_of_Elements: [
    text_elt,
    image_elt,
    rectangle_elt,
    ellipse_elt,
    triangle_elt,
  ],
  Background: "",
  Color: "white",
};

const presentation: PresentationType = {
  Name: "New name",
  CurentSlide: 1,
  ListOfSlides: [slide],
  ListOfSelected: {
    Slides: [],
    Elements: [],
  },
};

const editor: EditorType = {
  Presentation: presentation,
  History: history_of_actions,
};
