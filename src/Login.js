import styled from "styled-components";
import { useState } from "react";
import Logo from "./logos/Logo1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useContext } from "react";
import Context from "./Context.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const { setPerfil, setToken } = useContext(Context);

  const navigate = useNavigate();

  function MakeLogin(event) {
    setLoading(true);

    event.preventDefault();
    const requisicao = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      {
        email: email,
        password: password,
      }
    );

    requisicao.then((r) => {
      setToken(r.data.token);
      setPerfil(r.data.image);
      navigate("/hoje");
    });
    requisicao.catch((e) => {
      alert("Login ou senha não correspondem, tente novamente.");
      setLoading(false);
    });
  }

  return (
    <Container>
      <header>
        <Imagem src={Logo}></Imagem>
      </header>
      <form onSubmit={MakeLogin}>
        <Main>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder=" email"
            disabled={Loading}
          ></Input>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder=" senha"
            disabled={Loading}
          ></Input>
        </Main>
        <Footer>
          <Button type="submit" disabled={Loading}>
            {Loading ? (
              <Loader
                type="ThreeDots"
                color="#FFFFFF"
                height={13}
                width={51}
                timeout={3000}
              />
            ) : (
              "Entrar"
            )}
          </Button>

          <StyleLink to="/cadastro">Não possui conta? Cadastre-se</StyleLink>
        </Footer>
      </form>
    </Container>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Imagem = styled.img`
  margin-top: 68px;
  margin-bottom: 33px;
`;
const Input = styled.input`
  margin-bottom: 6px;
  height: 45px;
  width: 303px;
  border-radius: 5px;
  border: 1px solid #d4d4d4;
  font-family: Lexend Deca;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
`;

const Button = styled.button`
  margin-bottom: 25px;
  height: 45px;
  width: 303px;
  border-radius: 4.636363506317139px;
  background: #52b6ff;
  border: none;
  font-family: Lexend Deca;
  font-size: 21px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff;
`;
const StyleLink = styled(Link)`
  color: #52b6ff;
  font-family: Lexend Deca;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
`;
