import React, {useEffect} from 'react';
import { getContatos} from '../../actions/contactsActions';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image';
import Container from "react-bootstrap/Container";


function ListaContatos({Contato, getContatos}) {
    useEffect(()=>{
      getContatos()
  },[getContatos])

  

  return(
      
      <Container id="contehome1">
      <Image
        id="header"
        src="https://fotos.subefotos.com/97d96c5903bb437b451cff5d3f864f20o.png"
      ></Image>
     <h2> Relatório Geral de Contatos:</h2>

      {Contato.map(CO => {
          return <div className="Contato" key={CO.idContact}>          
           <span> Cliente: {CO.clientIdClient}
           <br /> Nome do Cliente: {CO.fullName}
           <br /> E-mail Principal: {CO.email1}
           <br /> Outro E-mail: {CO.email2}
           <br /> Telefone Principal: {CO.phone1}
           <br /> Outro Telefone: {CO.phone2}
           </span>
          
           
      </div>})}
      




      </Container>

  );

}

function mapStateToProps(state){
    return{
      Contato: state.usuario.contacts
    }
  }
  
  export default connect (mapStateToProps,{getContatos})( ListaContatos )
  