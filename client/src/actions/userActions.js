import {
  ADD_USER,
  GET_PROFILE,
  MODIFY_USER,
  LOGGIN,
  LOGOUT,
 
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





export function logout() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/auth/logout")
      .then(async (value) => {
        await swal.fire({
          title: "¡Nos vemos pronto!",
          text: "Se ha deslogueado satisfactoriamente",
          icon: "success",
        });
        dispatch({ type: LOGOUT }) &&
          window.location.replace("http://localhost:3000/");
      })
      .catch(async (error) => {
        await swal.fire({
          title: "¡Qué mal!",
          text: "No se pudo desloguear",
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


  export function LoginUser (usuario, setUsuario) {
    axios.post('http://localhost:3001/auth/login',{
      email: usuario.email,
      password: usuario.password
    }, { withCredentials: true })
    .then((res)=>{
      const user = res.data;

      if (user) {
        swal.fire("Éxito", 'Bienvenido ' + user.firstName, 'success');
        setUsuario({
          redirectTo: '/cliente'
        })
      }
      else{
        swal.fire('Error', "Usuario y/o contraseña incorrectos. Intente nuevamente", 'error');
      }
    })
    .catch(e=>{
      swal.fire('Error', "Ha ocurrido un error al iniciar sesión. Intente nuevamente", 'error');
    })
  }
