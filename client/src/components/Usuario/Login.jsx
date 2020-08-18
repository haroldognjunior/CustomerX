import React from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

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
        <div className="form-group col-md-12" id="contelogin2">
          <div className="input-group mb-3 id" id="contelogin3">
            <input
              name="email"
              className="form-control"
              placeholder="E-mail"
              required
            />
          </div>
        </div>
        <div className="form-group col-md-12 " id="contelogin4">
          <div className="input-group mb-3" id="contelogin5">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Senha"
              required
            />
          </div>         
        </div>

        <div className="form-group col-md-6 inicio">
          <input
            className="btn btn-outline-dark"
            type="submit"
            value="Iniciar Sessão"
          />
          <Button className="btn btn-outline-light" type="button" onClick={cancelar}>
            Voltar
          </Button>
        </div>
      </form>      
    </Container>
  );
}
