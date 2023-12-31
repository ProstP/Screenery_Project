import {
  ActionsEnum,
  ElementsActionEnum,
  ListOfSelectedEnum,
  SlidesActionEnum,
} from "../ts/enum/ActionsEnum";
import { GeneralElementType, SlideType } from "../ts/types/types";

const goToSlideAction = (id: string) => {
  return {
    type: SlidesActionEnum.GOTO_SLIDE,
    payload: id,
  };
};

const changePresentationName = (name: string) => {
  return {
    type: ActionsEnum.CHANGE_PRESENTATION_TITLE,
    payload: name,
  };
};

const setSlides = (slides: SlideType[]) => {
  return {
    type: SlidesActionEnum.SET_SLIDES,
    payload: slides,
  };
};

const deleteSlides = (ids: string[]) => {
  return {
    type: SlidesActionEnum.DELETE_SLIDES,
    payload: ids,
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

const moveElement = (x: number, y: number, ids: string[]) => {
  return {
    type: ElementsActionEnum.MOVE_ELEMENT,
    payload: {
      ids: ids,
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

const changeScale = (id: number, width: number, height: number) => {
  return {
    type: ElementsActionEnum.CHANDE_SCALE,
    payload: {
      id: id,
      width: width,
      height: height,
    },
  };
};

const setNewFont = (
  id: number,
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

const setNewImage = (id: number, src: string) => {
  return {
    type: ElementsActionEnum.SET_NEW_IMAGE,
    payload: {
      id: id,
      src: src,
    },
  };
};

const deleteElement = (id: number) => {
  return {
    type: ElementsActionEnum.DELETE_ELEMENT,
    payload: id,
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

const setNewText = (id: number, text: string) => {
  return {
    type: ElementsActionEnum.SET_NEW_TEXT,
    payload: {
      id: id,
      text: text,
    },
  };
};

export {
  goToSlideAction,
  changePresentationName,
  setSlides,
  deleteSlides,
  moveElement,
  addSelectedElement,
  addSelectedSlide,
  initSelected,
  addElementAction,
  changeOrders,
  addSlideAction,
  changeScale,
  setNewFont,
  setNewImage,
  deleteElement,
  changeBackground,
  changeSlideColor,
  setNewText,
};
