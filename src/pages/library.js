import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import ContentGrid from "../components/ContentGrid";
import Menu from "../components/Menu";
import { getUserLibrary } from "../data/getSongs";

export default function Library() {
    const [songs, setSongs] = useState([])

    const token = sessionStorage.getItem("jwt")
    const navigate = useNavigate();

    if(!token) {
        navigate("/login")
    } 

    useEffect(() => {
        async function getData() {
            setSongs(await getUserLibrary(token))
        }
        getData();
    }, [])

    return (
        <>
            <Menu currentPage={"library"}/>
            <h2 className="top_chart">Your Library</h2>
            <ContentGrid content={songs}/>
        </>
    )
}