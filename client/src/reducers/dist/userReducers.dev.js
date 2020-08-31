"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = usuario;

var _userConstants = require("../constants/userConstants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  usuarios: [],
  usuarioConectado: {},
  listContact: [],
  contacts: [],
  contactSelected: ""
};

function usuario() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _userConstants.ADD_USER:
      return _objectSpread({}, state, {
        usuarios: state.usuarios
      });

    case _userConstants.GET_VALID_USER:
      return _objectSpread({}, state, {
        usuarios: action.payload
      });

    case _userConstants.GET_PROFILE:
      return _objectSpread({}, state, {
        usuarioConectado: action.payload
      });

    case _userConstants.GET_USER_LOGGED:
      return _objectSpread({}, state, {
        usuarioConectado: action.payload
      });

    case _userConstants.LOGGIN:
      return _objectSpread({}, state, {
        usuarioConectado: action.payload
      });

    case _userConstants.LOGOUT:
      return _objectSpread({}, state, {
        usuarios: [],
        usuarioConectado: {}
      });

    case _userConstants.LISTA_CONTACTOS:
      return _objectSpread({}, state, {
        listContact: state.listContact.concat(action.payload)
      });

    case _userConstants.GET_USER_CONTACTS:
      return _objectSpread({}, state, {
        contacts: action.payload
      });

    case _userConstants.SELECT_CONTACT:
      return _objectSpread({}, state, {
        contactSelected: action.payload
      });

    default:
      return state;
  }
}