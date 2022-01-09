import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import TopLogo from "./logos/trackit.png";
import UserContext from "./Context.js";

export default function Top() {
  const { perfil } = useContext(UserContext);
  console.log(perfil);
  return (
    <>
      <Header>
        <Img src={TopLogo} />
        <Imagem src={perfil}></Imagem>
      </Header>
    </>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100%;
  position: fixed;
  top: 0px;
  background: #126ba5;
  box-shadow: 0px 4px 4px 0px #00000026;
`;

const Imagem = styled.img`
  height: 51px;
  width: 51px;
  top: 9px;
  border-radius: 98.5px;
  position: fixed;
  right: 18px;
`;

const Img = styled.img`
  position: fixed;
  left: 18px;
`;
