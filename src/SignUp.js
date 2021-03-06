import styled from "styled-components";
import { useState } from "react";
import Logo from "./logos/Logo1.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import axios from "axios";

export default function SignUp() {
  const [Loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  function Send(event) {
    setLoading(true);
    event.preventDefault();

    const requisicao = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      { email, password, name, image }
    );

    requisicao.then(() => navigate("/"));

    requisicao.catch(() => {
      alert("Houve algum erro, tente novamente");
      setLoading(false);
    });
  }

  return (
    <Container>
      <header>
        <Imagem src={Logo}></Imagem>
      </header>
      <form onSubmit={Send}>
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
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder=" nome"
            disabled={Loading}
          ></Input>
          <Input
            type="text"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            placeholder=" foto"
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
              "Cadastrar"
            )}
          </Button>

          <StyleLink to="/">J?? tem uma conta? Fa??a login!</StyleLink>
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
