import { Filter } from "react-feather"

export default function SearchPage() {
    return (
        <>
            <div className="search_and_filter">
                <div className="search_stack">
                    <input type="text" placeholder="Search" className="search"></input>
                    <button className="secondary_button"><Filter /></button>
                </div>
            </div>
        </>
    )
}