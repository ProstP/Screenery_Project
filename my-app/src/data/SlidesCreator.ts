import { SlideType } from "../model/Slide";

function newSlide(): SlideType {
  return {
    ID: "slide0",
    ListOfElements: [],
    Background: "",
    Color: "white",
  };
}

export { newSlide };
