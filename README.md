# mobx-history [![npm package][npm-badge]][npm] [![GitHub issues](https://img.shields.io/github/issues/zjuasmn/mobx-history.svg)]() [![Build Status](https://travis-ci.org/zjuasmn/mobx-history.svg?branch=master)](https://travis-ci.org/zjuasmn/mobx-history) [![Coverage Status](https://coveralls.io/repos/github/zjuasmn/mobx-history/badge.svg?branch=master)](https://coveralls.io/github/zjuasmn/mobx-history?branch=master)

[npm-badge]: https://img.shields.io/npm/v/mobx-history.svg?style=flat-square
[npm]: https://www.npmjs.org/package/mobx-history

Mobx wrapper of [history](https://github.com/ReactTraining/history), make it observable! `mobx-history` object made three properties `length`, `location`, `action` observable, so no more listener needed!

## Installation

Using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/):
```bash
$ npm install --save mobx-history
or
$ yarn add mobx-history
```

Use CDN

- Include mobx first [https://unpkg.com/mobx/lib/mobx.umd.js](https://unpkg.com/mobx/lib/mobx.umd.js)
- The include [https://unpkg.com/mobx-history/umd/mobx-history.js](https://unpkg.com/mobx-history/umd/mobx-history.js)

Then get the `History` class:

```js
// using ES6 modules
import History from 'mobx-history'

// using CommonJS modules
var History = require('mobx-history').History

// using CDN
var History = mobxHistory.History
```

## Usage

Assuming you know how to use `history`, if not, check its [document](https://github.com/ReactTraining/history).

  Initalize `mobx-history` with `history` object:

```js
import createMemoryHistoryfrom 'history/createMemoryHistory'
let history = new History(createMemoryHistory())

// or just change 'history' to 'mobx-history'
import createMemoryHistory from 'mobx-history/createMemoryHistory'
var history = createMemoryHistory();
```

Then use `mobx-history` object like original `history` object, so few code changed in transitioning `history` to `mobx-history`. Original `history` object can be visited in property `history`.

`mobx-history` object made three properties `length`, `location`, `action` observable, so no more listener needed. It also provide a location setter to perform `history.location = ...` as `history.push(...)`. call `stopListen` method to stop listening from original `history`.

## Props

- **`@observable` length**
  -  type: `number`

The number of entries in the history stack.

- **`@observable` location**
  -  type: `object`
  
The current location. `history.location=...` would trigger `history.push(...)`

- **`@observable` action**
  -  type: `string`

The current navigation action.

- **startListen**
  - type: `function`

let `mobx-history` in sync with `history`, this would be call automatically with `new History(...)` or `createXXXHistory`.

- **stopListen**
  - type: `function`

`stopListen` should be called to avoid memory leak.

- **history**
  - type: `object`

Original `history` object.

- **...props**

Other properties would be same as in original `history` object. See [`history document`](https://github.com/ReactTraining/history#properties)


## Demo

Live example is in [Codepen](http://codepen.io/zjuasmn/pen/OWqVrz?editors=0011)

```js
  const createMemoryHistory = mobxHistory.createMemoryHistory;
  const {autorun} = mobx;

  let h = createMemoryHistory();

  autorun(()=>{console.log('pathname ' + h.location.pathname)});
  autorun(()=>{console.log('action ' + h.action)});
  autorun(()=>{console.log('length ' + h.length)});
  autorun(()=>{console.log('search ' + h.location.search)});
  // > pathname /
  // > action POP
  // > length 1
  // > search

  h.location = '/path';
  // > pathname /path
  // > action PUSH
  // > length 2

  h.push('/path2');
  // > print '/path2'
  // > length 3

  h.replace('/path3');
  // > pathname /path3
  // > action REPLACE

  h.replace({pathname:'/path3',search:'?q=1'});
  // > search ?q=1

  // Don't forget to dispose, or it will keep listening.
  // h.stopListen();
```
