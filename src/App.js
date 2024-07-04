import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css';
import { Footer, Header, Home } from './componentsContainer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
