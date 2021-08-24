import { actions } from "../actions";

const url = "https://swapi.dev/api";

export const getMaxVehicle =
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {
        if (action.type === "GET_MAX_VEHICLE") {
          return fetch(`${url}/vehicles/${action.payload || ""}`)
            .then((response) => response.json())
            .then((data) => {
              data.results.forEach((vehicle) => {
                console.log("vehicle ", vehicle, vehicle.pilots);
                let sum = 0;
                let calcPeoples = [];
                let calcPlanets = [];
                vehicle.pilots.forEach((pilot) => {
                  const pilotId = pilot.split("/")[5];
                  dispatch(actions.getPeoples(pilotId)).then((people) => {
                    if (!calcPeoples[parseInt(pilotId)]) {
                      calcPeoples[parseInt(pilotId)] = true;
                      if (people)
                        dispatch(actions.getPlanets(people.homeworld)).then(
                          (planet) => {
                            if (!calcPlanets[parseInt(people.homeworld)]) {
                              calcPlanets[parseInt(people.homeworld)] = true;
                              sum += planet.residents || 0;
                              if (sum > getState().vehiclesReducer.max.sum)
                                dispatch(actions.setMax({ sum, vehicle }));
                            }
                          }
                        );
                    }
                  });
                });
              });
              // dispatch(actions.setVehicles(data.results));
              if (data.next) {
                dispatch(actions.getMaxVehicle(data.next.split("/")[5]));
              }
            });
        }
        return next(action);
      };

export const getPlanets =
  ({ dispatch, getState }) =>
    (next) =>
      (action) => {
        if (action.type === "GET_PLANETS") {
          const existsPlanet = getState().planetsReducer.planets.get(
            action.payload
          );
          return existsPlanet
            ? new Promise((resolve) => resolve(existsPlanet))
            : fetch(`${url}/planets/${action.payload || ""}`)
              .then((response) => response.json())
              .then((data) => {
                let resObj = {
                  name: data.name,
                  residents: data.residents?.length,
                };
                dispatch(
                  actions.addPlanet({
                    key: data.url.split("/")[5],
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
          const existsPeople = getState().peoplesReducer.peoples.get(
            action.payload
          );
          return existsPeople
            ? new Promise((resolve) => resolve(existsPeople))
            : fetch(`${url}/people/${action.payload || ""}`)
              .then((response) => response.json())
              .then((data) => {
                let resObj = {
                  name: data.name,
                  homeworld: data.homeworld.split("/")[5],
                };
                dispatch(
                  actions.addPeople({
                    key: data.url.split("/")[5],
                    value: resObj,
                  })
                );
                return resObj;
              });
        }
        return next(action);
      };
