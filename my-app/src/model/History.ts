import { PresentationType } from "./Presentation";

type HistoryOfActionsType = {
  RedoActions: PresentationType[];
  UndoActions: PresentationType[];
};

export type { HistoryOfActionsType };
