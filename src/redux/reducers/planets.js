import { enableMapSet, produce } from "immer";
import createReducer from "./reducerUtils";
enableMapSet();

const initalStaste = {
  planets: new Map(),
};

const planetsFunctions = {
  addPlanet(state, action) {
    state.planets.set(action.payload.key, action.payload.value);
  },
};

export default produce(
  (state, action) => createReducer(state, action, planetsFunctions),
  initalStaste
);
