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
    <>
      <Top />
      <Bottom />
    </>
  );
}
