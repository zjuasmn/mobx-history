import createHistory from 'history/createMemoryHistory'
import {observable, computed} from 'mobx'

export default class History {
  history;
  @observable _location;
  @observable action;
  set location(location) {
    this.history.push(location);
  }
  
  get location() {
    return this._location;
  }
  
  unsubscribe = () => {
  };
  subscribe = () => {
    this.unsubscribe();
    this.unsubscribe = this.history.listen((location, action) => {
      this._location = location;
      this.action = action;
    });
  };
  
  constructor(history = createHistory()) {
    this.history = history;
    this._location = history.location;
    this.subscribe();
  }
  
  /*
   * History methods
   */
  push = ::this.history.push;
  
  replace = ::this.history.replace;
  
  go = ::this.history.go;
  
  goBack = ::this.history.goBack;
  
  goForward = ::this.history.goForward;
  
  createHref = ::this.history.createHref;
  
}