import React from "react";
import { ElementType } from "../ts/types/types";
import "./Elements.css";

function RenderElements(Elements: ElementType[]) {
  return (
    <div className="elements">
      {Elements.map((element) => (
        <p
          className="element"
          style={{
            top: element.Position.X + "%",
            left: element.Position.Y + "%",
          }}
        >
          {element.Type}
        </p>
      ))}
    </div>
  );
}

export default RenderElements;
