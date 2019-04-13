import Loadable from "react-loadable";

export default function WithLoadable(opts){
  return Loadable(Object.assign({
    loading: () => null
  }, opts));
}
