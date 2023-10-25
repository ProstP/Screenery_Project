import { Editor, TextElt } from "./ts/const/const";
import { SlideType } from "./ts/types/types";

function testValues() {
  Editor.Presentation.Name = "New name !!!!!";
  Editor.Presentation.CurentSlide = 0;
  const slide1: SlideType = {
    ID: 1,
    List_of_Elements: [TextElt],
    Background: "",
    Color: "red",
  };

  Editor.Presentation.ListOfSlides.push(slide1);

  Editor.Presentation.ListOfSlides[0].List_of_Elements[0].Position.X = 20;
}

export default testValues;
