'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMemoryHistory = exports.createHashHistory = exports.createBrowserHistory = exports.History = undefined;

var _History2 = require('./History');

var _History3 = _interopRequireDefault(_History2);

var _createBrowserHistory2 = require('./createBrowserHistory');

var _createBrowserHistory3 = _interopRequireDefault(_createBrowserHistory2);

var _createHashHistory2 = require('./createHashHistory');

var _createHashHistory3 = _interopRequireDefault(_createHashHistory2);

var _createMemoryHistory2 = require('./createMemoryHistory');

var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.History = _History3.default;
exports.default = History;
exports.createBrowserHistory = _createBrowserHistory3.default;
exports.createHashHistory = _createHashHistory3.default;
exports.createMemoryHistory = _createMemoryHistory3.default;
// export { createLocation, locationsAreEqual } from 'history/LocationUtils'
// export { parsePath, createPath } from 'history/PathUtils'