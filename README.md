# mobx-history [![npm package][npm-badge]][npm] [![GitHub issues](https://img.shields.io/github/issues/zjuasmn/mobx-history.svg)]()

[npm-badge]: https://img.shields.io/npm/v/mobx-history.svg?style=flat-square
[npm]: https://www.npmjs.org/package/mobx-history

Mobx wrapper of [history](https://github.com/ReactTraining/history), make it observable! Try it here [runkit.com](https://runkit.com/zjuasmn/mobx-history).

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save mobx-history

Using [yarn](https://yarnpkg.com/):

    $ yarn add mobx-history

Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else, get the `History` class:

```js
// using ES6 modules
import History from 'mobx-history'

// using CommonJS modules
var History = require('mobx-history').History
```

## Usage

Initalize `mobx-history` with `history` object:

```js
import createMemoryHistoryfrom 'history/createMemoryHistory'
let history = new History(createMemoryHistory())

// or just change 'history' to 'mobx-history'
import createMemoryHistory from 'mobx-history/createMemoryHistory'
var history = createMemoryHistory();
```

Then use `mobx-history` object like original `history` object, so few code changed in transitioning `history` to `mobx-history`. Original `history` object can be visited in property `history`.

`mobx-history` object made three properties `length`, `location`, `action` observable, so no more listener needed. It also provide a location setter to perform `history.location = ...` as `history.push(...)`. call `dispose` method to stop listening from original `history`.

See below sample for more detail, or you can play it in [runkit.com](https://runkit.com/zjuasmn/mobx-history)

```js
const createMemoryHistory = require('mobx-history').createMemoryHistory;
const {autorun} = require('mobx');

let history = createMemoryHistory();

autorun(()=>{console.log('pathname ' + history.location.pathname)});
autorun(()=>{console.log('action ' + history.action)});
autorun(()=>{console.log('length ' + history.length)});
autorun(()=>{console.log('search ' + history.location.search)});
// > pathname /
// > action POP
// > length 1
// > search

history.location = '/path';
// > pathname /path
// > action PUSH
// > length 2

history.push('/path2');
// > print '/path2'
// > length 3

history.replace('/path3');
// > pathname /path3
// > action REPLACE

history.replace({pathname:'/path3',search:'?q=1'});
// > search ?q=1


// Don't forget to dispose, or it will keep listening.
history.dispose();
```
