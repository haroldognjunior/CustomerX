import {
  ADD_CLIENT,
  GET_CLIENT,
  MODIFY_USER,
  LISTA_CONTATOS,
  GET_CLIENT_DETAILS  
} from "../constants/clientConstants";
import axios from "axios";
import swal from "sweetalert2";

export function addClient(user) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/clients/new", user)
      .then((res) => {
        if (res.status === 200) {
          swal
            .fire({
              title: "¡Registro realizado!",
              text:
                "Se ha enviado un email de validación a " + user.email + " =)",
              icon: "success",
            })
            .then((value) => {
              dispatch({ type: ADD_CLIENT }) &&
                window.location.replace("http://localhost:3000/cliente");
            });
        }
      })
      .catch(() => {
        swal.fire({
          title: "¡Qué mal!",
          text: "E-mail " + user.email + " ya está en uso",
          icon: "error",
        });
      });
  };
}

export function getClient() {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/clients/")
      .then((res) => {
        if (res.status === 200) {
          return dispatch({ type: GET_CLIENT, payload: res.data });
        }
      });
  };
}

export function getClientSelected(idClient) {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/clients/", idClient)
      .then((res) => {
        if (res.status === 200) {
          return dispatch({ type: GET_CLIENT_DETAILS, payload: res.data });
        }
      });
  };
}




  export function listaContatos(idContact) {
    return function (dispatch) {
      axios.get(`http://localhost:3001/users/${idContact}`).then((res) => {
        if (res.status === 200) {
          return dispatch({
            type: LISTA_CONTATOS,
            payload: {
              nombreContacto: res.data.firstName + " " + res.data.lastName,
              idContacto: res.data.id,
            },
          });
        }
      })
      .catch((error) => {
        swal.fire({
          title: "¡Qué mal!",
          text: "No tienes fondos suficientes",
          icon: "error",
        });
      });
    };
  }

  
  export function getUpdateProfile(address, id, user) {
    return function (dispatch) {

            axios
              .put(`http://localhost:3001/users/modify/${id}`, user)
              .then((res) => {
                if (res.status === 200) {
                  dispatch({ type: MODIFY_USER, payload: res.data });
                  swal
                    .fire({
                      title: "¡Buen trabajo!",
                      text: "Tus datos fueron modificados correctamente",
                      icon: "success",
                    })
                    .then((value) => {
                      window.location.replace("http://localhost:3000/cliente");
                    });
                }
              })
          
       
        .catch((error) => {
          swal.fire({
            title: "¡Qué mal!",
            text: "La dirección ingresada no es válida",
            icon: "error",
          });
        });
    };
  }

 
 




  export function getClientDetails(idClient) {
    return function (dispatch) {
      axios.get('http://localhost:3001/clients/' + idClient).then((res) => {
        if (res.status === 200) {
          return dispatch({
            type: GET_CLIENT_DETAILS,
            payload: {
              idClient: res.data.idClient,
            },
          });
        }
      })
      .catch((error) => {
        swal.fire({
          title: "¡Qué mal!",
          text: "Cliente não encontrado",
          icon: "error",
        });
      });
    };
  }
