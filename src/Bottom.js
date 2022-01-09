import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useContext } from "react";
import "react-circular-progressbar/dist/styles.css";
import UserContext from "./Context.js";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Bottom() {
  const { Goal } = useContext(UserContext);

  return (
    <Container>
      <Link to="/habitos">Hábitos</Link>
      <Link to={"/hoje"}>
        <CircularProgressbar
          className="progress-bar"
          value={Goal}
          text={"Hoje"}
          background
          backgroundPadding={6}
          styles={buildStyles({
            strokeLinecap: "round",
            pathTransitionDuration: 0.5,
            backgroundColor: "#52B6FF",
            textColor: "#ffffff",
            pathColor: "#ffffff",
            trailColor: "transparent",
          })}
        />
      </Link>
      <Link to="/historico" className="history">
        Histórico
      </Link>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 70px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  font-family: "Lexend Deca", sans-serif;
  position: fixed;
  bottom: 0;
  a {
    font-size: 18px;
    line-height: 22px;
    color: #52b6ff;
    text-decoration: none;
    /* margin-right:70px; */
  }
  .progress-bar {
    width: 91px;
    height: 91px;
    background: #52b6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 10px;
    right: 0;
    left: 0;
    margin: 0 auto;
    border-radius: 50%;
    color: #ffffff;
  }
  .history {
    position: fixed;
    right: 23px;
  }
`;
