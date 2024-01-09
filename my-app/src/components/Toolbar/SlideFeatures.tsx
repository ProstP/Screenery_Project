import { useAppActions } from "../../Redux/Actions";
import { SlideType } from "../../model/Slide";
import newBgIcon from "../../img/upload_image_button.png";
import delBgIcon from "../../img/delete_image_button.png";

type SlideFeaturesProps = {
  Slide: SlideType;
};

function SlideFeatures(props: SlideFeaturesProps) {
  const { changeSlideColor, changeBackground } = useAppActions();
  const { Slide } = props;
  return (
    <div>
      <div 
        style={{ 
          position: "absolute", 
          top: "3%", 
          height: "7%",
          width: "12.5%",
          left: "17%", 
          display: "flex", 
          alignContent: "center", 
          justifyContent: "space-around"
          }}
        >
        <input
          type="color"
          value={Slide.Color}
          style={{
            zIndex: "2",
            width: "25%",
            height: "55%",
            backgroundImage: "linear-gradient(#008170, #006658)",
            borderStyle: "none",
            borderRadius: "5px",
            left: "10%",

            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
          }}
          onChange={(event) => changeSlideColor(event.target.value)}
        >
        </input>
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
        >
        </input>
        <button 
          style={{
            zIndex: "2",
            width: "25%",
            height: "55%",
            backgroundImage: "linear-gradient(#008170, #006658)",
            borderStyle: "none",
            borderRadius: "5px",

            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
          }}
          onClick={() => document.getElementById("changeBack")?.click()}
          >
          <img 
            src={newBgIcon} 
            style={{
              width: "100%", 
              height: "100%", 
            }}
          />
        </button>
        <button 
          style={{
            zIndex: "2",
            width: "25%",
            height: "55%",
            backgroundImage: "linear-gradient(#008170, #006658)",
            borderStyle: "none",
            borderRadius: "5px",

            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
          }}
          onClick={() => document.getElementById("changeBack")?.click()}
          >
          <img 
            src={delBgIcon} 
            style={{
              width: "100%", 
              height: "100%", 
            }}
          />
        </button>
      </div>
      <div
        style={{ 
          zIndex: "2",
          position: "absolute", 
          top: "1%", 
          height: "7%",
          width: "0.5%",
          left: "30%", 
          display: "flex", 
          alignContent: "center", 
          justifyContent: "space-around",
          backgroundImage: "linear-gradient(#008170, #006658)",
          borderStyle: "none",
          borderRadius: "5px",
          boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
          }}
      >
      </div>
    </div>
  );
}

export { SlideFeatures };
