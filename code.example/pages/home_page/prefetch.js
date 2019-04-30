import { getPost } from "../../redux/posts/actions";

const fetchData = ({ store }) => {
  return store.dispatch(getPost());
};

export default fetchData;
