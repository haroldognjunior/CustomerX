"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUser = addUser;
exports.getProfile = getProfile;
exports.logout = logout;
exports.listaContactos = listaContactos;
exports.getUpdateProfile = getUpdateProfile;
exports.LoginUser = LoginUser;

var _userConstants = require("../constants/userConstants");

var _axios = _interopRequireDefault(require("axios"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function addUser(user) {
  return function (dispatch) {
    _axios["default"].post("http://localhost:3001/auth/register", user).then(function (res) {
      if (res.status === 200) {
        _sweetalert["default"].fire({
          title: "Usuário criado!",
          text: "O e-mail " + user.email + " foi criado com sucesso =)",
          icon: "success"
        }).then(function () {
          dispatch({
            type: _userConstants.ADD_USER
          }) && window.location.replace("http://localhost:3000/login");
        });
      }
    })["catch"](function (res) {
      _sweetalert["default"].fire({
        title: "Ops, algo saiu mal!",
        text: "E-mail " + user.email + " já está registrado",
        icon: "error"
      });
    });
  };
}

function getProfile() {
  return function (dispatch) {
    _axios["default"].get("http://localhost:3001/auth/profileuser", {
      withCredentials: true
    }).then(function (res) {
      if (res.status === 200) {
        return dispatch({
          type: _userConstants.GET_PROFILE,
          payload: res.data
        });
      }
    });
  };
}

function logout() {
  return function (dispatch) {
    _axios["default"].get("http://localhost:3001/auth/logout").then(function _callee(value) {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_sweetalert["default"].fire({
                title: "¡Nos vemos pronto!",
                text: "Se ha deslogueado satisfactoriamente",
                icon: "success"
              }));

            case 2:
              dispatch({
                type: _userConstants.LOGOUT
              }) && window.location.replace("http://localhost:3000/");

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    })["catch"](function _callee2(error) {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_sweetalert["default"].fire({
                title: "¡Qué mal!",
                text: "No se pudo desloguear",
                icon: "error"
              }));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  };
}

function listaContactos(idContact) {
  return function (dispatch) {
    _axios["default"].get("http://localhost:3001/users/".concat(idContact)).then(function (res) {
      if (res.status === 200) {
        return dispatch({
          type: _userConstants.LISTA_CONTACTOS,
          payload: {
            nombreContacto: res.data.firstName + " " + res.data.lastName,
            idContacto: res.data.id
          }
        });
      }
    })["catch"](function (error) {
      _sweetalert["default"].fire({
        title: "¡Qué mal!",
        text: "No tienes fondos suficientes",
        icon: "error"
      });
    });
  };
}

function getUpdateProfile(address, id, user) {
  return function (dispatch) {
    _axios["default"].put("http://localhost:3001/users/modify/".concat(id), user).then(function (res) {
      if (res.status === 200) {
        dispatch({
          type: _userConstants.MODIFY_USER,
          payload: res.data
        });

        _sweetalert["default"].fire({
          title: "¡Buen trabajo!",
          text: "Tus datos fueron modificados correctamente",
          icon: "success"
        }).then(function (value) {
          window.location.replace("http://localhost:3000/cliente");
        });
      }
    })["catch"](function (error) {
      _sweetalert["default"].fire({
        title: "¡Qué mal!",
        text: "La dirección ingresada no es válida",
        icon: "error"
      });
    });
  };
}

function LoginUser(usuario, setUsuario) {
  _axios["default"].post('http://localhost:3001/auth/login', {
    email: usuario.email,
    password: usuario.password
  }, {
    withCredentials: true
  }).then(function (res) {
    var user = res.data;

    if (user) {
      _sweetalert["default"].fire("Éxito", 'Bienvenido ' + user.firstName, 'success');

      setUsuario({
        redirectTo: '/cliente'
      });
    } else {
      _sweetalert["default"].fire('Error', "Usuario y/o contraseña incorrectos. Intente nuevamente", 'error');
    }
  })["catch"](function (e) {
    _sweetalert["default"].fire('Error', "Ha ocurrido un error al iniciar sesión. Intente nuevamente", 'error');
  });
}