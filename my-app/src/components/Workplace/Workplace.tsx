import { SlideType } from "../../model/Slide";
import Styles from "./Workplace.module.css";
import { ElementsView } from "../ElementsView/ElementsView";

type WorkplaceProps = {
  Slide: SlideType;
  Selected: string[];
  isCtrlPressed: boolean;
};

function Workplace(props: WorkplaceProps) {
  const { Slide, Selected, isCtrlPressed } = props;
  return (
    <div
      id="workplace"
      className={Styles.workplace}
      style={{
        backgroundColor: Slide.Color,
        backgroundImage: `url(${Slide.Background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ElementsView
        Elements={Slide.ListOfElements}
        Selected={Selected}
        forWb={true}
        isCtrlPressed={isCtrlPressed}
      />
    </div>
  );
}

export { Workplace };
