import {
  ADD_USER,
  GET_PROFILE,
  MODIFY_USER, 
} from "../constants/userConstants";
import axios from "axios";
import swal from "sweetalert2";

export function addUser(user) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/auth/register", user)
      .then((res) => {
        if (res.status === 200) {
          swal
            .fire({
              title: "Usuário criado!",
              text:
                "O e-mail " + user.email + " foi criado com sucesso =)",
              icon: "success",
            })
            .then(() => {
              dispatch({ type: ADD_USER }) &&
                window.location.replace("http://localhost:3000/login");
            });
        }
      })
      .catch((res) => {
        swal.fire({
          title: "Ops, algo saiu mal!",
          text: "E-mail " + user.email + " já está registrado",
          icon: "error",
        });
      });
  };
}

export function getProfile() {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/auth/profileuser", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          return dispatch({ type: GET_PROFILE, payload: res.data });
        }
      });
  };
}

  export function getUpdateProfile( id, user) {
    return function (dispatch) {

            axios
              .put(`http://localhost:3001/users/modify/${id}`, user)
              .then((res) => {
                if (res.status === 200) {
                  dispatch({ type: MODIFY_USER, payload: res.data });
                  swal
                    .fire({
                      title: "Excelente",
                      text: "Dados modificados com sucesso",
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
            text: "endereco errado",
            icon: "error",
          });
        });
    };
  }


  export function LoginUser (usuario, setUsuario) {
    axios.post('http://localhost:3001/auth/login',{
      email: usuario.email,
      password: usuario.password
    }, { withCredentials: true })
    .then((res)=>{    
      const user = res.data;

      if (user) {
        swal.fire("Sucesso", 'Bem-vindo ' + user.firstName, 'success');
        setUsuario({
          redirectTo: '/clientes'
        })
      }
      else{
        swal.fire('Error', "Usuário ou senha incorretos. Tente novamente", 'error');
      }
    })
    .catch(e=>{
      swal.fire('Error', "Ocorreu um erro. Tente novamente", 'error');
    })
  }
