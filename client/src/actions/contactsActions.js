import { 
  GET_USER_CONTACTS,
  ADD_CONTACT
} from '../constants/clientConstants';
import axios from 'axios';
import swal from "sweetalert2";

export function getContacts(id) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/contacts/${id}`)
      .then((res) => {
        if (res.status === 200) {
          return dispatch({
            type: GET_USER_CONTACTS,
            payload: res.data,
          })
        } else {
          alert(res.message);
        }
      })
  }
}

export function getContatos() {
  return function (dispatch) {
    axios.get(`http://localhost:3001/contacts/`)
      .then((res) => {
        
          return dispatch({
            type: GET_USER_CONTACTS,
            payload: res.data,
    
          }) 
        
      })
  }
}


export function addContact(input, idClient) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/contacts/" + idClient, input)
      .then((res) => {
        console.log(idClient, "es el id")
        if (res.status === 200) {
          swal
            .fire({
              title: "Contato adicionado!",
              text:
                idClient.email1 ,
              icon: "success",
            })
            .then((value) => {
              dispatch({ type: ADD_CONTACT, payload: res.data }) &&
                window.location.replace("http://localhost:3000/clientes");
            });
        }
      })
      .catch(() => {
        swal.fire({
          title: "ops!",
          text: "Dá erro com " + idClient.clientIdClient + " =(",
          icon: "error",
        });
      });
  };
}

