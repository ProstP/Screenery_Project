export enum ActionsEnum {
  CHANGE_PRESENTATION_TITLE = "CHANGE_PESENTATION_TITLE",
  SET_PRESENTATION = "SET_PRESENTATION",
}

export enum SlidesActionEnum {
  ADD_SLIDE = "ADD_SLIDE",
  GOTO_SLIDE = "GOTO_SLIDE",
  SET_SLIDES = "SET_SLIDES",
  CHANGE_ORDERS = "CHANGE_ORDERS",
  CHANGE_SLIDE_COLOR = "CHANGE_SLIDE_COLOR",
  CHANGE_BACKGROUND = "CHANGE_BACKGROUND",
  DELETE_SELECTED_SLIDES = "DELETE_SELECTED_SLIDES",
}

export enum ElementsActionEnum {
  ADD_ELEMENT = "ADD_ELEMENT",
  SET_NEW_TEXT = "SET_NEW_TEXT",
  SET_NEW_FONT = "SET_NEW_FONT",
  SET_NEW_IMAGE = "SET_NEW_IMAGE",
  SET_NEW_COLOR = "SET_NEW_COLOR",
  MOVE_SELECTED_ELEMENT = "MOVE_SLECTED_ELEMENT",
  CHANDE_SCALE_SELECTED_ELEMENTS = "CHANDE_SCALE_SELECTED_ELEMENTS",
  DELETE_SELECTED_ELEMENT = "DELETE_SELECTED_ELEMENT",
}

export enum ListOfSelectedActionEnum {
  ADD_SELECTED_ELEMENT = "ADD_SELECTED_ELEMENT",
  ADD_SELECTED_SLIDE = "ADD_SELECTED_SLIDE",
  INIT_SELECTED = "INIT_SELECTED",
}

export enum HistoryActionEnum {
  UNDO = "UNDO",
  REDO = "REDO",
}
