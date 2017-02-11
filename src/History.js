import {observable, action, extendObservable} from 'mobx'

const reservedKeys = {location: true, action: true, length: true, dispose: true};

export default class History {
  history;
  @observable _location={};
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
    const update = action(() => {
      extendObservable(this._location, this.history.location);
      this.action = this.history.action;
      this.length = this.history.length;
    });
    
    update();
    this.unlisten = this.history.listen(update);
  }
  
  dispose() {
    this.unlisten();
    this.unlisten = () => null;
  }
}
