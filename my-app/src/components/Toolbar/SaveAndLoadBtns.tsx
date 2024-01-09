import { useAppActions } from "../../Redux/Actions";
import { PresentationType } from "../../model/Presentation";
import Styles from "./SaveAndLoadBtns.module.css";

type SaveAndLoadBtnsProps = { Presentation: PresentationType };

function SaveBtn(props: SaveAndLoadBtnsProps) {
  const { Presentation } = props;
  return (
    <button
      className={Styles.btn}
      onClick={() => {
        const jsonData = JSON.stringify(Presentation);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${Presentation.Name}.json`;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
        return;
      }}
    >
      Save
    </button>
  );
}

function LoadBtn() {
  const { setPresentation } = useAppActions();
  const LoadFromJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        const data: PresentationType = JSON.parse(jsonData);
        setPresentation(data);
      } catch (error) {
        console.error(error);
      }
    };
    reader.readAsText(file);
  };
  return (
    <div>
      <input
        id="input"
        className={Styles.inputload}
        type="file"
        onChange={LoadFromJSON}
      ></input>
      <button
        className={Styles.btn}
        onClick={() => document.getElementById("input")?.click()}
      >
        Load
      </button>
    </div>
  );
}

function ExportBtn(props: SaveAndLoadBtnsProps) {
  const { Presentation } = props;
  return (
    <button
      className={Styles.btn}
      onClick={() => {
        const jsonData = JSON.stringify(Presentation);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${Presentation.Name}.json`;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
        return;
      }}
    >
      Export
    </button>
  );
}

function SaveAndLoadBtns(props: SaveAndLoadBtnsProps) {
  const { Presentation } = props;
  return (
    <div>
      <button className={Styles.openmenubtn}>File</button>
      <div className={Styles.blockwithbtn}>
        <SaveBtn Presentation={Presentation} />
        <ExportBtn Presentation={Presentation} />
        <LoadBtn />
      </div>
    </div>
  );
}
export { SaveAndLoadBtns };
