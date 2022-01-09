import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import TopLogo from "./logos/Trackit.png";
import UserContext from "./Context.js";

export default function Top() {
  const { Perfil } = useContext(UserContext);
  return (
    <>
      <Header>
        <TopLogo />
        <Imagem src={Perfil}></Imagem>
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
  left: 306px;
  top: 9px;
  border-radius: 98.5px;
`;
