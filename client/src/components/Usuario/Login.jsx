import React from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import './css/login.css';

export default function LoginForm() {
  const cancelar = function (e) {
    window.location.replace("http://localhost:3000");
  };
  return (
    <Container id="login">
      <Image
        id="header"
        src="https://fotos.subefotos.com/97d96c5903bb437b451cff5d3f864f20o.png"
      ></Image>
      <form
        id="formlogin"
        action="http://localhost:3001/auth/login"
        method="POST"
      >
        <div id="contelogin2">          
            <input
              name="email"
              placeholder="E-mail"
              required
            />         
        </div>
        <div id="contelogin2">          
            <input
              name="password"
              type="password"
              placeholder="Senha"
              required
            />                 
        </div>
        <div className="botoes1">
          <input
            className="btn btn-outline-dark"
            type="submit"
            value="Iniciar Sessão"
          />
          <button className="btn btn-outline-light" type="button" onClick={cancelar}>
            Voltar
          </button>
        </div>
      </form>      
    </Container>
  );
}
