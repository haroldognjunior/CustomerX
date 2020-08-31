import React, {useEffect} from 'react';
import { getClientDetails} from '../../actions/clientActions';
import { getContacts} from '../../actions/contactsActions';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image';
import Container from "react-bootstrap/Container";
import { Link } from 'react-router-dom';
import './css/clientedetalhado.css';


function Clientedetalhado({id, client, contact, getClientDetails, getContacts}) {
   
  useEffect(()=>{
    getClientDetails(id)     
 },[])

 

useEffect(()=>{
  getContacts(id)
},[])

  return(
    <Container id="contehome1">
      <Image
        id="header"
        src="https://fotos.subefotos.com/97d96c5903bb437b451cff5d3f864f20o.png"
      ></Image>
      <div>
      <span>Contatos do Cliente {client.fullName} </span>
      </div>

    <div id="contatosgeral">
    { contact.map(C => {   
          return <div className="contato" key={C.idContact+C.clientIdClient}>
           { <span>Nome do contato: {C.fullName}
           <br /> E-mail principal: {C.email1}
           <br /> E-mail secundário: {C.email2}
           <br /> Telefone principal: {C.phone1}
           <br /> Telefone secundário: {C.phone2}
           </span>}           
      </div>}) }

      <div>
      <Link to={'/registrocontato/'+ client.idClient}>
      <input
                  type="submit"
                  className="btn btn-outline-dark"
                  value="Quer adicionar contatos para este cliente? "
                  />
                </Link>
                </div>
                </div>
      </Container>
  );
}

function mapStateToProps(state){
    return{
        client : state.usuario.clienteSelecionado,
        contact : state.usuario.contacts
        
    }
  }  
  export default connect (mapStateToProps,{getClientDetails, getContacts})( Clientedetalhado )
  