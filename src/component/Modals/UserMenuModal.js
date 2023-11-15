import { useNavigate } from "react-router-dom";

const UserMenuModal = ({isOpen}) => {

    const movePage = useNavigate();
    return (
        <div>
            {isOpen && 
                <div>
                    <button onClick={()=>movePage('/mypage')}>MyPage</button>
                </div>
            }
        </div>
    )
}

export default UserMenuModal;