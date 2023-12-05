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
    const getData = async () => {
        setSongs(await getUserLibrary(token))
    }

    useEffect(() => {
        getData();
    }, [songs])

    const onUpdate = (update) => {
        if(update === "unsave") {
            getData();
        }
    }

    return (
        <>
            <Menu currentPage={"library"}/>
            <h2 className="top_chart">Your Library</h2>
            <ContentGrid content={songs} callback={onUpdate}/>
        </>
    )
}