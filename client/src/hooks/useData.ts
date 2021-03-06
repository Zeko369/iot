import { IState, Action } from "../@types";

const URL = "http://192.168.1.6:5000/";

export const initState: IState = {
  loading: false,
  data: [],
  error: ""
};

export const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: "" };
    case "error":
      return { ...state, error: action.payload, loading: false };
    case "success":
      return { ...state, data: action.payload, loading: false };
    default:
      return state;
  }
};

export const get = (dispatch: React.Dispatch<Action>) => () => {
  dispatch({ type: "loading" });
  return fetch(URL)
    .then((res) => res.json())
    .then((data) => dispatch({ type: "success", payload: data }))
    .catch((err) => dispatch({ type: "error", payload: err }));
};
