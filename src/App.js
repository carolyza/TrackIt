import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from "react";
import Login from "./Login.js";
import SignUp from "./SignUp.js";
import UserContext from "./Context.js";

export default function App(){
    const [token, setToken] = useState("");
    const [Perfil, setPerfil] = useState("");

    return(
        <UserContext.Provider value={{Perfil, setPerfil}}>
<BrowserRouter>
<Routes>
    <Route path ="/" element={<Login SetToken={setToken} />}></Route>
    <Route path ="/cadastro" element={<SignUp/>}></Route>
</Routes>
</BrowserRouter>
</UserContext.Provider>
    );
}