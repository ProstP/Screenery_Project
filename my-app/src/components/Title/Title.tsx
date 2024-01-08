import { useAppActions } from "../../Redux/Actions";
import Styles from "./Title.module.css";

type TitlePops = {
  Title: string;
};

function Title(props: TitlePops) {
  const { Title } = props;
  const { changePresentationTitle } = useAppActions();
  return (
    <input
      className={Styles.name}
      type="text"
      value={Title}
      onChange={(event) => {
        changePresentationTitle(event.target.value);
      }}
    ></input>
  );
}

export { Title };
