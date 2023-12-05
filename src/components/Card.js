import { Heart, Play } from "react-feather";
import { Player } from "./Player";

export default function Card({item, id}) {

    const play = (e) => {
        Player.loadSong(item)
    }

    return (
        <div id={id} className="card">
            <img className="background" src={item.cover_art}></img>
            <div className="content">
                <img className="art" src={item.cover_art}></img>
                <h4>{item.title}</h4>
                <button className="play_button" onClick={(e) => play(e)}><Play /></button>
                <button className="heart_button" onClick={(e) => play(e)}><Heart /></button>
            </div>
        </div>
    )
}