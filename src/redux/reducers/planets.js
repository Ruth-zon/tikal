import { produce } from "immer";
import createReducer from "./reducerUtils";

const initalStaste = {
  planets: [],
  planetsDataToChart: [],
  planetsNamesToChart: ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"],
};

const planetsFunctions = {
  addPlanet(state, action) {
    state.planets[action.payload.key] = action.payload.value;
  },
  addPlanetToCart(state, action) {
    state.planetsDataToChart = state.planetsDataToChart.concat(action.payload);
  },
  foundPlanetToCart(state, action) {
    state.planetsNamesToChart = state.planetsNamesToChart.filter(planet => planet !== action.payload);
  }
};

export default produce(
  (state, action) => createReducer(state, action, planetsFunctions),
  initalStaste
);
