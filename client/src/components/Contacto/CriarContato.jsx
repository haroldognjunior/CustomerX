import * as yup from "yup";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import { ErrorMessage, Formik, Form as FormikForm, Field } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../actions/contactsActions";
import { getClientDetails} from '../../actions/clientActions';
import { getContacts} from '../../actions/contactsActions';
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/Image";
import { connect } from 'react-redux';


function CriarContato ({ id, addContact, clienteSelecionado, getClientDetails}) {
    useEffect(()=>{
        
        getClientDetails(id)     
     },[])
    
        
     
  const [input, setInput] = useState({
    fullName : null,
    email1 : null,
    email2 : null,
    phone1 : null,
    phone2: null
})

const handleInputChange = function(e){
    e.preventDefault()        
    setInput({
        ...input,
        [e.target.name]: e.target.value            
    })
   
}
  
  const handleSubmit = function(e){
    e.preventDefault();
    console.log(input, "esto es el input")
    console.log(clienteSelecionado.idClient, "esto es el client")
    addContact(input, id, clienteSelecionado.idClient) ;     
}

  const cancelar = function (e) {
    window.location.replace("http://localhost:3000");
  };



  return (
    <Container id="criarcontato">
      <Image
        id="header"
        src="https://fotos.subefotos.com/97d96c5903bb437b451cff5d3f864f20o.png"
      ></Image>
      <div id="contato">
       
          <div className="Form">
            <div className="form-group col-md-12">
              <h4>Adicionar Contato</h4>
              <div className="Form-Group">
              <input
                  className="Form-Field"
                  name="fullName"
                  placeholder="Nome Completo do Contato"
                  type="text"
                  onChange={handleInputChange}
                />
                
                <input
                  className="Form-Field"
                  name="email1"
                  placeholder="E-mail do Contato"
                  type="email"
                  onChange={handleInputChange}
                />
                
              </div>
              <div className="Form-Group">
                <input
                  className="Form-Field"
                  name="email2"
                  placeholder="E-mail alternativo do Contato"
                  type="email"
                  onChange={handleInputChange}
                />                
              </div>
              <div className="Form-Group">
                <input
                  className="Form-Field"
                  name="phone1"
                  placeholder="Telefone do Contato"
                  type="tel"
                  onChange={handleInputChange}
                />
                
              </div>
              <div className="Form-Group">
                <input
                  className="Form-Field"
                  name="phone2"
                  placeholder="Outro Telefone do Contato"
                  type="tel"
                  onChange={handleInputChange}
                />                
              </div>
             
              <div className="botoes1">
                <input
                  type="submit"
                  className="btn btn-outline-dark"
                  value="Adicionar Contato"
                  onClick={handleSubmit}
                />
                <button
                  type="button"
                  className="btn btn-outline-light"
                  value="Cancelar"
                  onClick={cancelar}
                >
                  Cancelar
                </button>
              </div>
            </div>

         
          </div>
        
      </div>      
    </Container>
  );
};


function mapStateToProps(state){
    return{
        Client : state.usuario.client,
        contact : state.usuario.contacts,
        clienteSelecionado: state.usuario.clienteSelecionado,
    }
  }
  
  export default connect (mapStateToProps,{addContact, getClientDetails})( CriarContato )