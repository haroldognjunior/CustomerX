import {
  ADD_USER,
  GET_USER_LOGGED,
  GET_PROFILE,
  LOGGIN,
  LOGOUT,
  GET_VALID_USER
} from "../constants/userConstants";

import {
GET_USER_CONTACTS,
SELECT_CONTACT,
LISTA_CONTATOS,
GET_CLIENT,
GET_CLIENT_DETAILS
} from "../constants/clientConstants";

const initialState = {
  usuarios: [],
  usuarioConectado: {},
  client:[],
  clienteSelecionado: {},
  listContact: [],
  contacts: [],
  
};

export default function usuario(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        usuarios: state.usuarios,
      };
    case GET_VALID_USER:
      return {
        ...state,
        usuarios: action.payload,
      };

    case GET_PROFILE:
      return {
        ...state,
        usuarioConectado: action.payload,
      };

    case GET_USER_LOGGED:
    return {
        ...state,
        usuarioConectado: action.payload,
      };

    case LOGGIN:
    return {
        ...state,
        usuarioConectado: action.payload
            }

    case LOGOUT:
      return {
        ...state,
        usuarios: [],
        usuarioConectado: {}
      };

    case LISTA_CONTATOS:
    return {
        ...state,
        listContact: state.listContact.concat(action.payload),
      };

      
    case GET_USER_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
   
      case GET_CLIENT:
      return {
        ...state,
        client: action.payload,
            }

      case GET_CLIENT_DETAILS:
      return {
        ...state,
        clienteSelecionado: action.payload,
            }

    default:
      return state;
  }
}
