import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { getTopSongs } from "../data/getSongs";

export default function Homepage() {
    let [topSongs, setTopSongs] = useState([])

    useEffect(() => {
        async function getData() {
            setTopSongs(await getTopSongs());
        }
        getData();
    }, [])

    return (
        <>
            <h2 className="top_chart">Top Songs</h2>
            <Carousel items={topSongs}/>
        </>
    )
}