import { Filter } from "react-feather"
import ContentGrid from "../components/ContentGrid"
import { useEffect, useState } from "react"
import { getTopSongs } from "../data/getSongs"

export default function SearchPage() {
    const [content, setContent] = useState([])

    useEffect(() => {
        const getContent = async () => {
            setContent(await getTopSongs());
        }
        getContent();
    }, [content])

    return (
        <>
            <div className="search_and_filter">
                <div className="search_stack">
                    <input type="text" placeholder="Search" className="search"></input>
                    <button className="secondary_button"><Filter /></button>
                </div>
            </div>
            <ContentGrid content={content} />
        </>
    )
}