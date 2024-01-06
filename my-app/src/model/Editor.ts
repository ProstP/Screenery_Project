import { HistoryOfActionsType } from "./History";
import { PresentationType } from "./Presentation";
import { ListOfSelectedType } from "./Selected";

type EditorType = {
  Presentation: PresentationType;
  ListOfSelected: ListOfSelectedType;
  History: HistoryOfActionsType;
};
export type { EditorType };
