import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "./Context.js";
import Bottom from "./Bottom.js";
import Top from "./Top.js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function Habits() {
  const { token } = useContext(Context);
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  const [nohabit, setNohabit] = useState("");
  const [notask, setNotask] = useState("hidden");
  const [habit, setHabit] = useState([]);
  const [name, setName] = useState("");
  const [Loading, setLoading] = useState(false);
  const [week, setWeek] = useState([
    { day: "D", selected: false, index: 0 },
    { day: "S", selected: false, index: 1 },
    { day: "T", selected: false, index: 2 },
    { day: "Q", selected: false, index: 3 },
    { day: "Q", selected: false, index: 4 },
    { day: "S", selected: false, index: 5 },
    { day: "S", selected: false, index: 6 },
  ]);
  const [selecteds, setSelecteds] = useState([]);

  useEffect(() => {
    renderHabits();
  }, []);

  function CheckNull() {
    if (habit == []) {
      setNohabit("");
    }
  }

  function Delete(id) {
    const promise = axios.delete(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
      auth
    );

    if (window.confirm("Tem certeza que deseja deletar?")) {
      promise.then(() => renderHabits());
      promise.catch((e) => alert(e.response.data.message));
    }
  }

  function renderHabits() {
    const requisicao = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      auth
    );
    requisicao.then((r) => {
      setHabit(r.data);
      CheckNull();
    });
    requisicao.catch((e) => {
      console.log(e.response);
      setNohabit("hidden");
    });
  }

  function MakeHabit() {
    setNotask("");
  }

  function Cancel() {
    setNotask("hidden");
  }

  function CountDays(selectedDay) {
    const day = week.find((current) => selectedDay === current);
    day.selected = !day.selected;
    if (!selecteds.includes(selectedDay.index)) {
      setSelecteds([...selecteds, selectedDay.index]);
    } else {
      setSelecteds(selecteds.filter((i) => i !== selectedDay.index));
    }
    setWeek([...week]);
  }

  function CreateNew() {
    setLoading(true);
    // event.preventDefault();

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      {
        name: name,
        days: selecteds,
      },
      auth
    );

    promise.then((r) => {
      renderHabits();
      setLoading(false);
      alert("deu certo rapaz");
      setNohabit("hidden");
      setNotask("hidden");
    });
    promise.catch((e) => {
      alert(e.response.data.message);
      setLoading(false);
    });
  }

  return (
    <>
      <Top />
      <Container>
        <Headlist>
          <h2>Meus hábitos</h2>
          <button onClick={() => MakeHabit()}>+</button>
        </Headlist>
        <List>
          <form className={notask}>
            <Main>
              <Input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder=" nome do hábito"
                disabled={Loading}
              ></Input>
              <AllDays>
                {week.map((day, index) => (
                  <Days
                    key={index}
                    selected={day.selected}
                    onClick={() => CountDays(day)}
                    type="button"
                    disabled={Loading}
                  >
                    {day.day}
                  </Days>
                ))}
              </AllDays>

              <Footer>
                <ButtonCancel onClick={() => Cancel()} disabled={Loading}>
                  Cancelar
                </ButtonCancel>
                <ButtonSave
                  type="submit"
                  disabled={Loading}
                  onClick={() => CreateNew()}
                >
                  {Loading ? (
                    <Loader
                      type="ThreeDots"
                      color="#FFFFFF"
                      height={13}
                      width={51}
                      timeout={3000}
                    />
                  ) : (
                    "Salvar"
                  )}
                </ButtonSave>
              </Footer>
            </Main>
          </form>

          {habit.length === 0 ? (
            <h1 className={nohabit}>
              Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
              para começar a trackear!
            </h1>
          ) : (
            habit.map((h) => (
              <Habit key={h.id}>
                <HeadHabit>
                  <p>{h.name}</p>
                  <ion-icon
                    onClick={() => Delete(h.id)}
                    name="trash-outline"
                  ></ion-icon>
                </HeadHabit>
                <DayList>
                  {week.map((day, index) => (
                    <DayBox
                      key={index}
                      selected={h.days.includes(index) ? true : false}
                    >
                      {day.day}
                    </DayBox>
                  ))}
                </DayList>
              </Habit>
            ))
          )}
        </List>
      </Container>
      <Bottom />
    </>
  );
}

