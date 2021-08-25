import produce from "immer";
import createReducer from "./reducerUtils";

const initalStaste = {
  vehicles: [],
  max: { sum: 0 },
};

const vehiclesFunctions = {
  setVehicles(state, action) {
    state.vehicles = state.vehicles.concat(action.payload);
  },
  setMax(state, action) {
    state.max = action.payload;
  },
  setMaxFinished(state, action) {
    state.max.finished = action.payload;
  },
};

export default produce(
  (state, action) => createReducer(state, action, vehiclesFunctions),
  initalStaste
);
