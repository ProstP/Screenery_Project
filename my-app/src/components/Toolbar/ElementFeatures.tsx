import { useAppActions } from "../../Redux/Actions";
import { GeneralElementType } from "../../model/Element";
import uploadIcon from "../../img/upload_image_button.png";

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
    setNewColor,
  } = useAppActions();
  return (
    <div
      style={{
        position: "absolute",
        zIndex: "2",
        top: "2%",
        left: "56.5%",
        display: "flex",
        alignItems: "center",
        width: "35%",
        height: "7%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "16%" }}>
        <p style={{ color: "white", fontSize: "14px"}}>Position:</p>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "100%" }}>
          <p style={{ color: "white", fontSize: "14px", width: "15%"}}>X:</p>
          <input
            style={{ 
              width: "70%",
              borderLeft: "3px solid #008170",
              borderBottom: "3px solid #008170",
              borderTop: "none",
              borderRight: "none",
              background: "#0F0F0F",
              color: "#FFFFFF",
              borderRadius: "3px",
              marginBottom: "2%",
              textAlign: "center"
            }}
            type="number"
            value={Elt.Position.X}
            onChange={(event) =>
              moveSelectedElement(Number(event.target.value) - Elt.Position.X, 0)
            }
          ></input>
        </div>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "100%" }}>
          <p style={{ color: "white", fontSize: "14px", width: "15%"}}>Y:</p>
          <input
            style={{ 
              width: "70%",
              borderLeft: "3px solid #008170",
              borderBottom: "3px solid #008170",
              borderTop: "none",
              borderRight: "none",
              background: "#0F0F0F",
              color: "#FFFFFF",
              borderRadius: "3px",
              textAlign: "center"
            }}
            type="number"
            value={Elt.Position.Y}
            onChange={(event) =>
              moveSelectedElement(0, Number(event.target.value) - Elt.Position.Y)
            }
          ></input>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "16%"}}>
        <p style={{ color: "white", fontSize: "14px" }}>Size:</p>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "100%" }}>
          <p style={{ color: "white", fontSize: "14px", width: "15%"}}>X:</p>
          <input
            style={{ 
              width: "70%",
              borderLeft: "3px solid #008170",
              borderBottom: "3px solid #008170",
              borderTop: "none",
              borderRight: "none",
              background: "#0F0F0F",
              color: "#FFFFFF",
              borderRadius: "3px",
              marginBottom: "2%",
              textAlign: "center"
            }}
            type="number"
            value={Elt.Scale.Wigth}
            onChange={(event) =>
              changeScaleSelectedElements(
                Number(event.target.value) - Elt.Scale.Wigth,
                0,
              )
            }
          ></input>
        </div>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "100%" }}>
          <p style={{ color: "white", fontSize: "14px", width: "15%" }}>Y:</p>
          <input
            style={{ 
              width: "70%",
              borderLeft: "3px solid #008170",
              borderBottom: "3px solid #008170",
              borderTop: "none",
              borderRight: "none",
              background: "#0F0F0F",
              color: "#FFFFFF",
              borderRadius: "3px",
              textAlign: "center"
            }}
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
      </div>

      {Elt.Type === "image" ? (
        <div 
          style={{ 
            position: "absolute",
            top: "15%",
            left: "28%",
            width: "20%",
            height: "100%",
            display: "flex", 
            justifyContent: "space-around",
            alignContent: "center"
          }}>
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
            style={{
              zIndex: "2",
              width: "45%", 
              height: "54.25%", 
              backgroundImage: "linear-gradient(#008170, #006658)",
              borderStyle: "none",
              borderRadius: "5px",
      
              boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
            }}
            onClick={() => document.getElementById("changeSrc")?.click()}
          >
            <img 
              src={uploadIcon} 
              style={{
                width: "100%", 
                height: "100%", 
              }}
            />
          </button>
        </div>
      ) : null}

      {Elt.Type === "text" ? (
        <div style={{ display: "flex", flexDirection: "row", width: "60%", height: "90%" }}>
          <input
              style={{
                position: "relative",
                zIndex: "2",
                top: "10.5%",
                width: "15%",
                height: "61.5%",
                backgroundImage: "linear-gradient(#008170, #006658)",
                borderStyle: "none",
                borderRadius: "5px",
                left: "2.5%",
    
                boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
              }}
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

          <div 
            style={{ 
              position: "relative", 
              left: "9%", 
              width: "70%", 
              display: "flex", 
              flexDirection: "column",
              alignContent: "center"
            }}
            >
            <p style={{ color: "white", fontSize: "14px", textAlign: "center" }}>Font:</p>
            <div style={{ display: "flex", alignContent: "center", width: "100%", justifyContent: "space-between" }}>
              <input
                style={{ 
                  width: "30%",
                  borderLeft: "3px solid #008170",
                  borderBottom: "3px solid #008170",
                  borderTop: "none",
                  borderRight: "none",
                  background: "#0F0F0F",
                  color: "#FFFFFF",
                  borderRadius: "3px",
                  textAlign: "center",
                }}
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
                style={{ 
                  width: "30%",
                  borderLeft: "3px solid #008170",
                  borderBottom: "3px solid #008170",
                  borderTop: "none",
                  borderRight: "none",
                  background: "#0F0F0F",
                  color: "#FFFFFF",
                  borderRadius: "3px",
                  textAlign: "center",
                }}
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
                style={{ 
                  width: "30%",
                  borderLeft: "3px solid #008170",
                  borderBottom: "3px solid #008170",
                  borderTop: "none",
                  borderRight: "none",
                  background: "#0F0F0F",
                  color: "#FFFFFF",
                  borderRadius: "3px",
                  textAlign: "center",
                }}
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
            </div>
          </div>
        </div>
      ) : null}

      {Elt.Type === "graphic" ? (
        <div style={{ width: "15%", height: "100%"}}>
          <input
            type="color"
            style={{
              position: "relative",
              zIndex: "2",
              top: "14.5%",
              width: "60%",
              height: "55%",
              backgroundImage: "linear-gradient(#008170, #006658)",
              borderStyle: "none",
              borderRadius: "5px",
              left: "10%",
  
              boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
            }}
            value={Elt.Color}
            onChange={(event) => setNewColor(Elt.ID, event.target.value)}
          ></input>
        </div>
      ) : null}
    </div>
  );
}

export { EelementFeatures };
