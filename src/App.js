import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import { useState } from "react";
import Login from "./Login.js";
import SignUp from "./SignUp.js";

export default function App(){
    const [Token, setToken] = useState("");
    return(
<BrowserRouter>
<Routes>
    <Route path ="/" element={<Login Token={Token} SetToken={setToken} />}></Route>
    <Route path ="/cadastro" element={<SignUp/>}></Route>
</Routes>
</BrowserRouter>
    );
}