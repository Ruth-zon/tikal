import { createStore, combineReducers, applyMiddleware } from 'redux';
import { getPeoples, getPlanets, getMaxVehicle } from './middlewares/crud';
import vehiclesReducer from './reducers/vehicles';
import planetsReducer from './reducers/planets';
import peoplesReducer from './reducers/peoples'

const reducer = combineReducers({ vehiclesReducer ,planetsReducer, peoplesReducer });

const store = createStore(reducer, applyMiddleware(getMaxVehicle , getPlanets, getPeoples));
window.store = store

export default store;