import { SlideType } from "../ts/types/types";

function newSlide(): SlideType {
  return {
    ID: 0,
    List_of_Elements: [],
    Background: "",
    Color: "white",
  };
}

export { newSlide };
