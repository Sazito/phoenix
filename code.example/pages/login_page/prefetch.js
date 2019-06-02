import { getCurrentUser } from "../../redux/users/actions";

const fetchData = ({ store }) => {
  return store.dispatch(getCurrentUser());
};

export default fetchData;
