import { createStore, combineReducers, applyMiddleware } from "redux";
import { getPeoples, getPlanets, getDataFromServer } from "./middlewares/crud";
import { getPlanetsToChart, getMaxVehicle } from "./middlewares/algo";
import vehiclesReducer from "./reducers/vehicles";
import planetsReducer from "./reducers/planets";
import peoplesReducer from "./reducers/peoples";

const reducer = combineReducers({
  vehiclesReducer,
  planetsReducer,
  peoplesReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(
    getMaxVehicle,
    getPlanets,
    getPeoples,
    getPlanetsToChart,
    getDataFromServer
  )
);
window.store = store;

export default store;
