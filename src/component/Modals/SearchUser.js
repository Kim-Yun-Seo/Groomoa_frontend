import { useState, useEffect } from "react";

const SearchUser = ({isOpen, searchResult}) => {
    console.log(searchResult)
    return (
        <div>
            {isOpen && (
                <div>
                    <div>
                        {
                            searchResult.map((user)=>(
                                <div key={user.usrId}>
                                    <p>{user.userName}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    )
}
export default SearchUser;