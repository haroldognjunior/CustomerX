import * as yup from "yup";
import PropTypes from "prop-types";
import React from "react";
import { ErrorMessage, Formik, Form as FormikForm, Field } from "formik";
import { useDispatch } from "react-redux";
import { addClient } from "../../actions/clientActions";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/Image";
import './css/criarcliente.css';

const validations = yup.object().shape({
  fullName: yup
    .string()
    .required("Digita o nome do cliente!"),    
  email1: yup
    .string()
    .required("Digita o e-mail do cliente!")
    .email("Deve digitar um e-mail válido!"),
  phone1: yup
    .number()
    .integer("Inclua somente os dígitos completos do telefone") 
    .min(11, "O telefone deve conter ao menos 11 dígitos!") 
    .required("Deve digitar um número de telefone válido!"),
});

const Form = ({ handleSubmit, initialValues }) => {
  const dispatch = useDispatch();
  function handleSubmit(values) {
    dispatch(addClient(values));  
  }
  const cancelar = function (e) {
    window.location.replace("http://localhost:3000");
  };
  return (
    <Container id="criarcliente">
      <Image
        id="header"
        src="https://fotos.subefotos.com/97d96c5903bb437b451cff5d3f864f20o.png"
      ></Image>
      <div id="cliente">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validations}
        >
          <FormikForm className="Form">
            <div className="form-group col-md-12">
              <h4>Registrar Cliente</h4>
              <div className="Form-Group">
              <Field
                  className="Form-Field"
                  name="fullName"
                  placeholder="Nome Completo do Cliente"
                  type="text"
                />
                <ErrorMessage
                  name="fullName"
                  className="Form-Error"
                  component="span"
                />
                <Field
                  className="Form-Field"
                  name="email1"
                  placeholder="E-mail do Cliente"
                  type="email"
                />
                <ErrorMessage
                  name="email1"
                  className="Form-Error"
                  component="span"
                />
              </div>
              <div className="Form-Group">
                <Field
                  className="Form-Field"
                  name="email2"
                  placeholder="E-mail alternativo do Cliente"
                  type="email"
                />                
              </div>
              <div className="Form-Group">
                <Field
                  className="Form-Field"
                  name="phone1"
                  placeholder="Telefone do Cliente"
                  type="tel"
                />
                <ErrorMessage
                  className="Form-Error"
                  component="span"
                  name="phone1"
                />
              </div>
              <div className="Form-Group">
                <Field
                  className="Form-Field"
                  name="phone2"
                  placeholder="Outro Telefone do Cliente"
                  type="tel"
                />                
              </div>
              <div className="Form-Group">
              <p>Data de inclusão do cliente</p>
                <Field
                  className="Form-Field"
                  name="registrationDate"
                  type="date"
                />                
              </div>
              <div className="botoes1">
                <input
                  type="submit"
                  className="btn btn-outline-dark"
                  value="Criar Usuário"
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

         
          </FormikForm>
        </Formik>
      </div>      
    </Container>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default Form;