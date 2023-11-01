import { Editor, TextElt, ImageElt } from "./ts/const/const";
import { SlideType } from "./ts/types/types";

function testValues() {
  Editor.Presentation.Name = "New Name";
  Editor.Presentation.CurentSlide = 0;
  const slide1: SlideType = {
    ID: 1,
    List_of_Elements: [TextElt, ImageElt],
    Background: "",
    Color: "blue",
  };
  Editor.Presentation.ListOfSlides.map((slide) => {
    for (let i = 0; i < slide.List_of_Elements.length; i++) {
      slide.List_of_Elements[i].ID = i;
    }
  });

  Editor.Presentation.ListOfSlides.push(slide1);
}

export default testValues;
