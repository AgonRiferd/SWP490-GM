import React from "react";

const SearchBar = ({filter, setFilter}) => {
    return (
        <span>
            Tìm kiếm: {' '}
            <input value={filter || ''} onChange={(e) => setFilter(e.target.value)}/>
        </span>
    )
}

export default SearchBar;