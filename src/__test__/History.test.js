import {autorun, toJS} from "mobx";
import History from "../History";
import assert from "assert";
import createHistory from "history/createMemoryHistory";
import {expect} from "chai";

describe('History', () => {
  let history, raw;
  beforeEach(() => {
    raw = createHistory();
    history = new History(raw);
  });
  
  it('original history can be visit by "history"', () => {
    assert(history.history === raw);
  });
  
  it('location should be observable', () => {
    let stack = [];
    let stop = autorun(() => {
      stack.push(history.location.pathname);
    });
    assert(stack.length === 1 && stack[0] === '/');
    
    history.location = {pathname: '/sub'};
    assert(stack.length === 2 && stack[1] === '/sub');
    
    // pathname can be set directly
    history.location = '/sub1';
    assert(stack.length === 3);
    
    // same pathname will not trigger autorun.
    history.push('/sub1');
    assert(stack.length === 3);
    
    stop();
  });
  
  it('action should be observable', () => {
    let stack = [];
    let stop = autorun(() => {
      stack.push(history.action);
    });
    assert(stack.length === 1 && stack[0] === 'POP');
    
    history.location = {pathname: '/sub'};
    assert(stack.length === 2 && stack[1] === 'PUSH');
    
    // action is still 'PUSH'
    history.location = '/sub1';
    assert(stack.length === 2);
    
    
    history.replace('/sub1');
    assert(stack.length === 3 && stack[2] === 'REPLACE');
    
    history.goBack();
    assert(stack.length === 4 && stack[3] === 'POP');
    stop();
  });
  
  it('length should be observable', () => {
    let stack = [];
    let stop = autorun(() => {
      stack.push(history.length);
    });
    assert(stack.length === 1 && stack[0] === 1);
    
    history.location = {pathname: '/sub'};
    assert(stack.length === 2 && stack[1] === 2);
    
    // replace will not change length
    history.replace('/sub1');
    assert(stack.length === 2);
    
    // go will not change length
    history.goBack();
    assert(stack.length === 2);
    stop();
  });
});