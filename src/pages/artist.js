import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useParams } from "react-router-dom";
import ContentGrid from "../components/ContentGrid";
import Menu from "../components/Menu";
import { search } from "../data/getSongs";

export default function ArtistPage() {
    let { artistName } = useParams();
    const [content, setContent] = useState([])
    const [page, setPage] = useState(0);

    useEffect(() => {
        const getContent = async () => {
            setContent(await search(`artist:"${artistName}"&index=${page * 25}&limit=25`));
        }
        getContent();
    }, [page])

    return (
        <>
            <Menu currentPage={""}/>
            <h2 className="top_chart">{artistName}</h2>
            <ContentGrid content={content} />
            <div className="navigator">
                <ChevronLeft onClick={() => {if(page > 0) setPage(page - 1)}} />
                {page}
                <ChevronRight onClick={() => {if(content.length == 25) setPage(page + 1)}}/>
            </div>
        </>
    )
}