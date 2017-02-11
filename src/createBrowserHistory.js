import createBrowserHistory from 'history/createBrowserHistory'
import History from './History'

export default (props) => new History(createBrowserHistory(props));
