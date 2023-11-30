import { useEffect, useState } from "react";
import { Heart, Play } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { getLibraryId, isSongSaved, saveSong, unsaveSong } from "../data/accounts";
import { Player } from "./Player";

export default function Card({item, id}) {
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("jwt")

        if(!token) return;

        async function checkSaved() {
            setSaved(await isSongSaved(item.deezer_id));
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
    }

    const unsave = async () => {
        const token = sessionStorage.getItem("jwt")

        if(!token) {
            navigate('/login')
        }

        if(item.library_id) {
            unsaveSong(item.library_id);
        } else {
            unsaveSong(await getLibraryId(item.deezer_id))
        }
        setSaved(false)
        navigate("#")
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