const HeadHabit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ion-icon {
    font-size: 15px;
    margin-top: 11px;
    margin-right: 10px;
  }
`;

const Habit = styled.div`
  margin-top: 20px;
  height: 91px;
  width: 100%;
  top: 147px;
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  p {
    margin-left: 15px;
    margin-top: 13px;
    margin-bottom: 8px;
    font-family: Lexend Deca;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    color: #666666;
  }
`;

const DayList = styled.div`
  display: flex;
  margin-left: 15px;
  gap: 4px;
`;
const DayBox = styled.div`
  height: 30px;
  width: 30px;
  left: 36px;
  top: 218px;
  border-radius: 5px;
  border: 1px solid #d4d4d4;
  font-family: Lexend Deca;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
  color: ${(props) => (props.selected ? "#FFFFFF" : "#DBDBDB")};
  background: ${(props) => (props.selected ? "#CFCFCF" : "#FFFFFF")};
`;

const Container = styled.div`
  margin-top: 70px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #e5e5e5;
`;

const Headlist = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  margin-left: 17px;
  justify-content: space-between;

  h2 {
    font-family: Lexend Deca;
    font-size: 23px;
    font-style: normal;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    color: #126ba5;
  }

  button {
    height: 35px;
    width: 40px;
    background: #52b6ff;
    border: none;
    border-radius: 4.636363506317139px;
    font-family: Lexend Deca;
    font-size: 27px;
    font-style: normal;
    font-weight: 400;
    line-height: 34px;
    letter-spacing: 0em;
    text-align: center;
    color: #ffffff;
    margin-right: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const List = styled.div`
  margin-left: 17px;
  margin-right: 18px;
  margin-bottom: 106px;
  h1 {
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
  .hidden {
    display: none;
    visibility: hidden;
  }
`;

const Input = styled.input`
  height: 45px;
  width: 303px;
  left: 36px;
  top: 165px;
  border-radius: 5px;
  background: #ffffff;
  border: 1px solid #d4d4d4;
  margin-left: 18px;
  margin-top: 19px;
  margin-bottom: 10px;
  font-family: Lexend Deca;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
  color: #666666; ;
`;

const AllDays = styled.div`
  display: flex;
  margin-left: 18px;
  gap: 4px;
`;
const Days = styled.button`
  height: 30px;
  width: 30px;
  left: 36px;
  top: 218px;
  border-radius: 5px;
  border: 1px solid #d4d4d4;
  font-family: Lexend Deca;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
  color: ${(props) => (props.selected ? "#FFFFFF" : "#DBDBDB")};
  background: ${(props) => (props.selected ? "#CFCFCF" : "#FFFFFF")};
`;

const Footer = styled.div`
  display: flex;
  margin-top: 29px;
  justify-content: end;
  align-items: center;
  margin-right: 16px;
`;

const ButtonCancel = styled.button`
  background: none;
  border: none;
  height: 20px;
  width: 69px;
  left: 165px;
  top: 284px;
  font-family: Lexend Deca;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  color: #52b6ff;
`;

const ButtonSave = styled.button`
  margin-left: 23px;
  border: none;
  height: 35px;
  width: 84px;
  left: 257px;
  top: 277px;
  border-radius: 4.636363506317139px;
  background: #52b6ff;
  font-family: Lexend Deca;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff;
`;

const Main = styled.div`
  margin-top: 20px;
  height: 180px;
  width: 100%;
  top: 147px;
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  .hidden {
    display: none;
    visibility: hidden;
  }
`;
