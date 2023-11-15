// import { useNavigate } from "react-router-dom"
// import { useEffect, useState } from "react";
// import SearchUser from "./SearchUser";

// function checkCredential () {

//     const movePage = useNavigate();
//     const [loggedin, setLoggedIn] = useState(true);
//     const [userData, setUserData] = useState(null);
//     const [token, setToken] = useState(null);

//     const authToken = localStorage.getItem("key");
//     setToken(authToken);
//     if (!authToken) {
//         movePage('/login');
//     } else {
//         const apiURL = 'https://dummyjson.com/auth/login';
//         fetch(apiURL, { headers: { 'Authorization': `Bearer ${token}` } })
//             .then((res) => {
//                 if (res.ok) {
//                     console.log("res.ok now")
//                     return res.json();
//                 } else {
//                     throw new Error('user data request failed');
//                 }
//             })
//             .then((data) => {
//                 setUserData(data);
//                 setLoggedIn(true);
//             })
//             .catch((error) => {
//                 console.log('Error', error);
//                 // movePage('/login');
//             })
//     }
//     return true;
// }
// export default checkCredential();