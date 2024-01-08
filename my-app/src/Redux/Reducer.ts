import { combineReducers } from "redux";
import { GeneralActionType } from "../model/Action";
import {
  ActionsEnum,
  ElementsActionEnum,
  ListOfSelectedEnum,
  SlidesActionEnum,
} from "../model/ActionsEnum";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Editor } from "../data/const";
import { EditorType } from "../model/Editor";
import { SlideType } from "../model/Slide";

const titleReducer = (state: EditorType, action: GeneralActionType) => {
  if (action.type === ActionsEnum.CHANGE_PRESENTATION_TITLE) {
    return {
      ...state,
      Presentation: {
        ...state.Presentation,
        Name: action.payload,
      },
    };
  } else {
    return state;
  }
};

const currentReducer = (state: EditorType, action: GeneralActionType) => {
  if (action.type === SlidesActionEnum.GOTO_SLIDE) {
    return {
      ...state,
      Presentation: {
        ...state.Presentation,
        CurentSlide: action.payload,
      },
    };
  } else {
    return state;
  }
};

const elementReducer = (state: EditorType, action: GeneralActionType) => {
  const slides = state.Presentation.ListOfSlides;
  let pos = 0;
  let eltPos = 0;
  let elt;
  let counter = state.Presentation.EltCounter;
  switch (action.type) {
    case ElementsActionEnum.MOVE_SELECTED_ELEMENT:
      for (let i = 0; i < slides.length; i++) {
        for (let j = 0; j < slides[i].ListOfElements.length; j++) {
          if (
            state.ListOfSelected.Elements.indexOf(
              slides[i].ListOfElements[j].ID,
            ) !== -1
          ) {
            slides[i].ListOfElements[j].Position.X += action.payload.x;
            slides[i].ListOfElements[j].Position.Y += action.payload.y;
          }
        }
      }
      return {
        ...state,
        Presentation: {
          ...state.Presentation,
          ListOfSlides: slides,
        },
      };
    case ElementsActionEnum.ADD_ELEMENT:
      for (pos = 0; pos < slides.length; pos++) {
        if (slides[pos].ID === state.Presentation.CurentSlide) {
          break;
        }
      }
      counter++;
      elt = action.payload;
      elt.ID = "elt" + counter;
      slides[pos].ListOfElements.push(elt);
      return {
        ...state,
        Presentation: {
          ...state.Presentation,
          ListOfSlides: slides,
          EltCounter: counter,
        },
      };
    case ElementsActionEnum.CHANDE_SCALE_SELECTED_ELEMENTS:
      for (let i = 0; i < slides.length; i++) {
        for (let j = 0; j < slides[i].ListOfElements.length; j++) {
          if (
            state.ListOfSelected.Elements.indexOf(
              slides[i].ListOfElements[j].ID,
            ) !== -1
          ) {
            slides[i].ListOfElements[j].Scale.Height += action.payload.height;
            slides[i].ListOfElements[j].Scale.Wigth += action.payload.width;
          }
        }
      }
      return {
        ...state,
        Presentation: {
          ...state.Presentation,
          ListOfSlides: slides,
        },
      };
    case ElementsActionEnum.SET_NEW_IMAGE:
      for (pos = 0; pos < slides.length; pos++) {
        if (slides[pos].ID === state.Presentation.CurentSlide) {
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
        Presentation: {
          ...state.Presentation,
          ListOfSlides: slides,
        },
      };
    case ElementsActionEnum.SET_NEW_FONT:
      for (pos = 0; pos < slides.length; pos++) {
        if (slides[pos].ID === state.Presentation.CurentSlide) {
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
        Presentation: {
          ...state.Presentation,
          ListOfSlides: slides,
        },
      };
    case ElementsActionEnum.DELETE_SELECTED_ELEMENT:
      for (pos = 0; pos < slides.length; pos++) {
        if (slides[pos].ID === state.Presentation.CurentSlide) {
          break;
        }
      }
      state.ListOfSelected.Elements.forEach((id) => {
        slides[pos].ListOfElements.splice(
          slides[pos].ListOfElements.indexOf(
            slides[pos].ListOfElements.find((elt) => elt.ID === id)!,
          ),
          1,
        );
      });
      return {
        ...state,
        Presentation: {
          ...state.Presentation,
          ListOfSlides: slides,
        },
      };
    case ElementsActionEnum.SET_NEW_TEXT:
      for (pos = 0; pos < slides.length; pos++) {
        if (slides[pos].ID === state.Presentation.CurentSlide) {
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
        Presentation: {
          ...state.Presentation,
          ListOfSlides: slides,
        },
      };
    case ElementsActionEnum.SET_NEW_COLOR:
      for (pos = 0; pos < slides.length; pos++) {
        if (slides[pos].ID === state.Presentation.CurentSlide) {
          break;
        }
      }
      eltPos = slides[pos].ListOfElements.indexOf(
        slides[pos].ListOfElements.find((elt) => elt.ID === action.payload.id)!,
      );
      elt = slides[pos].ListOfElements[eltPos];
      if (elt.Type === "graphic") {
        elt.Color = action.payload.color;
      }
      return {
        ...state,
        Presentation: {
          ...state.Presentation,
          ListOfSlides: slides,
        },
      };
    default:
      return state;
  }
};

const slidesReducer = (state: EditorType, action: GeneralActionType) => {
  const slides = state.Presentation.ListOfSlides;
  const current = state.Presentation.ListOfSlides.find(
    (slide) => slide.ID === state.Presentation.CurentSlide,
  );
  let newSlide: SlideType;
  let slide: SlideType | undefined;
  let counter = state.Presentation.SlideCounter;
  let to: number;
  let deleted: SlideType[];
  let firstPart: SlideType[];
  switch (action.type) {
    case SlidesActionEnum.ADD_SLIDE:
      newSlide = action.payload;
      counter++;
      newSlide.ID = "slide" + counter;
      return {
        ...state,
        Presentation: {
          ...state.Presentation,
          ListOfSlides: [...slides, newSlide],
          SlideCounter: counter,
        },
      };
    case SlidesActionEnum.SET_SLIDES:
      return {
        ...state,
        Presentation: {
          ...state.Presentation,
          ListOfSlides: action.payload,
        },
      };
    case SlidesActionEnum.CHANGE_ORDERS:
      deleted = slides.splice(action.payload.from, action.payload.count);
      if (action.payload.to === -1) {
        return {
          ...state,
          Presentation: {
            ...state.Presentation,
            ListOfSlides: [...slides, ...deleted],
          },
        };
      }
      to =
        action.payload.to >= action.payload.from
          ? action.payload.to - state.ListOfSelected.Slides.length
          : action.payload.to;
      firstPart = slides.splice(0, to);
      return {
        ...state,
        Presentation: {
          ...state.Presentation,
          ListOfSlides: [...firstPart, ...deleted, ...slides],
        },
      };
    case SlidesActionEnum.DELETE_SELECTED_SLIDES:
      if (
        (slide = slides.find(
          (slide) => slide.ID === state.Presentation.CurentSlide,
        )) !== undefined
      ) {
        slides.splice(slides.indexOf(slide), 1);
      }
      state.ListOfSelected.Slides.forEach((id) => {
        slide = slides.find((slide) => slide.ID === id);
        if (slide !== undefined) {
          console.log(slide);
          slides.splice(slides.indexOf(slide), 1);
        }
      });
      return {
        ...state,
        Presentation: {
          ...state.Presentation,
          ListOfSlides: slides,
          CurentSlide: "",
        },
      };
    case SlidesActionEnum.CHANGE_BACKGROUND:
      console.log(action);
      if (current === undefined) {
        return state;
      }
      current.Background = action.payload;
      return {
        ...state,
        Presentation: {
          ...state.Presentation,
          ListOfSlides: slides,
        },
      };
    case SlidesActionEnum.CHANGE_SLIDE_COLOR:
      if (current === undefined) {
        return state;
      }
      current.Color = action.payload;
      return {
        ...state,
        Presentation: {
          ...state.Presentation,
          ListOfSlides: slides,
        },
      };
    case ElementsActionEnum.MOVE_SELECTED_ELEMENT:
    case ElementsActionEnum.ADD_ELEMENT:
    case ElementsActionEnum.CHANDE_SCALE_SELECTED_ELEMENTS:
    case ElementsActionEnum.SET_NEW_FONT:
    case ElementsActionEnum.SET_NEW_IMAGE:
    case ElementsActionEnum.DELETE_SELECTED_ELEMENT:
    case ElementsActionEnum.SET_NEW_TEXT:
    case ElementsActionEnum.SET_NEW_COLOR:
      return elementReducer(state, action);
    default:
      return state;
  }
};

const selectedReducer = (state: EditorType, action: GeneralActionType) => {
  const selected = state.ListOfSelected;
  switch (action.type) {
    case ListOfSelectedEnum.INIT_SELECTED:
      return {
        ...state,
        ListOfSelected: {
          Slides: [],
          Elements: [],
        },
      };
    case ListOfSelectedEnum.ADD_SELECTED_ELEMENT:
      if (action.payload.clear) {
        return {
          ...state,
          ListOfSelected: {
            Slides: [],
            Elements: [action.payload.id],
          },
        };
      }
      selected.Elements.push(action.payload.id);
      return {
        ...state,
        ListOfSelected: {
          Slides: [],
          Elements: selected.Elements,
        },
      };
    case ListOfSelectedEnum.ADD_SELECTED_SLIDE:
      if (action.payload.clear) {
        return {
          ...state,
          ListOfSelected: {
            Slides: [action.payload.id],
            Elements: [],
          },
        };
      }
      selected.Slides.push(action.payload.id);
      return {
        ...state,
        ListOfSelected: {
          Slides: selected.Slides,
          Elements: [],
        },
      };
    default:
      return state;
  }
};

const presentationReducer = (state: EditorType, action: GeneralActionType) => {
  switch (action.type) {
    case ActionsEnum.CHANGE_PRESENTATION_TITLE:
      return titleReducer(state, action);

    case SlidesActionEnum.GOTO_SLIDE:
      return currentReducer(state, action);
    case SlidesActionEnum.ADD_SLIDE:
    case SlidesActionEnum.SET_SLIDES:
    case SlidesActionEnum.CHANGE_ORDERS:
    case SlidesActionEnum.DELETE_SELECTED_SLIDES:
    case SlidesActionEnum.CHANGE_BACKGROUND:
    case SlidesActionEnum.CHANGE_SLIDE_COLOR:
    case ElementsActionEnum.ADD_ELEMENT:
    case ElementsActionEnum.MOVE_SELECTED_ELEMENT:
    case ElementsActionEnum.CHANDE_SCALE_SELECTED_ELEMENTS:
    case ElementsActionEnum.SET_NEW_FONT:
    case ElementsActionEnum.SET_NEW_IMAGE:
    case ElementsActionEnum.DELETE_SELECTED_ELEMENT:
    case ElementsActionEnum.SET_NEW_TEXT:
    case ElementsActionEnum.SET_NEW_COLOR:
      return slidesReducer(state, action);
    default:
      return state;
  }
};

const editorReducer = (
  state: EditorType = Editor,
  action: GeneralActionType,
) => {
  switch (action.type) {
    case ActionsEnum.SET_PRESENTATION:
      return {
        ...state,
        Presentation: action.payload,
        ListOfSelected: {
          Elements: [],
          Slides: [],
        },
      };
    case ActionsEnum.CHANGE_PRESENTATION_TITLE:
    case SlidesActionEnum.GOTO_SLIDE:
    case SlidesActionEnum.ADD_SLIDE:
    case SlidesActionEnum.SET_SLIDES:
    case SlidesActionEnum.CHANGE_ORDERS:
    case SlidesActionEnum.DELETE_SELECTED_SLIDES:
    case SlidesActionEnum.CHANGE_BACKGROUND:
    case SlidesActionEnum.CHANGE_SLIDE_COLOR:
    case ElementsActionEnum.ADD_ELEMENT:
    case ElementsActionEnum.MOVE_SELECTED_ELEMENT:
    case ElementsActionEnum.CHANDE_SCALE_SELECTED_ELEMENTS:
    case ElementsActionEnum.SET_NEW_FONT:
    case ElementsActionEnum.SET_NEW_IMAGE:
    case ElementsActionEnum.DELETE_SELECTED_ELEMENT:
    case ElementsActionEnum.SET_NEW_TEXT:
    case ElementsActionEnum.SET_NEW_COLOR:
      return presentationReducer(state, action);
    case ListOfSelectedEnum.ADD_SELECTED_ELEMENT:
    case ListOfSelectedEnum.ADD_SELECTED_SLIDE:
    case ListOfSelectedEnum.INIT_SELECTED:
      return selectedReducer(state, action);
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  editor: editorReducer,
});

type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
