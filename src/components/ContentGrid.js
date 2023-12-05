import Card from "./Card"

export default function ContentGrid({content}) {
    return (
        <div className="content_grid">
            {content.map((c, idx) => {
                return <Card key={idx} item={c} id={idx} />
            })}
        </div>
    )
}