import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { getTopSongs, getTopAlbums } from "../data/getSongs";

export default function Homepage() {
    let [topSongs, setTopSongs] = useState([])
    let [topAlbums, setTopAlbums] = useState([])

    useEffect(() => {
        async function getData() {
            setTopSongs(await getTopSongs());
            setTopAlbums(await getTopAlbums())
        }
        getData();
    }, [])

    return (
        <>
            <h2 className="top_chart">Top Songs</h2>
            <Carousel list="songs" items={topSongs}/>
            <h2 className="top_chart">Top Albums</h2>
            <Carousel list="albums" items={topAlbums}/>
        </>
    )
}