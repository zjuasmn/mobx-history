const createMemoryHistory = require('..').createMemoryHistory;
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

