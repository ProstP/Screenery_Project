import { useAppActions } from "../../Redux/Actions";
import icon from "../../img/trash_button.png";

function DeleteElementsBtn() {
  const { deleteSelectedElement, initSelected } = useAppActions();
  return (
    <button
      style={{
        position: "absolute",
        zIndex: "2",
        top: "3%",
        left: "53%",
        width: "3%",
        height: "3.85%",
        backgroundImage: "linear-gradient(#008170, #006658)",
        borderStyle: "none",
        borderRadius: "5px",

        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
      }}
      onClick={() => {
        deleteSelectedElement();
        initSelected();
      }}
    >
      <img 
        src={icon} 
        style={{
          width: "100%", 
          height: "100%", 
        }}
        />
    </button>
  );
}

export { DeleteElementsBtn };
