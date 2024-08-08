import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css';
import { Footer, Header, Home } from './componentsContainer';
import Login from "./componentsContainer/Login";
import UserProvider from "./context/UserContext";
import LogoutContainer from "./componentsContainer/LogoutContainer";
import EmployeesView from "./componentsContainer/EmployeesView";
import EmployeesListContainer from "./componentsContainer/EmployeesListContainer";
import EmployeeDataContainer from "./componentsContainer/EmployeeDataContainer";
import CreateEmployee from "./components/CreateEmployee";
import RolContainer from "./componentsContainer/RolContainer";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogoutContainer />} />
          <Route path="/employees" element={<EmployeesView />}>
            <Route path="list" element={<EmployeesListContainer />} />
            <Route path=":id" element={<EmployeeDataContainer />} />
            <Route path="create" element={<CreateEmployee />} />
            <Route path="rol" element={<RolContainer />} />
          </Route>
        </Routes>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
