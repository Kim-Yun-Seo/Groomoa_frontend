import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./component/Mainpage";
import Mypage from "./component/Mypage";
import Login from "./component/Login";
import IsLogined from "./component/IsLogined";
import { SocketContextProvider } from "./chat/contexts/SocketContext";
import Chat from './chat/pages/chat';
import style from "./global.css"

function App() {
  return (
    <BrowserRouter>
      <SocketContextProvider>
          <Routes>
            <Route path={"/"} element={<IsLogined />}></Route>
            <Route path={"/login"} element={<Login />}></Route>
            <Route path={"/main"} element={<MainPage />}></Route>
            <Route path={"/mypage"} element={<Mypage />}></Route>
            <Route path="/chat-room/:roomId/:userId" element={<Chat />}></Route>
          </Routes>
      </SocketContextProvider>
    </BrowserRouter>
  );
}

export default App;
