import { SlideType } from "./Slide";

type PresentationType = {
  Name: string;
  CurentSlide: string;
  ListOfSlides: SlideType[];
  EltCounter: number;
  SlideCounter: number;
};
export type { PresentationType };
