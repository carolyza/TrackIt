import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "./Context.js";
import Bottom from "./Bottom.js";
import Top from "./Top.js";
import dayjs from "dayjs";
import Image from "./logos/Vector.png";

export default function Today() {
  const { token, Goal, setGoal } = useContext(Context);
  const [habit, setHabit] = useState([]);
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  const week = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const [finish, setFinish] = useState([]);

  useEffect(() => {
    renderHabits();
  }, []);

  function renderHabits() {
    const requisicao = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      auth
    );
    requisicao.then((r) => {
      setHabit(r.data);
      setGoal(() => ChangeGoal(r.data));
    });
    requisicao.catch((e) => {
      console.log(e.response);
    });
    console.log(Goal);
  }

  function ChangeGoal(habit) {
    let complete = 0;
    for (let i = 0; i < habit.length; i++) {
      if (habit[i].done) {
        complete++;
      }
    }
    const total = ((complete * 100) / habit.length).toFixed();
    return total;
  }

  function CheckHabit(id) {
    if (!finish.includes(id)) {
      setFinish([...finish, id]);
    } else {
      setFinish(finish.filter((i) => i !== id));
    }
  }

  function DoneHabit(id, done) {
    if (!done) {
      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
        !done,
        auth
      );
      promise.then(renderHabits, CheckHabit(id));
      promise.catch((e) => alert(e.response.data.message));
    } else {
      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
        !done,
        auth
      );
      promise.then(renderHabits, CheckHabit(id));
      promise.catch((e) => alert(e.response.data.message));
    }
  }

  return (
    <>
      <Top />
      <Container>
        <HeadPage>
          <h1>
            {week[dayjs().day()]},{" "}
            {dayjs().date() < 10 ? `0${dayjs().date()}` : dayjs().date()}/
            {dayjs().month() + 1 < 10
              ? `0${dayjs().month() + 1}`
              : dayjs().month() + 1}
          </h1>
          <Message Goal={Goal}>
            {Goal > 0
              ? `${Goal}% dos hábitos concluídos`
              : "Nenhum hábito concluído ainda"}
          </Message>
        </HeadPage>
        <Habits>
          {habit.map((h) => (
            <HabitBox key={h.id}>
              <HabContainer>
                <h2>{h.name}</h2>
                <p>Sequência atual: {h.currentSequence} dias</p>
                <p>Seu recorde: {h.highestSequence} dias</p>
              </HabContainer>
              <CheckBox onClick={() => DoneHabit(h.id, h.done)} check={h.done}>
                <img src={Image} />
              </CheckBox>
            </HabitBox>
          ))}
        </Habits>
      </Container>
      <Bottom />
    </>
  );
}

const HabitBox = styled.div`
  height: 94px;
  margin-left: 18px;
  margin-right: 18px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  background: #ffffff;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Habits = styled.div`
  margin-bottom: 106px;
`;

const HabContainer = styled.div`
  margin-left: 15px;
  h2 {
    font-family: Lexend Deca;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
    margin-bottom: 7px;
  }
  p {
    font-family: Lexend Deca;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
  }
`;

const CheckBox = styled.button`
  height: 69px;
  width: 69px;
  border-radius: 5px;
  border: none;
  margin-right: 13px;
  background: ${(props) => (props.check ? "#8FC549" : "#EBEBEB")};
`;

const Container = styled.div`
  margin-top: 70px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #e5e5e5;
`;

const HeadPage = styled.div`
  font-family: Lexend Deca;
  font-size: 23px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 17px;
  margin-top: 28px;
  margin-bottom: 28px;
  h1 {
    color: #126ba5;
  }
`;

const Message = styled.div`
  font-family: Lexend Deca;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  color: ${(props) => (props.Goal > 0 ? "#8FC549" : "#BABABA")};
`;
