"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _userReducers = _interopRequireDefault(require("./userReducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mainReducer = (0, _redux.combineReducers)({
  usuario: _userReducers["default"]
});
var _default = mainReducer;
exports["default"] = _default;