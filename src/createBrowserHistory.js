import { createBrowserHistory } from "history";
import History from "./History";

export default (props) => new History(createBrowserHistory(props));
