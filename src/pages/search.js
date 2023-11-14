import { Filter } from "react-feather"
import ContentGrid from "../components/ContentGrid"
import { useEffect, useState } from "react"
import { getRandomWord, getTopSongs, search } from "../data/getSongs"

export default function SearchPage() {
    const [content, setContent] = useState([])
    const [searchQ, setSearchQ] = useState("")
    const [searching, setSearching] = useState(false)

    useEffect(() => {
        const getContent = async () => {
            let query
            if(searchQ.length < 1) {
                query = await getRandomWord()
                setSearchQ(query)
            } else {
                query = searchQ
            }

            setContent(await search(query));
        }
        getContent();
    }, [searching])

    return (
        <>
            <div className="search_and_filter">
                <div className="search_stack">
                    <input type="text" placeholder={searchQ} className="search" onChange={(e) => {setSearchQ(e.target.value); setSearching(!searching)}}></input>
                    <button className="secondary_button"><Filter /></button>
                </div>
            </div>
            <ContentGrid content={content} />
        </>
    )
}