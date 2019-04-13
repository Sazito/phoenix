import {getUser} from "../../redux/user/actions";

const fetchData = ({store}) => {
  return store.dispatch(getUser())
};

export default fetchData;