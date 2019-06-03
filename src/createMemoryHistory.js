import { createMemoryHistory } from "history";
import History from "./History";

export default (props) => new History(createMemoryHistory(props));
