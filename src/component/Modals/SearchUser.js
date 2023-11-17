import { useState, useEffect } from "react";

const SearchUser = ({isOpen, searchResult}) => {
    console.log(searchResult)
    return (
        <div>
            {isOpen && (
                <div>
                    <div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default SearchUser;