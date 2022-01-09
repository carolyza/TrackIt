import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "./Context.js";
import Bottom from "./Bottom.js";
import Top from "./Top.js";

export default function Today() {
  const { token } = useContext(Context);
  const auth = { headers: { Authorization: `Bearer ${token}` } };

  return (
    <Container>
      <Top />
      <Message>
        <h1>Histórico</h1>
        <h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
      </Message>
      <Bottom />
    </Container>
  );
}

const Container = styled.div`
  background: #e5e5e5;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Message = styled.div`
  margin-left: 15px;
  margin-right: 22px;
  margin-top: 70px;
  display: flex;

  flex-direction: column;

  h1 {
    margin-top: 28px;
    font-family: Lexend Deca;
    font-size: 23px;
    font-style: normal;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    color: #126ba5;
  }

  h2 {
    margin-top: 28px;
    font-family: Lexend Deca;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
  }
`;
