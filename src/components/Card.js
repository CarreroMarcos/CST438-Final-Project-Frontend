export default function Card({item, id}) {
    let image;
    if(item.album) {
        image = item.album.cover_medium;
    } else {
        image = item.cover_medium;
    }
    return (
        <div id={id} className="card">
            <img src={image}></img>
            <h4>{item.title}</h4>
        </div>
    )
}