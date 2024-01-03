import {
  GeneralElementType,
  ListOfSelectedType,
  PresentationType,
} from "../ts/types/types";

type EltFeaturesProps = {
  presentation: PresentationType;
  setPresentation: (presentation: PresentationType) => void;
  setSelected: (selected: ListOfSelectedType) => void;
  elt: GeneralElementType;
};

function EltFeatures(props: EltFeaturesProps) {
  const { presentation, setPresentation, elt, setSelected } = props;
  const slides = presentation.ListOfSlides;
  const currentSlide = slides.find(
    (slide) => "slide" + slide.ID === presentation.CurentSlide,
  );
  const findEltById = () => {
    return currentSlide?.ListOfElements.find(
      (element) => element.ID === elt.ID,
    );
  };
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
          value={elt.Position.X}
          onChange={(event) => {
            const element = findEltById();
            if (element === undefined) {
              return;
            }
            element.Position.X = Number(event.target.value);
            setPresentation({
              ...presentation,
              ListOfSlides: slides,
            });
          }}
        ></input>
        <input
          style={{ width: "40%" }}
          type="number"
          value={elt.Position.Y}
          onChange={(event) => {
            const element = findEltById();
            if (element === undefined) {
              return;
            }
            element.Position.Y = Number(event.target.value);
            setPresentation({
              ...presentation,
              ListOfSlides: slides,
            });
          }}
        ></input>
      </div>
      <div>
        <p style={{ color: "white" }}>Scale:</p>
        <input
          style={{ width: "40%" }}
          type="number"
          value={elt.Scale.Wigth}
          onChange={(event) => {
            const element = findEltById();
            if (element === undefined) {
              return;
            }
            element.Scale.Wigth = Number(event.target.value);

            setPresentation({
              ...presentation,
              ListOfSlides: slides,
            });
          }}
        ></input>
        <input
          style={{ width: "40%" }}
          type="number"
          value={elt.Scale.Height}
          onChange={(event) => {
            const element = findEltById();
            if (element === undefined) {
              return;
            }
            element.Scale.Height = Number(event.target.value);

            setPresentation({
              ...presentation,
              ListOfSlides: slides,
            });
          }}
        ></input>
      </div>
      {elt.Type === "image" ? (
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
                  const element = findEltById();
                  if (element === undefined || element.Type !== "image") {
                    return;
                  }
                  element.Src = e.target?.result as string;
                  setPresentation({
                    ...presentation,
                    ListOfSlides: slides,
                  });
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
      {elt.Type === "text" ? (
        <div>
          <p style={{ color: "white" }}>Font:</p>
          <input
            style={{ width: "20%" }}
            type="text"
            value={elt.Font.FontFamily}
            onChange={(event) => {
              const element = findEltById();
              if (element === undefined || element.Type !== "text") {
                return;
              }
              element.Font.FontFamily = event.target.value;
              setPresentation({
                ...presentation,
                ListOfSlides: slides,
              });
            }}
          ></input>
          <input
            style={{ width: "20%" }}
            type="number"
            value={elt.Font.FontSize}
            onChange={(event) => {
              const element = findEltById();
              if (element === undefined || element.Type !== "text") {
                return;
              }
              element.Font.FontSize = Number(event.target.value);
              setPresentation({
                ...presentation,
                ListOfSlides: slides,
              });
            }}
          ></input>
          <select
            style={{ width: "20%" }}
            value={elt.Font.FontStyle}
            onChange={(event) => {
              const element = findEltById();
              if (element === undefined || element.Type !== "text") {
                return;
              }
              element.Font.FontStyle = event.target.value;
              setPresentation({
                ...presentation,
                ListOfSlides: slides,
              });
            }}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="italic">Italic</option>
            <option value="underline">Underline</option>
            <option value="line-through">ine-through</option>
          </select>
          <input
            style={{ width: "20%" }}
            type="text"
            value={elt.Font.Color}
            onChange={(event) => {
              const element = findEltById();
              if (element === undefined || element.Type !== "text") {
                return;
              }
              element.Font.Color = event.target.value;
              setPresentation({
                ...presentation,
                ListOfSlides: slides,
              });
            }}
          ></input>
        </div>
      ) : null}
      <button
        style={{ width: "30%" }}
        onClick={() => {
          const element = findEltById();
          if (element === undefined) {
            return;
          }
          const eltPos = currentSlide?.ListOfElements.indexOf(element);
          if (eltPos === undefined) {
            return;
          }
          currentSlide?.ListOfElements.splice(eltPos, 1);
          setPresentation({
            ...presentation,
            ListOfSlides: slides,
          });
          setSelected({
            Elements: [],
            Slides: [],
          });
        }}
      >
        Remove
      </button>
    </div>
  );
}

export { EltFeatures };
