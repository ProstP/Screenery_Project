import { useAppActions } from "../../Redux/Actions";

function DeleteElementsBtn() {
  const { deleteSelectedElement, initSelected } = useAppActions();
  return (
    <button
      style={{
        position: "absolute",
        zIndex: "2",
        top: "3.5%",
        right: "4%",
        width: "4%",
      }}
      onClick={() => {
        deleteSelectedElement();
        initSelected();
      }}
    >
      Remove
    </button>
  );
}

export { DeleteElementsBtn };
