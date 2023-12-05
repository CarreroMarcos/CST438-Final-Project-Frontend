import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import ListenAgain from "../components/ListenAgain";
import Menu from "../components/Menu";
import { featuredArtists } from "../data/featuredArtists";
import { getTopSongs, search } from "../data/getSongs";

export default function Homepage() {
    const [topSongs, setTopSongs] = useState([])
    const [artistFeature, setArtistFeature] = useState([])
    const [featuredArtist, setFeaturedArtist] = useState(Math.floor(Math.random() * featuredArtists.length))
    const token = sessionStorage.getItem('jwt');

    useEffect(() => {
        async function getData() {
            setTopSongs(await getTopSongs());
            setArtistFeature(await search(`artist:"${featuredArtists[featuredArtist]}"`))
        }
        getData();
    }, [])

    return (
        <>
            <Menu currentPage={"home"}/>
            {(token) ? <ListenAgain /> : false}
            <h2 className="top_chart">Top Songs</h2>
            <Carousel list="songs" items={topSongs}/>
            <h2 className="top_chart">Featured Artist: {featuredArtists[featuredArtist]}</h2>
            <Carousel list="albums" items={artistFeature}/>
            <div className="page_bumper"></div>
        </>
    )
}