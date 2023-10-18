import React from "react"
import { PresentationType } from "../ts/types/types"

function RenderSlides(presentation: PresentationType)
{
    return (
        <div className="List-of-slides">
            <ul>
                {presentation.ListOfSlides.map((slide) => (
                    <li>{(slide.ID == presentation.CurentSlide) ? 
                    <p className="List-of-slides__slide List-of-slides__slide_current">{slide.ID}</p> : 
                    <p className="List-of-slides__slide">{slide.ID}</p>
                    }</li>
                ))}
            </ul>
        </div>
    )
}

export default RenderSlides;