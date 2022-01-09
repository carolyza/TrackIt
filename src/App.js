import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from "react";
import Login from "./Login.js";
import SignUp from "./SignUp.js";
import UserContext from "./Context.js";
import Today from "./Today.js";
import Habits from "./Habits.js";
import History from "./History.js";

export default function App() {
  const [token, setToken] = useState("");
  const [Perfil, setPerfil] = useState("");
  const [Goal, setGoal] = useState("");

  return (
    <UserContext.Provider
      value={{ Perfil, Goal, token, setPerfil, setToken, setGoal }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/cadastro" element={<SignUp />}></Route>
          <Route path="/hoje" element={<Today />}></Route>
          <Route path="/habitos" element={<Habits />}></Route>
          <Route path="/historico" element={<History />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
