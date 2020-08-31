import React, {useEffect} from 'react';
import { getClient} from '../../actions/clientActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Container from "react-bootstrap/Container";


function Clientes({id, Client, getClient}) {
    useEffect(()=>{
      getClient()
  },[getClient])

  

  return(
      
      <Container id="contehome1">
      <Image
        id="header"
        src="https://fotos.subefotos.com/97d96c5903bb437b451cff5d3f864f20o.png"
      ></Image>
     

      {Client.map(C => {
          return <div className="Client" key={C.idClient}>
           <span>Nome Completo do Cliente: {C.fullName} 
           <br /> E-mail Principal: {C.email1}
           <br /> Outro e-mail do Cliente: {C.email2}
           <br /> Telefone Principal do Cliente: {C.phone1}
           <br /> Outro Telefone do Cliente: {C.phone2}
           </span>
           <Link to={'/clientes/'+ C.idClient}>
           <p> Quer ver os contatos deste cliente? </p>
                </Link>
           
      </div>})}
      




      </Container>

  );

}

function mapStateToProps(state){
    return{
        Client : state.usuario.client
    }
  }
  
  export default connect (mapStateToProps,{getClient})( Clientes )
  