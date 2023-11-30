import { useEffect, useState } from "react";
import { getUserLibrary } from "../data/getSongs";
import Card from "./Card";

export default function ListenAgain() {
    const [song, setSong] = useState({})
    const token = sessionStorage.getItem('jwt');

    useEffect(() => {
        async function getData() {
            let library = await getUserLibrary(token)
            setSong(library[Math.floor(Math.random() * library.length)])
        }
        getData();
    }, [])

    if(!token || !song || !song.cover_art) {
        return (<></>);
    }


    return (
        <div className="listen_again">
            <div>
                <h2 className="top_chart">Listen Again</h2>
                <Card item={song} id={"listen_again"}/>
            </div>
        </div>
    )
}