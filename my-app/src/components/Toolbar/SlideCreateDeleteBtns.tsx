import { useAppActions } from "../../Redux/Actions";
import { newSlide } from "../../data/SlidesCreator";

function SlideCreateBtn() {
  const { addSlideAction } = useAppActions();
  return (
    <button onClick={() => addSlideAction(newSlide())}>Add new slide</button>
  );
}

function SlideDeleteBtn() {
  const { deleteSelectedSlides } = useAppActions();
  return <button onClick={() => deleteSelectedSlides()}>Delete slide</button>;
}

function SlideCreateAndDeleteBtns() {
  return (
    <div style={{ position: "absolute", bottom: "1%", left: "1%" }}>
      <SlideCreateBtn />
      <SlideDeleteBtn />
    </div>
  );
}

export { SlideCreateAndDeleteBtns };
