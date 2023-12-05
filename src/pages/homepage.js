import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { getTopSongs, search } from "../data/getSongs";

export default function Homepage() {
    let [topSongs, setTopSongs] = useState([])
    let [artistFeature, setArtistFeature] = useState([])

    useEffect(() => {
        async function getData() {
            setTopSongs(await getTopSongs());
            setArtistFeature(await search(`artist:"Henzoid"`))
        }
        getData();
    }, [])

    return (
        <>
            <h2 className="top_chart">Top Songs</h2>
            <Carousel list="songs" items={topSongs}/>
            <h2 className="top_chart">Top Albums</h2>
            <Carousel list="albums" items={artistFeature}/>
        </>
    )
}