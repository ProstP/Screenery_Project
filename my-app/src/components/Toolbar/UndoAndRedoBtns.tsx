import { useAppActions } from "../../Redux/Actions";
import undoIcon from "../../img/undo_button.png";
import redoIcon from "../../img/redo_button.png";

function UndoBtn() {
  const { addSlideAction } = useAppActions();
  return (
    <button 
      style={{
        zIndex: "2",
        width: "25%",
        height: "35%",
        backgroundImage: "linear-gradient(#008170, #006658)",
        borderStyle: "none",
        borderRadius: "5px",
        alignSelf: "center",

        boxShadow: "0 2px 2px 0 rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.19)",
      }}

      /*onClick={() => addSlideAction(newSlide())}  TODO: Добавить функцию отмены действия*/ 
      >
        <img 
          src={undoIcon} 
          style={{
            width: "100%", 
            height: "100%", 
          }}
        />
    </button>
  );
}

function RedoBtn() {
  const { deleteSelectedSlides } = useAppActions();
  return (
  <button 
    style={{
      zIndex: "2",
      width: "25%",
      height: "35%",
      backgroundImage: "linear-gradient(#008170, #006658)",
      borderStyle: "none",
      borderRadius: "5px",
      alignSelf: "center",

      boxShadow: "0 2px 2px 0 rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.19)",
    }}

    /*onClick={() => addSlideAction(newSlide())}  TODO: Добавить функцию отмены отмены действия*/ 
    >
      <img 
        src={redoIcon} 
        style={{
          width: "100%", 
          height: "100%", 
        }}
      />
    </button>
  );
}

function UndoAndRedoBtns() {
  return (
    <div style={{ 
      position: "absolute", 
      top: "0.5%", 
      right: "1.5%", 
      height: "8%", 
      width: "6%", 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "space-around",
      alignContent: "center"
      }}>
      <UndoBtn />
      <RedoBtn />
    </div>
  );
}

export { UndoAndRedoBtns };
