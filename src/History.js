import {observable, action, extendObservable} from 'mobx'
const debug = require('debug')('mobx-history');
const reservedKeys = {location: true, action: true, length: true, dispose: true};

export default class History {
  history;
  @observable _location = {};
  @observable action;
  @observable length;
  
  set location(location) {
    this.history.push(location);
  }
  
  get location() {
    return this._location;
  }
  
  constructor(history) {
    this.history = history;
    for (let key in history) {
      (!reservedKeys[key]) &&
      ((prop) => {
        Object.defineProperty(this, prop, {
          get(){
            return this.history[prop]
          }
        })
      })(key);
    }
    const update = action((location, action) => {
      debug(this.location, location, action);
      extendObservable(this._location, this.history.location);
      this.action = this.history.action;
      this.length = this.history.length;
    });
    
    debug('begin listen');
    let handler = null;
    this.startListen = () => {
      if (handler) return;
      update();
      handler = this.history.listen(update);
      this.stopListen = () => {
        handler && handler();
        handler = null;
      }
    };
    this.startListen();
  }
}
