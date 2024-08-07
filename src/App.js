import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css';
import { Footer, Header, Home } from './componentsContainer';
import Login from "./componentsContainer/Login";
import UserProvider from "./context/UserContext";
import LogoutContainer from "./componentsContainer/LogoutContainer";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogoutContainer />} />
        </Routes>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
