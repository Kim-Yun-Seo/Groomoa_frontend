import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const IsLogined = () => {

    const movePage = useNavigate();
    const tokenValid = localStorage.getItem('token');
    var token = false;
    useEffect(()=>{
        if (token) {
            movePage('/main');
        } else {
            movePage('/login');
        }
    })
    return (
        <></>
    );
}
export default IsLogined;