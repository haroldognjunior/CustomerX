"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClient = addClient;
exports.getProfile = getProfile;
exports.getWallet = getWallet;
exports.getTransactions = getTransactions;
exports.logout = logout;
exports.enviarDinero = enviarDinero;
exports.listaContactos = listaContactos;
exports.getAddress = getAddress;
exports.cargarDinero = cargarDinero;
exports.transactionsHistory = transactionsHistory;
exports.getUpdateProfile = getUpdateProfile;
exports.LoginUser = LoginUser;

var _clientConstants = require("../constants/clientConstants");

var _axios = _interopRequireDefault(require("axios"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function addClient(user) {
  return function (dispatch) {
    _axios["default"].post("http://localhost:3001/clients/new", user).then(function (res) {
      if (res.status === 200) {
        _sweetalert["default"].fire({
          title: "¡Registro realizado!",
          text: "Se ha enviado un email de validación a " + user.email + " =)",
          icon: "success"
        }).then(function (value) {
          dispatch({
            type: _clientConstants.ADD_CLIENT
          }) && window.location.replace("http://localhost:3000/cliente");
        });
      }
    })["catch"](function () {
      _sweetalert["default"].fire({
        title: "¡Qué mal!",
        text: "E-mail " + user.email + " ya está en uso",
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
          type: _clientConstants.GET_PROFILE,
          payload: res.data
        });
      }
    });
  };
}

function getWallet(id) {
  return function (dispatch) {
    _axios["default"].get("http://localhost:3001/users/wallet/".concat(id)).then(function (res) {
      if (res.status === 200) {
        return dispatch({
          type: _clientConstants.GET_WALLET,
          payload: res.data
        });
      }
    });
  };
}

function getTransactions(idUser) {
  return function (dispatch) {
    _axios["default"].get("http://localhost:3001/transactions/history/".concat(idUser)).then(function (res) {
      if (res.status === 200) {
        return dispatch({
          type: _clientConstants.GET_TRANSACTIONS,
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
                type: _clientConstants.LOGOUT
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

function enviarDinero(from, to, money, transactions_type) {
  return function (dispatch) {
    var myBody = {
      money: money,
      transactions_type: transactions_type
    };

    switch (transactions_type) {
      case "UsertoUser":
        _axios["default"].put("http://localhost:3001/transactions/".concat(from, "/").concat(to.idContacto), myBody).then(function (res) {
          if (res.status === 200) {
            _sweetalert["default"].fire({
              title: "¡Buen trabajo!",
              text: "Se ha enviado $" + money + " a " + to.nombreContacto,
              icon: "success"
            }).then(function (value) {
              dispatch({
                type: _clientConstants.ENVIAR_DINERO
              }) && window.location.replace("http://localhost:3000/cliente");
            });
          }
        })["catch"](function (error) {
          _sweetalert["default"].fire({
            title: "¡Qué mal!",
            text: "No se pudo enviar dinero",
            icon: "error"
          });
        });

        break;

      default:
        _axios["default"].put("http://localhost:3001/transactions/".concat(from, "/").concat(to.id), myBody).then(function (res) {
          if (res.status === 200) {
            _sweetalert["default"].fire({
              title: "¡Buen trabajo!",
              text: "Se ha enviado $" + money + " a " + to.name,
              icon: "success"
            }).then(function (value) {
              dispatch({
                type: _clientConstants.ENVIAR_DINERO
              }) && window.location.replace("http://localhost:3000/cliente");
            });
          }
        })["catch"](function (error) {
          _sweetalert["default"].fire({
            title: "¡Qué mal!",
            text: "No se pudo enviar dinero",
            icon: "error"
          });
        });

        break;
    }
  };
}

function listaContactos(idContact) {
  return function (dispatch) {
    _axios["default"].get("http://localhost:3001/users/".concat(idContact)).then(function (res) {
      if (res.status === 200) {
        return dispatch({
          type: _clientConstants.LISTA_CONTACTOS,
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

function getAddress(address, id, user) {
  return function (dispatch) {
    _axios["default"].post("http://localhost:3001/auth/validate/street", address).then(function (res) {
      if (res.status === 200) {
        _axios["default"].put("http://localhost:3001/users/modify/".concat(id), user).then(function (res) {
          if (res.status === 200) {
            dispatch({
              type: _clientConstants.MODIFY_USER,
              payload: res.data
            });

            _sweetalert["default"].fire({
              title: "¡Buen trabajo!",
              text: "Tus datos fueron ingresados correctamente",
              icon: "success"
            }).then(function (value) {
              window.location.replace("http://localhost:3000/login");
            });
          }
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

function cargarDinero(id, value) {
  _axios["default"].post("http://localhost:3001/transactions/loadBalance/".concat(id), {
    value: value
  }).then(function (res) {
    _sweetalert["default"].fire({
      title: "Recarga exitosa!",
      icon: "success"
    }).then(function () {
      window.location.replace("http://localhost:3000/cliente");
    });
  })["catch"](function (res) {
    _sweetalert["default"].fire({
      title: "Error",
      text: "No se pudo recargar dinero",
      icon: "error"
    });
  });
}

function transactionsHistory(id, moment) {
  return function (dispatch) {
    _axios["default"].get("http://localhost:3001/transactions/history/time/".concat(id, "?moment=").concat(moment)).then(function (result) {
      dispatch({
        type: _clientConstants.TRANSACTIONS_HISTORY,
        payload: result.data
      });
    })["catch"](function (error) {
      _sweetalert["default"].fire({
        title: error,
        text: "Hubo un error inesperado",
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
          type: _clientConstants.MODIFY_USER,
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