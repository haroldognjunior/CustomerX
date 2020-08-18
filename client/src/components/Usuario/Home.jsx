import React from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';



export default function Home() {
  
  return (
    <Container id="contehome1">
      <Image id="header" src="https://fotos.subefotos.com/97d96c5903bb437b451cff5d3f864f20o.png" ></Image>
      <div className="contehome2">
      <Button className="btn btn-outline-dark" href="/login" variant="primary"  type="button" >
          Iniciar Sessão
        </Button>
      </div>   
        <div className="regconthome">
        <Button className="btn btn-outline-light"  href="/registro" variant="primary" type="button" >
            Registre-se
        </Button> 
        </div>      
    </Container>
  );
}