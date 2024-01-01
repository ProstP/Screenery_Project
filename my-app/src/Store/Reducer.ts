import { combineReducers } from "redux";
import { GeneralActionType, GoTOSlideActionType } from "../ts/types/ActionType";
import {
  ActionsEnum,
  ElementsActionEnum,
  ListOfSelectedEnum,
  SlidesActionEnum,
} from "../ts/enum/ActionsEnum";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Editor, Presentation } from "../ts/const/const";
import { ListOfSelectedType, PresentationType } from "../ts/types/types";

const titleReducer = (state = "New Name", action: GeneralActionType) => {
  if (action.type === ActionsEnum.CHANGE_PRESENTATION_TITLE) {
    return action.payload;
  } else {
    return state;
  }
};

const currentReducer = (
  state = Presentation.CurentSlide,
  action: GoTOSlideActionType,
) => {
  if (action.type === SlidesActionEnum.GOTO_SLIDE) {
    return action.payload;
  } else {
    return state;
  }
};

const elementReducer = (state: PresentationType, action: GeneralActionType) => {
  const slides = state.ListOfSlides;
  let pos = 0;
  let eltPos = 0;
  let elt;
  let counter = state.EltCounter;
  switch (action.type) {
    case ElementsActionEnum.MOVE_ELEMENT:
      for (let i = 0; i < slides.length; i++) {
        for (let j = 0; j < slides[i].ListOfElements.length; j++) {
          if (
            action.payload.ids.indexOf(
              "elt" + slides[i].ListOfElements[j].ID,
            ) !== -1
          ) {
            slides[i].ListOfElements[j].Position.X += action.payload.x;
            slides[i].ListOfElements[j].Position.Y += action.payload.y;
          }
        }
      }
      return {
        ...state,
        ListOfSlides: slides,
      };
    case ElementsActionEnum.ADD_ELEMENT:
      for (pos = 0; pos < slides.length; pos++) {
        if ("slide" + slides[pos].ID === state.CurentSlide) {
          break;
        }
      }
      counter++;
      elt = action.payload;
      elt.ID = counter;
      slides[pos].ListOfElements.push(elt);
      return {
        ...state,
        ListOfSlides: slides,
        EltCounter: counter,
      };
    case ElementsActionEnum.CHANDE_SCALE:
      for (pos = 0; pos < slides.length; pos++) {
        if ("slide" + slides[pos].ID === state.CurentSlide) {
          break;
        }
      }
      eltPos = slides[pos].ListOfElements.indexOf(
        slides[pos].ListOfElements.find((elt) => elt.ID === action.payload.id)!,
      );
      slides[pos].ListOfElements[eltPos].Scale = {
        Wigth: action.payload.width,
        Height: action.payload.height,
      };
      return {
        ...state,
        ListOfSlides: slides,
      };
    case ElementsActionEnum.SET_NEW_IMAGE:
      for (pos = 0; pos < slides.length; pos++) {
        if ("slide" + slides[pos].ID === state.CurentSlide) {
          break;
        }
      }
      eltPos = slides[pos].ListOfElements.indexOf(
        slides[pos].ListOfElements.find((elt) => elt.ID === action.payload.id)!,
      );
      elt = slides[pos].ListOfElements[eltPos];
      if (elt.Type === "image") {
        elt.Src = action.payload.src;
      }
      return {
        ...state,
        ListOfSlides: slides,
      };
    case ElementsActionEnum.SET_NEW_FONT:
      for (pos = 0; pos < slides.length; pos++) {
        if ("slide" + slides[pos].ID === state.CurentSlide) {
          break;
        }
      }
      eltPos = slides[pos].ListOfElements.indexOf(
        slides[pos].ListOfElements.find((elt) => elt.ID === action.payload.id)!,
      );
      elt = slides[pos].ListOfElements[eltPos];
      if (elt.Type === "text") {
        elt.Font = {
          FontFamily: action.payload.FontFamily,
          FontStyle: action.payload.FontStyle,
          FontSize: action.payload.FontSize,
          Color: action.payload.Color,
        };
      }
      return {
        ...state,
        ListOfSlides: slides,
      };
    case ElementsActionEnum.DELETE_ELEMENT:
      for (pos = 0; pos < slides.length; pos++) {
        if ("slide" + slides[pos].ID === state.CurentSlide) {
          break;
        }
      }
      eltPos = slides[pos].ListOfElements.indexOf(
        slides[pos].ListOfElements.find((elt) => elt.ID === action.payload)!,
      );
      slides[pos].ListOfElements.splice(eltPos, 1);
      return {
        ...state,
        ListOfSlides: slides,
      };
    case ElementsActionEnum.SET_NEW_TEXT:
      for (pos = 0; pos < slides.length; pos++) {
        if ("slide" + slides[pos].ID === state.CurentSlide) {
          break;
        }
      }
      eltPos = slides[pos].ListOfElements.indexOf(
        slides[pos].ListOfElements.find((elt) => elt.ID === action.payload.id)!,
      );
      elt = slides[pos].ListOfElements[eltPos];
      if (elt.Type === "text") {
        elt.Text = action.payload.text;
      }
      return {
        ...state,
        ListOfSlides: slides,
      };
    default:
      return state;
  }
};

