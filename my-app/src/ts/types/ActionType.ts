import {
  ActionsEnum,
  ElementsActionEnum,
  ListOfSelectedEnum,
  SlidesActionEnum,
} from "../enum/ActionsEnum";
import { GeneralElementType, SlideType } from "./types";

export type TitleActionType = {
  type: ActionsEnum.CHANGE_PRESENTATION_TITLE;
  payload: string;
};

export type AddSlideActionType = {
  type: SlidesActionEnum.ADD_SLIDE;
  payload: SlideType;
};

export type RemoveSlideActionType = {
  type: SlidesActionEnum.DELETE_SLIDES;
  payload: string[];
};

export type GoTOSlideActionType = {
  type: SlidesActionEnum.GOTO_SLIDE;
  payload: string;
};

export type SetSlidesActionType = {
  type: SlidesActionEnum.SET_SLIDES;
  payload: SlideType[];
};

export type ChangeOrders = {
  type: SlidesActionEnum.CHANGE_ORDERS;
  payload: {
    from: number;
    to: number;
    count: number;
  };
};

export type MoveElementActionType = {
  type: ElementsActionEnum.MOVE_ELEMENT;
  payload: {
    ids: string[];
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

export type ChangeScaleType = {
  type: ElementsActionEnum.CHANDE_SCALE;
  payload: {
    id: number;
    width: number;
    height: number;
  };
};

export type SetNewFontType = {
  type: ElementsActionEnum.SET_NEW_FONT;
  payload: {
    id: number;
    FontFamily: string;
    FontStyle: string;
    FontSize: number;
    Color: string;
  };
};

export type SetNewImageType = {
  type: ElementsActionEnum.SET_NEW_IMAGE;
  payload: {
    id: number;
    src: string;
  };
};

export type DeleteElementType = {
  type: ElementsActionEnum.DELETE_ELEMENT;
  payload: number;
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
    id: number;
    text: string;
  };
};

export type GeneralActionType =
  | TitleActionType
  | AddSlideActionType
  | RemoveSlideActionType
  | GoTOSlideActionType
  | SetSlidesActionType
  | MoveElementActionType
  | AddSelectedElementActionType
  | AddSelectedSlideActionType
  | InitSelectedActionType
  | AddElementActionType
  | ChangeOrders
  | ChangeScaleType
  | SetNewFontType
  | SetNewImageType
  | DeleteElementType
  | ChangeBackgroundType
  | ChangeSlideColorType
  | SetNewTextType;
