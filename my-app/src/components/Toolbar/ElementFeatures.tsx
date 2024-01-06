import { useAppActions } from "../../Redux/Actions";
import { GeneralElementType } from "../../model/Element";

type EelementFeaturesProps = {
  Elt: GeneralElementType | undefined;
};

function EelementFeatures(props: EelementFeaturesProps) {
  const { Elt } = props;
  if (Elt === undefined) {
    return null;
  }
  const {
    moveSelectedElement,
    changeScaleSelectedElements,
    setNewImage,
    setNewFont,
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
            moveSelectedElement(Number(event.target.value) - Elt.Position.X, 0)
          }
        ></input>
        <input
          style={{ width: "40%" }}
          type="number"
          value={Elt.Position.Y}
          onChange={(event) =>
            moveSelectedElement(0, Number(event.target.value) - Elt.Position.Y)
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
            changeScaleSelectedElements(
              Number(event.target.value) - Elt.Scale.Wigth,
              0,
            )
          }
        ></input>
        <input
          style={{ width: "40%" }}
          type="number"
          value={Elt.Scale.Height}
          onChange={(event) =>
            changeScaleSelectedElements(
              0,
              Number(event.target.value) - Elt.Scale.Height,
            )
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
          <select
            style={{ width: "20%" }}
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
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="italic">Italic</option>
            <option value="underline">Underline</option>
            <option value="line-through">Line-through</option>
          </select>
          <input
            style={{ width: "20%" }}
            type="color"
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
    </div>
  );
}

export { EelementFeatures };
