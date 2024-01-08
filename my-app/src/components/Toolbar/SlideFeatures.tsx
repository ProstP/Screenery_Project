import { useAppActions } from "../../Redux/Actions";
import { SlideType } from "../../model/Slide";

type SlideFeaturesProps = {
  Slide: SlideType;
};

function SlideFeatures(props: SlideFeaturesProps) {
  const { changeSlideColor, changeBackground } = useAppActions();
  const { Slide } = props;
  return (
    <div style={{ position: "absolute", top: "1%", left: "45%", zIndex: 2 }}>
      <p style={{ color: "white" }}>Background</p>
      <input
        type="color"
        style={{ width: "20%" }}
        value={Slide.Color}
        onChange={(event) => changeSlideColor(event.target.value)}
      ></input>
      <input
        id="changeBack"
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
              changeBackground(e.target!.result as string);
            } catch (error) {
              console.error(error);
            }
          };
          reader.readAsDataURL(file);
        }}
      ></input>
      <button onClick={() => document.getElementById("changeBack")?.click()}>
        New background
      </button>
    </div>
  );
}

export { SlideFeatures };
