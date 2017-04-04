import {action, Atom, extendObservable, observable} from "mobx";
const debug = require('debug')('mobx-history');
const reservedKeys = {location: true, action: true, length: true};

export default class History {
  atom;
  history;
  @observable _location = {};
  @observable _action;
  @observable _length;
  
  set location(location) {
    this.history.push(location);
  }
  
  get location() {
    this.atom.reportObserved();
    return this._location;
  }
  
  get action() {
    this.atom.reportObserved();
    return this._action;
  }
  
  get length() {
    this.atom.reportObserved();
    return this._length;
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
      this._action = this.history.action;
      this._length = this.history.length;
    });
    
    let handler = null;
    this.atom = new Atom('History',
      () => {
        debug('begin listen');
        update();
        handler = this.history.listen(update);
      },
      () => {
        debug('stop listen');
        handler && handler();
        handler = null;
      }
    );
  }
}
