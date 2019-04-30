import { getUser } from "../../redux/users/actions";

const fetchData = ({ store }) => {
  return store.dispatch(getUser());
};

export default fetchData;
