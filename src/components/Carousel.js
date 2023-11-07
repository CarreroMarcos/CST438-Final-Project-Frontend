import Card from "./Card"

export default function Carousel({items}) {

    return (
        <div className='carousel'>
            <img className="nav_arrow left" src="/chev-left.svg"></img>
            <img className="nav_arrow right" src="/chev-right.svg"></img>
            <div className="scroll_window">
                {items.map((item, idx) => {
                    return (<Card key={idx} item={item} />)
                })}
            </div>
        </div>
    )
}