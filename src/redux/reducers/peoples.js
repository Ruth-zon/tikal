import { produce } from "immer";
import createReducer from "./reducerUtils";

const initalStaste = {
  peoples: [],
};

const peoplesFunctions = {
  addPeople(state, action) {
    state.peoples[action.payload.key] = action.payload.value;
  },
};

export default produce(
  (state, action) => createReducer(state, action, peoplesFunctions),
  initalStaste
);
