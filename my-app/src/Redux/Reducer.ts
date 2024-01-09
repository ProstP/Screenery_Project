import { combineReducers } from "redux";
import { GeneralActionType } from "../model/Action";
import {
  ActionsEnum,
  ElementsActionEnum,
  HistoryActionEnum,
  ListOfSelectedActionEnum,
  SlidesActionEnum,
} from "../model/ActionsEnum";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Editor } from "../data/const";
import { EditorType } from "../model/Editor";
import { SlideType } from "../model/Slide";
import { PresentationType } from "../model/Presentation";
import { addHistory } from "../model/History";

const titleReducer = (state: EditorType, action: GeneralActionType) => {
  if (action.type === ActionsEnum.CHANGE_PRESENTATION_TITLE) {
    return {
      ...state,
      History: addHistory(state.History, state.Presentation),
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
      History: addHistory(state.History, state.Presentation),
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
  const slides = [...state.Presentation.ListOfSlides];
  const history = addHistory(state.History, state.Presentation);
  let newSlides: SlideType[];
  let pos = 0;
  let eltPos = 0;
  let elt;
  let counter = state.Presentation.EltCounter;
  switch (action.type) {
    case ElementsActionEnum.MOVE_SELECTED_ELEMENT:
      newSlides = state.Presentation.ListOfSlides.map((slide) => {
        if (slide.ID === state.Presentation.CurentSlide) {
          return {
            ...slide,
            ListOfElements: slide.ListOfElements.map((elt) => {
              if (state.ListOfSelected.Elements.indexOf(elt.ID) !== -1) {
                elt.Position.X += action.payload.x;
                elt.Position.Y += action.payload.y;
              }
              return elt;
            }),
          };
        }
        return slide;
      });
      return {
        ...state,
        History: history,
        Presentation: {
          ...state.Presentation,
          ListOfSlides: newSlides,
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
        History: history,
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
        History: history,
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
        History: history,
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
        History: history,
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
        History: history,
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
        History: history,
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
        History: history,
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
  const history = addHistory(state.History, state.Presentation);
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
        History: history,
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
          History: history,
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
        History: history,
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
        History: history,
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
        History: history,
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
        History: history,
      };
    default:
      return state;
  }
};

const selectedReducer = (state: EditorType, action: GeneralActionType) => {
  const selected = state.ListOfSelected;
  switch (action.type) {
    case ListOfSelectedActionEnum.INIT_SELECTED:
      return {
        ...state,
        ListOfSelected: {
          Slides: [],
          Elements: [],
        },
      };
    case ListOfSelectedActionEnum.ADD_SELECTED_ELEMENT:
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
    case ListOfSelectedActionEnum.ADD_SELECTED_SLIDE:
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

const historyReducer = (state: EditorType, action: GeneralActionType) => {
  const undoList = state.History.UndoActions;
  const redoList = state.History.RedoActions;
  let presentation: PresentationType;
  switch (action.type) {
    case HistoryActionEnum.UNDO:
      if (undoList.length === 0) {
        return state;
      }
      redoList.push(JSON.stringify(state.Presentation));
      presentation = JSON.parse(undoList.pop()!);
      // redoList.push(state.Presentation);
      // presentation = undoList.pop()!;
      return {
        Presentation: presentation,
        ListOfSelected: {
          Slides: [],
          Elements: [],
        },
        History: {
          RedoActions: redoList,
          UndoActions: undoList,
        },
      };
    case HistoryActionEnum.REDO:
      if (redoList.length === 0) {
        return state;
      }
      undoList.push(JSON.stringify(state.Presentation));
      presentation = JSON.parse(redoList.pop()!);
      // undoList.push(state.Presentation);
      // presentation = redoList.pop()!;
      return {
        Presentation: presentation,
        ListOfSelected: {
          Slides: [],
          Elements: [],
        },
        History: {
          RedoActions: redoList,
          UndoActions: undoList,
        },
      };
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
        Presentation: action.payload,
        ListOfSelected: {
          Elements: [],
          Slides: [],
        },
        History: addHistory(state.History, state.Presentation),
      };
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
      return slidesReducer(state, action);
    case ElementsActionEnum.ADD_ELEMENT:
    case ElementsActionEnum.MOVE_SELECTED_ELEMENT:
    case ElementsActionEnum.CHANDE_SCALE_SELECTED_ELEMENTS:
    case ElementsActionEnum.SET_NEW_FONT:
    case ElementsActionEnum.SET_NEW_IMAGE:
    case ElementsActionEnum.DELETE_SELECTED_ELEMENT:
    case ElementsActionEnum.SET_NEW_TEXT:
    case ElementsActionEnum.SET_NEW_COLOR:
      return elementReducer(state, action);
    case ListOfSelectedActionEnum.ADD_SELECTED_ELEMENT:
    case ListOfSelectedActionEnum.ADD_SELECTED_SLIDE:
    case ListOfSelectedActionEnum.INIT_SELECTED:
      return selectedReducer(state, action);
    case HistoryActionEnum.UNDO:
    case HistoryActionEnum.REDO:
      return historyReducer(state, action);
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  editor: editorReducer,
});

type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
