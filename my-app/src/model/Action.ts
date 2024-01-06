import {
  ActionsEnum,
  ElementsActionEnum,
  ListOfSelectedEnum,
  SlidesActionEnum,
} from "./ActionsEnum";
import { GeneralElementType } from "./Element";
import { PresentationType } from "./Presentation";
import { SlideType } from "./Slide";

export type TitleActionType = {
  type: ActionsEnum.CHANGE_PRESENTATION_TITLE;
  payload: string;
};

export type SetPresentationActionType = {
  type: ActionsEnum.SET_PRESENTATION;
  payload: PresentationType;
};

export type AddSlideActionType = {
  type: SlidesActionEnum.ADD_SLIDE;
  payload: SlideType;
};

export type DeleteSelectedSlidesActionType = {
  type: SlidesActionEnum.DELETE_SELECTED_SLIDES;
};

export type GoToSlideActionType = {
  type: SlidesActionEnum.GOTO_SLIDE;
  payload: string;
};

export type SetSlidesActionType = {
  type: SlidesActionEnum.SET_SLIDES;
  payload: SlideType[];
};

export type ChangeSlideOrders = {
  type: SlidesActionEnum.CHANGE_ORDERS;
  payload: {
    from: number;
    to: number;
    count: number;
  };
};

export type MoveSelectedElementActionType = {
  type: ElementsActionEnum.MOVE_SELECTED_ELEMENT;
  payload: {
    x: number;
    y: number;
  };
};

export type AddElementActionType = {
  type: ElementsActionEnum.ADD_ELEMENT;
  payload: GeneralElementType;
};

export type AddSelectedElementActionType = {
  type: ListOfSelectedEnum.ADD_SELECTED_ELEMENT;
  payload: {
    id: string;
    clear: boolean;
  };
};

export type AddSelectedSlideActionType = {
  type: ListOfSelectedEnum.ADD_SELECTED_SLIDE;
  payload: {
    id: string;
    clear: boolean;
  };
};

export type InitSelectedActionType = {
  type: ListOfSelectedEnum.INIT_SELECTED;
};

export type ChangeScaleSelectedElementsActionType = {
  type: ElementsActionEnum.CHANDE_SCALE_SELECTED_ELEMENTS;
  payload: {
    width: number;
    height: number;
  };
};

export type SetNewFontType = {
  type: ElementsActionEnum.SET_NEW_FONT;
  payload: {
    id: string;
    FontFamily: string;
    FontStyle: string;
    FontSize: number;
    Color: string;
  };
};

export type SetNewImageType = {
  type: ElementsActionEnum.SET_NEW_IMAGE;
  payload: {
    id: string;
    src: string;
  };
};

export type DeleteElementType = {
  type: ElementsActionEnum.DELETE_SELECTED_ELEMENT;
};

export type ChangeSlideColorType = {
  type: SlidesActionEnum.CHANGE_SLIDE_COLOR;
  payload: string;
};

export type ChangeBackgroundType = {
  type: SlidesActionEnum.CHANGE_BACKGROUND;
  payload: string;
};

export type SetNewTextType = {
  type: ElementsActionEnum.SET_NEW_TEXT;
  payload: {
    id: string;
    text: string;
  };
};

export type GeneralActionType =
  | TitleActionType
  | SetPresentationActionType
  | AddSlideActionType
  | DeleteSelectedSlidesActionType
  | GoToSlideActionType
  | SetSlidesActionType
  | MoveSelectedElementActionType
  | AddSelectedElementActionType
  | AddSelectedSlideActionType
  | InitSelectedActionType
  | AddElementActionType
  | ChangeSlideOrders
  | ChangeScaleSelectedElementsActionType
  | SetNewFontType
  | SetNewImageType
  | DeleteElementType
  | ChangeBackgroundType
  | ChangeSlideColorType
  | SetNewTextType;
