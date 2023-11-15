import { useState, useEffect } from "react";

const SearchUser = ({isOpen, searchResult}) => {
    return (
        <div>
            {isOpen && (
                <div>
                    <div>
                        <p>여기에 유저 인포 담기</p>
                        <p>스크롤 가능하게</p>
                        <p>하위 컴포넌트 하나더 만들기</p>
                    </div>
                </div>
            )}
        </div>
    )
}
export default SearchUser;