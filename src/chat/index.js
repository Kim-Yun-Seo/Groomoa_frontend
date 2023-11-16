import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from './pages/main';
import Chat from './pages/chat';
import { SocketContextProvider } from './contexts/SocketContext';


const App = () => {
    return (
        <BrowserRouter>
            <SocketContextProvider>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/chat-room/:roomId/:userId" element={<Chat />} />
              </Routes>
            </SocketContextProvider>
        </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
