import { useAppActions } from "../Actions/Actions";
import { GeneralElementType } from "../ts/types/types";

type EltFeaturesProps = {
  Elt: GeneralElementType;
};

function EltFeatures(props: EltFeaturesProps) {
  const { Elt } = props;
  const {
    moveElement,
    changeScale,
    setNewImage,
    setNewFont,
    deleteElement,
    initSelected,
  } = useAppActions();
  return (
    <div
      style={{
        position: "absolute",
        zIndex: "2",
        top: "1%",
        left: "57%",
        display: "flex",
        alignItems: "center",
        width: "37%",
      }}
    >
      <div>
        <p style={{ color: "white" }}>Position:</p>
        <input
          style={{ width: "40%" }}
          type="number"
          value={Elt.Position.X}
          onChange={(event) =>
            moveElement(Number(event.target.value) - Elt.Position.X, 0, [
              "elt" + Elt.ID,
            ])
          }
        ></input>
        <input
          style={{ width: "40%" }}
          type="number"
          value={Elt.Position.Y}
          onChange={(event) =>
            moveElement(0, Number(event.target.value) - Elt.Position.Y, [
              "elt" + Elt.ID,
            ])
          }
        ></input>
      </div>
      <div>
        <p style={{ color: "white" }}>Scale:</p>
        <input
          style={{ width: "40%" }}
          type="number"
          value={Elt.Scale.Wigth}
          onChange={(event) =>
            changeScale(Elt.ID, Number(event.target.value), Elt.Scale.Height)
          }
        ></input>
        <input
          style={{ width: "40%" }}
          type="number"
          value={Elt.Scale.Height}
          onChange={(event) =>
            changeScale(Elt.ID, Elt.Scale.Wigth, Number(event.target.value))
          }
        ></input>
      </div>
      {Elt.Type === "image" ? (
        <div>
          <input
            id="changeSrc"
            type="file"
            style={{ visibility: "hidden", position: "absolute" }}
            onChange={(event) => {
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
                  setNewImage(Elt.ID, e.target!.result as string);
                } catch (error) {
                  console.error(error);
                }
              };
              reader.readAsDataURL(file);
            }}
          ></input>
          <button
            style={{ width: "100%" }}
            onClick={() => document.getElementById("changeSrc")?.click()}
          >
            Select Image
          </button>
        </div>
      ) : null}
      {Elt.Type === "text" ? (
        <div>
          <p style={{ color: "white" }}>Font:</p>
          <input
            style={{ width: "20%" }}
            type="text"
            value={Elt.Font.FontFamily}
            onChange={(event) => {
              setNewFont(
                Elt.ID,
                event.target.value,
                Elt.Font.FontStyle,
                Elt.Font.FontSize,
                Elt.Font.Color,
              );
            }}
          ></input>
          <input
            style={{ width: "20%" }}
            type="number"
            value={Elt.Font.FontSize}
            onChange={(event) => {
              setNewFont(
                Elt.ID,
                Elt.Font.FontFamily,
                Elt.Font.FontStyle,
                Number(event.target.value),
                Elt.Font.Color,
              );
            }}
          ></input>
          <input
            style={{ width: "20%" }}
            type="text"
            value={Elt.Font.FontStyle}
            onChange={(event) => {
              setNewFont(
                Elt.ID,
                Elt.Font.FontFamily,
                event.target.value,
                Elt.Font.FontSize,
                Elt.Font.Color,
              );
            }}
          ></input>
          <input
            style={{ width: "20%" }}
            type="text"
            value={Elt.Font.Color}
            onChange={(event) => {
              setNewFont(
                Elt.ID,
                Elt.Font.FontFamily,
                Elt.Font.FontStyle,
                Elt.Font.FontSize,
                event.target.value,
              );
            }}
          ></input>
        </div>
      ) : null}
      <button
        style={{ width: "30%" }}
        onClick={() => {
          deleteElement(Elt.ID);
          initSelected();
        }}
      >
        Remove
      </button>
    </div>
  );
}

export { EltFeatures };
