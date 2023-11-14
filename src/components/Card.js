export default function Card({item, id}) {
    let image;
    if(item.album) {
        image = item.album.cover_medium;
    } else {
        image = item.cover_medium;
    }

    const play = (e) => {
        e.currentTarget.parentElement.parentElement.parentElement.querySelectorAll(".audio").forEach((audio) => {
            audio.pause()
        })
        e.currentTarget.parentElement.querySelector(`#play_${id}`).play();
    }

    return (
        <div id={id} className="card">
            <img className="background" src={image}></img>
            <div className="content">
                <img className="art" src={image}></img>
                <h4>{item.title}</h4>
                <button className="play_button" onClick={(e) => play(e)}>Play</button>
                <audio id={`play_${id}`} className="audio">
                    <source src={item.preview} type="audio/mpeg"/>    
                </audio>
            </div>
        </div>
    )
}