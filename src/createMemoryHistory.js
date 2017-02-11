import createMemoryHistory from 'history/createMemoryHistory'
import History from './History'

export default (props) => new History(createMemoryHistory(props));