const slidesReducer = (
  state: PresentationType = Presentation,
  action: GeneralActionType,
) => {
  const slides = state.ListOfSlides;
  const current = state.ListOfSlides.find(
    (slide) => "slide" + slide.ID === state.CurentSlide,
  );
  let newSlide;
  let counter = state.SlideCounter;
  let to;
  let deleted;
  let firstPart;
  switch (action.type) {
    case SlidesActionEnum.ADD_SLIDE:
      newSlide = action.payload;
      counter++;
      newSlide.ID = counter;
      return {
        ...state,
        ListOfSlides: [...slides, newSlide],
        SlideCounter: counter,
      };
    case SlidesActionEnum.SET_SLIDES:
      return {
        ...state,
        ListOfSlides: action.payload,
      };
    case SlidesActionEnum.CHANGE_ORDERS:
      deleted = slides.splice(action.payload.from, action.payload.count);
      if (action.payload.to === -1) {
        return {
          ...state,
          ListOfSlides: [...slides, ...deleted],
        };
      }
      to =
        action.payload.to >= action.payload.from
          ? action.payload.to - action.payload.from
          : action.payload.to;
      firstPart = slides.splice(0, to);
      return {
        ...state,
        ListOfSlides: [...firstPart, ...deleted, ...slides],
      };
    case SlidesActionEnum.DELETE_SLIDES:
      if (state.ListOfSlides.length === 1) {
        return state;
      }
      action.payload.forEach((id) => {
        slides.splice(
          slides.indexOf(slides.find((slide) => "slide" + slide.ID === id)!),
          1,
        );
      });
      return {
        ...state,
        ListOfSlides: slides,
      };
    case SlidesActionEnum.CHANGE_BACKGROUND:
      console.log(action);
      if (current === undefined) {
        return state;
      }
      current.Background = action.payload;
      return {
        ...state,
        ListOfSlides: slides,
      };
    case SlidesActionEnum.CHANGE_SLIDE_COLOR:
      if (current === undefined) {
        return state;
      }
      current.Color = action.payload;
      return {
        ...state,
        ListOfSlides: slides,
      };
    case ElementsActionEnum.MOVE_ELEMENT:
    case ElementsActionEnum.ADD_ELEMENT:
    case ElementsActionEnum.CHANDE_SCALE:
    case ElementsActionEnum.SET_NEW_FONT:
    case ElementsActionEnum.SET_NEW_IMAGE:
    case ElementsActionEnum.DELETE_ELEMENT:
    case ElementsActionEnum.SET_NEW_TEXT:
      return elementReducer(state, action);
    default:
      return state;
  }
};

const selectedReducer = (
  state: ListOfSelectedType = Editor.ListOfSelected,
  action: GeneralActionType,
) => {
  const selected = state;
  switch (action.type) {
    case ListOfSelectedEnum.INIT_SELECTED:
      return {
        Slides: [],
        Elements: [],
      };
    case ListOfSelectedEnum.ADD_SELECTED_ELEMENT:
      if (action.payload.clear) {
        return {
          Slides: [],
          Elements: [action.payload.id],
        };
      }
      selected.Elements.push(action.payload.id);
      return {
        Slides: [],
        Elements: selected.Elements,
      };
    case ListOfSelectedEnum.ADD_SELECTED_SLIDE:
      if (action.payload.clear) {
        return {
          Slides: [action.payload.id],
          Elements: [],
        };
      }
      selected.Slides.push(action.payload.id);
      return {
        Slides: selected.Slides,
        Elements: [],
      };
    default:
      return state;
  }
};

const presentationReducer = (
  state: PresentationType = Presentation,
  action: GeneralActionType,
) => {
  switch (action.type) {
    case ActionsEnum.CHANGE_PRESENTATION_TITLE:
      return {
        ...state,
        Name: titleReducer(state.Name, action),
      };
    case SlidesActionEnum.GOTO_SLIDE:
      return {
        ...state,
        CurentSlide: currentReducer(state.CurentSlide, action),
      };
    case SlidesActionEnum.ADD_SLIDE:
    case SlidesActionEnum.SET_SLIDES:
    case SlidesActionEnum.CHANGE_ORDERS:
    case SlidesActionEnum.DELETE_SLIDES:
    case SlidesActionEnum.CHANGE_BACKGROUND:
    case SlidesActionEnum.CHANGE_SLIDE_COLOR:
    case ElementsActionEnum.ADD_ELEMENT:
    case ElementsActionEnum.MOVE_ELEMENT:
    case ElementsActionEnum.CHANDE_SCALE:
    case ElementsActionEnum.SET_NEW_FONT:
    case ElementsActionEnum.SET_NEW_IMAGE:
    case ElementsActionEnum.DELETE_ELEMENT:
    case ElementsActionEnum.SET_NEW_TEXT:
      return slidesReducer(state, action);
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  presentation: presentationReducer,
  selected: selectedReducer,
});

type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
