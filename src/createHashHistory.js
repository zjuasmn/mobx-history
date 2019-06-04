import { createHashHistory } from "history";
import History from "./History";

export default (props) => new History(createHashHistory(props));
