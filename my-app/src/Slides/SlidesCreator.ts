import { SlideType } from "../ts/types/types";

function newSlide(): SlideType {
  return {
    ID: 0,
    ListOfElements: [],
    Background: "",
    Color: "white",
  };
}

export { newSlide };
