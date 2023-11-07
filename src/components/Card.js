export default function Card({item}) {
    let image;
    if(item.album) {
        image = item.ablum.picture_medium;
    } else {
        image = item.picture_medium;
    }
    return (
        <div className="card">
            <img src={image}></img>
            <h4>{item.title}</h4>
        </div>
    )
}