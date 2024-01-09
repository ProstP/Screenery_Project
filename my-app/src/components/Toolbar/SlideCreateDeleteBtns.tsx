import { useAppActions } from "../../Redux/Actions";
import { newSlide } from "../../data/SlidesCreator";
import createSlideIcon from "../../img/create_slide_button.png";
import deleteSlideIcon from "../../img/delete_slide_button.png";

function SlideCreateBtn() {
  const { addSlideAction } = useAppActions();
  return (
    <button 
      style={{
        zIndex: "2",
        width: "30%",
        height: "60%",
        backgroundImage: "linear-gradient(#008170, #006658)",
        borderStyle: "none",
        borderRadius: "5px",

        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
      }}

      onClick={() => addSlideAction(newSlide())}
      >
        <img 
          src={createSlideIcon} 
          style={{
            width: "100%", 
            height: "100%", 
          }}
        />
    </button>
  );
}

function SlideDeleteBtn() {
  const { deleteSelectedSlides } = useAppActions();
  return (
  <button 
    style={{
      zIndex: "2",
      width: "30%",
      height: "60%",
      backgroundImage: "linear-gradient(#008170, #006658)",
      borderStyle: "none",
      borderRadius: "5px",

      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    }}

    onClick={() => deleteSelectedSlides()}
    >
      <img 
        src={deleteSlideIcon} 
        style={{
          width: "100%", 
          height: "100%", 
        }}
      />
    </button>
  );
}

function SlideCreateAndDeleteBtns() {
  return (
    <div style={{ 
      position: "absolute", 
      bottom: "2.75%", 
      left: "3.1%", 
      height: "6%", 
      width: "10.5%", 
      display: "flex", 
      justifyContent: "space-around",
      alignContent: "center"
      }}>
      <SlideCreateBtn />
      <SlideDeleteBtn />
    </div>
  );
}

export { SlideCreateAndDeleteBtns };
