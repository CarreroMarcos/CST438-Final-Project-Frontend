import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSongBy } from "../data/getSongs";

export default function SongPage() {
    let { id } = useParams();
    const [song, setSong] = useState({})

    useEffect(() => {
        const getSong = async () => {
            setSong(await getSongBy(id))
        }
        getSong();
    }, [])
    
    return (
        <>
            <h4>{song.title}</h4>
        </>
    )
}