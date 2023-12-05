import { useEffect, useState } from "react";
import { Heart, Play } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { getLibraryId, isSongSaved, saveSong, unsaveSong } from "../data/accounts";
import { Player } from "./Player";

export default function Card({item, id, callback}) {
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("jwt")

        if(!token) return;

        async function checkSaved() {
            setSaved(await isSongSaved(item.deezer_id, token));
        }
        checkSaved();
    }, [saved])

    const play = (e) => {
        if(document.querySelector('.playing')) {
            document.querySelector('.playing').className = document.querySelector('.playing').className.replace(" playing", "")
        }
        e.currentTarget.parentNode.parentNode.className += " playing"
        Player.loadSong(item)
    }

    const save = () => {
        const token = sessionStorage.getItem("jwt")

        if(!token) {
            navigate('/login')
        }

        saveSong(token, item.deezer_id)
        setSaved(true)
        if(callback) {
            callback("save");
        }
    }

    const unsave = async () => {
        const token = sessionStorage.getItem("jwt")

        if(!token) {
            navigate('/login')
        }

        if(item.library_id) {
            unsaveSong(item.library_id, token);
        } else {
            unsaveSong(await getLibraryId(token, item.deezer_id), token)
        }
        setSaved(false)
        if(callback) {
            callback("unsave");
        }
    }

    return (
        <div id={id} className="card">
            <img className="background" src={item.cover_art}></img>
            <div className="content">
                <img className="art" src={item.cover_art}></img>
                <h4>{item.title}</h4>
                <Link to={`/artist/${item.artist}`}>{item.artist}</Link>
                <button className="play_button" onClick={(e) => play(e)}><Play /></button>
                {(saved) ? <button className="heart_button saved" onClick={unsave}><Heart /></button> : <button className="heart_button" onClick={(e) => save(e)}><Heart /></button>}
            </div>
        </div>
    )
}