import Card from "./Card"

export default function ContentGrid({content, callback}) {
    return (
        <div className="content_grid">
            {content.map((c, idx) => {
                return <Card key={idx} item={c} id={idx} callback={callback} />
            })}
        </div>
    )
}