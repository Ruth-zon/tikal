import { actions } from "../actions";

const url = "https://swapi.dev/api";

export const getDataFromServer =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_DATA_FROM_SERVER") {
      //generic function to fetch data from server
      return fetch(`${url}/${action.payload}`)
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    }
    return next(action);
  };

export const getPlanets =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_PLANETS") {
      // get the planet and save in redux, to avoid unnecessary api calls
      // if it exist in redux- dont use fetch
      const existsPlanet =
        getState().planetsReducer.planets[parseInt(action.payload)];
      return existsPlanet
        ? new Promise((resolve) => resolve(existsPlanet))
        : dispatch(
            actions.getDataFromServer(`planets/${action.payload || ""}`)
          ).then((data) => {
            let resObj = {
              name: data.name,
              residents: data.residents?.length,
            };
            dispatch(
              actions.addPlanet({
                key: parseInt(data.url.split("/")[5]),
                value: resObj,
              })
            );
            return resObj;
          });
    }
    return next(action);
  };

export const getPeoples =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_PEOPLES") {
      // get the planet and save in redux, to avoid unnecessary api calls
      // if it exist in redux- dont use fetch
      const existsPeople =
        getState().peoplesReducer.peoples[parseInt(action.payload)];
      return existsPeople
        ? new Promise((resolve) => resolve(existsPeople))
        : dispatch(
            actions.getDataFromServer(`people/${action.payload || ""}`)
          ).then((data) => {
            let resObj = {
              name: data.name,
              homeworld: data.homeworld.split("/")[5],
            };
            dispatch(
              actions.addPeople({
                key: parseInt(data.url.split("/")[5]),
                value: resObj,
              })
            );
            return resObj;
          });
    }
    return next(action);
  };
