import { Slide } from "../ts/const/const";
import { SlideType } from "../ts/types/types";

function findSlideById(slides: SlideType[], id: string) {
  for (const slide of slides) {
    if ("slide" + slide.ID === id) {
      return slide;
    }
  }
  return Slide;
}

export default findSlideById;
