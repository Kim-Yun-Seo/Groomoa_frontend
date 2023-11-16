import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./component/Mainpage";
import Mypage from "./component/Mypage";
import Login from "./component/Login";
import IsLogined from "./component/IsLogined";
import style from "./global.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<IsLogined />}></Route>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/main"} element={<MainPage />}></Route>
        <Route path={"/mypage"} element={<Mypage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
