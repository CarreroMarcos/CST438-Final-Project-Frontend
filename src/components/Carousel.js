import Card from "./Card"
import { useState } from "react";

export default function Carousel({items, list}) {
    const [slide, setSlide] = useState(0)

    const navLeft = (e) => {
        e.preventDefault();
        let element
        if(slide === 4) {
            element = document.querySelector(`#${list}_0`)
            setSlide(0)
        } else {
            element = document.querySelector(`#${list}_0`)
            setSlide(0)
        }
        document.querySelector(`#${list}`).scrollTo({
            left: element.getBoundingClientRect().left,
            behavior: "smooth"
        })
    }

    const navRight = (e) => {
        e.preventDefault();
        let element
        if(slide === 0) {
            element = document.querySelector(`#${list}_4`)
            setSlide(4)
        } else {
            element = document.querySelector(`#${list}_4`)
            setSlide(4)
        }
        console.log(element)
        document.querySelector(`#${list}`).scrollTo({
            left: element.getBoundingClientRect().left,
            behavior: "smooth"
        })
    }

    return (
        <div className='carousel'>
            <img className="nav_arrow left" onClick={(e) => {navLeft(e)}} src="/chev-left.svg"></img>
            <img className="nav_arrow right" onClick={(e) => {navRight(e)}} src="/chev-right.svg"></img>
            <div id={list} className="scroll_window">
                {items.map((item, idx) => {
                    return (<Card id={`${list}_${idx}`} key={idx} item={item} />)
                })}
            </div>
        </div>
    )
}