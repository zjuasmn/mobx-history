import createHashHistory from "history/createHashHistory";
import History from "./History";

export default (props) => new History(createHashHistory(props));
