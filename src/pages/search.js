import { Filter } from "react-feather"
import ContentGrid from "../components/ContentGrid"
import { useEffect, useState } from "react"
import { getRandomWord, getTopSongs, search } from "../data/getSongs"

export default function SearchPage() {
    const [content, setContent] = useState([])
    const [searchQ, setSearchQ] = useState("")
    const [searching, setSearching] = useState(false)
    let randomWord

    useEffect(() => {
        const getContent = async () => {
            randomWord = await getRandomWord()
            setContent(await search(randomWord));
            setSearchQ(randomWord)
        }
        getContent();
    }, [searching])

    return (
        <>
            <div className="search_and_filter">
                <div className="search_stack">
                    <input type="text" placeholder={searchQ} className="search"></input>
                    <button className="secondary_button"><Filter /></button>
                </div>
            </div>
            <ContentGrid content={content} />
        </>
    )
}