import { PresentationType } from "./Presentation";

type HistoryOfActionsType = {
  RedoActions: string[];
  UndoActions: string[];
};

function addHistory(history: HistoryOfActionsType, newState: PresentationType) {
  history.UndoActions.push(JSON.stringify(newState));
  history.RedoActions = [];
  return history;
}

export type { HistoryOfActionsType };
export { addHistory };
