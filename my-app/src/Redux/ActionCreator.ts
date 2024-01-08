import {
  ActionsEnum,
  ElementsActionEnum,
  ListOfSelectedEnum,
  SlidesActionEnum,
} from "../model/ActionsEnum";
import { GeneralElementType } from "../model/Element";
import { PresentationType } from "../model/Presentation";
import { SlideType } from "../model/Slide";

const goToSlideAction = (id: string) => {
  return {
    type: SlidesActionEnum.GOTO_SLIDE,
    payload: id,
  };
};

const changePresentationTitle = (Title: string) => {
  return {
    type: ActionsEnum.CHANGE_PRESENTATION_TITLE,
    payload: Title,
  };
};

const setPresentation = (Presentation: PresentationType) => {
  return {
    type: ActionsEnum.SET_PRESENTATION,
    payload: Presentation,
  };
};

const setSlides = (slides: SlideType[]) => {
  return {
    type: SlidesActionEnum.SET_SLIDES,
    payload: slides,
  };
};

const deleteSelectedSlides = () => {
  return {
    type: SlidesActionEnum.DELETE_SELECTED_SLIDES,
  };
};

const changeOrders = (from: number, to: number, count: number) => {
  return {
    type: SlidesActionEnum.CHANGE_ORDERS,
    payload: {
      from: from,
      to: to,
      count: count,
    },
  };
};

const moveSelectedElement = (x: number, y: number) => {
  return {
    type: ElementsActionEnum.MOVE_SELECTED_ELEMENT,
    payload: {
      x: x,
      y: y,
    },
  };
};

const addElementAction = (elt: GeneralElementType) => {
  return {
    type: ElementsActionEnum.ADD_ELEMENT,
    payload: elt,
  };
};

const addSlideAction = (slide: SlideType) => {
  return {
    type: SlidesActionEnum.ADD_SLIDE,
    payload: slide,
  };
};

const addSelectedElement = (id: string, clear: boolean) => {
  return {
    type: ListOfSelectedEnum.ADD_SELECTED_ELEMENT,
    payload: {
      id: id,
      clear: clear,
    },
  };
};

const addSelectedSlide = (id: string, clear: boolean) => {
  return {
    type: ListOfSelectedEnum.ADD_SELECTED_SLIDE,
    payload: {
      id: id,
      clear: clear,
    },
  };
};

const initSelected = () => {
  return {
    type: ListOfSelectedEnum.INIT_SELECTED,
  };
};

const changeScaleSelectedElements = (width: number, height: number) => {
  return {
    type: ElementsActionEnum.CHANDE_SCALE_SELECTED_ELEMENTS,
    payload: {
      width: width,
      height: height,
    },
  };
};

const setNewFont = (
  id: string,
  fontFamily: string,
  fontStyle: string,
  fontSize: number,
  color: string,
) => {
  return {
    type: ElementsActionEnum.SET_NEW_FONT,
    payload: {
      id: id,
      FontFamily: fontFamily,
      FontSize: fontSize,
      FontStyle: fontStyle,
      Color: color,
    },
  };
};

const setNewImage = (id: string, src: string) => {
  return {
    type: ElementsActionEnum.SET_NEW_IMAGE,
    payload: {
      id: id,
      src: src,
    },
  };
};

const deleteSelectedElement = () => {
  return {
    type: ElementsActionEnum.DELETE_SELECTED_ELEMENT,
  };
};

const changeBackground = (image: string) => {
  return {
    type: SlidesActionEnum.CHANGE_BACKGROUND,
    payload: image,
  };
};

const changeSlideColor = (color: string) => {
  return {
    type: SlidesActionEnum.CHANGE_SLIDE_COLOR,
    payload: color,
  };
};

const setNewText = (id: string, text: string) => {
  return {
    type: ElementsActionEnum.SET_NEW_TEXT,
    payload: {
      id: id,
      text: text,
    },
  };
};

const setNewColor = (id: string, color: string) => {
  return {
    type: ElementsActionEnum.SET_NEW_COLOR,
    payload: {
      id: id,
      color: color,
    },
  };
};

export {
  goToSlideAction,
  setPresentation,
  changePresentationTitle,
  setSlides,
  deleteSelectedSlides,
  moveSelectedElement,
  addSelectedElement,
  addSelectedSlide,
  initSelected,
  addElementAction,
  changeOrders,
  addSlideAction,
  changeScaleSelectedElements,
  setNewFont,
  setNewImage,
  deleteSelectedElement,
  changeBackground,
  changeSlideColor,
  setNewText,
  setNewColor,
};
