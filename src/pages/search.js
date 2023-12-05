import { ChevronLeft, ChevronRight, Filter } from "react-feather"
import ContentGrid from "../components/ContentGrid"
import { useEffect, useState } from "react"
import { getRandomWord, search } from "../data/getSongs"
import Menu from "../components/Menu"

export default function SearchPage() {
    const [content, setContent] = useState([])
    const [searchQ, setSearchQ] = useState("")
    const [searching, setSearching] = useState(false)
    const [page, setPage] = useState(0);

    useEffect(() => {
        const getContent = async () => {
            let query
            if(searchQ.length < 1) {
                query = await getRandomWord()
                setSearchQ(query)
            } else {
                query = searchQ + `&index=${page * 25}&limit=25`
            }

            setContent(await search(query));
        }
        getContent();
    }, [searching, page])

    return (
        <>
            <Menu currentPage={"search"}/>
            <div className="search_and_filter">
                <div className="search_stack">
                    <input type="text" placeholder={searchQ} className="search" onChange={(e) => {setSearchQ(e.target.value); setSearching(!searching)}}></input>
                </div>
            </div>
            <ContentGrid content={content} />
            <div className="navigator">
                <ChevronLeft onClick={() => {if(page > 0) setPage(page - 1)}} />
                {page}
                <ChevronRight onClick={() => {if(content.length == 25) setPage(page + 1)}}/>
            </div>
        </>
    )
}