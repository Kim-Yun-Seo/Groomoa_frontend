import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RandomImage from "../RandomPerson";

const SearchUser = ({isOpen, searchResult, handleShowButtonClick}) => {
    console.log(searchResult)
    return (
        <div>
            {isOpen && (
                <div>
                    <div>
                        {
                            searchResult.map((user)=>(
                                <div key={user.userId}>
                                    <div>
                                        {/* <img src={user.profileImg}></img> */}
                                        < RandomImage />
                                        <p>{user.userName}</p>
                                        <button onClick={()=>{handleShowButtonClick(user.userId);
                                        console.log("worked!");
                                        }}>show</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}        </div>
    )
}
export default SearchUser;