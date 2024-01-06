import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCreator from "./ActionCreator";

export const useAppActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...ActionCreator }, dispatch);
};
