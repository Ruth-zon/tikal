import { enableMapSet, produce } from "immer";
import createReducer from "./reducerUtils";
enableMapSet();

const initalStaste = {
  peoples: new Map(),
};

const peoplesFunctions = {
  addPeople(state, action) {
    state.peoples.set(action.payload.key, action.payload.value);
  },
};

export default produce(
  (state, action) => createReducer(state, action, peoplesFunctions),
  initalStaste
);
