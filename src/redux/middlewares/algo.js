import { actions } from "../actions";

//algorithm for max vehicle:
// loop for every list of vehicles from server:
// 1. find all pilots of every vehicle
// 2. find the planet of every pilot
// 3. sum the planets residents- for all pilots in every vehicle
// 4. make sure not calculate one planet twice.
export const getMaxVehicle =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_MAX_VEHICLE") {
      return dispatch(
        actions.getDataFromServer(`vehicles/${action.payload || ""}`)
      ).then((data) => {
        data.results.forEach((vehicle) => {
          //check every vehicle data
          let sum = 0; // sum of population for all its pilots’ home planets in that vehicle
          let calcPlanets = []; // to prevent duplicate planet (if there is 2 pilot with same planet)
          vehicle.pilots.forEach((pilot) => {
            //looking for every pilot's planet
            const pilotId = pilot.split("/")[5];
            dispatch(actions.getPeoples(pilotId)).then((people) => {
              if (people)
                dispatch(actions.getPlanets(people.homeworld)).then(
                  (planet) => {
                    if (!calcPlanets[parseInt(people.homeworld)]) {
                      //if this planet didnt calculate yet
                      calcPlanets[parseInt(people.homeworld)] = true; //set as complete planet
                      sum += planet.residents || 0;
                      if (sum > getState().vehiclesReducer.max.sum)
                        dispatch(actions.setMax({ sum, vehicle })); //set the max if true
                    }
                  }
                );
            });
          });
        });
        if (data.next) {
          // looking for the next page of vehicles
          dispatch(actions.getMaxVehicle(data.next.split("/")[5]));
        } else dispatch(actions.setMaxFinished(true));
      });
    }
    return next(action);
  };

export const getPlanetsToChart =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (action.type === "GET_PLANETS_TO_CHART") {
      let planetsToFind = getState().planetsReducer.planetsNamesToChart;
      let next = action.payload;
      if (planetsToFind.length > 0)
        // if there is something to find
        dispatch(actions.getDataFromServer(`planets/${next || ""}`)) //get list data from server
          .then((data) => {
            //find every planet name in every planet in results
            data.results.forEach((planet) => {
              let findPlanet = planetsToFind.find((p) => p === planet.name);
              if (findPlanet) {
                dispatch(
                  actions.addPlanet({
                    //save in redux- to quick the first algorithm..
                    key: parseInt(planet.url.split("/")[5]),
                    value: {
                      name: planet.name,
                      residents: planet.residents?.length,
                    },
                  })
                );
                dispatch(actions.foundPlanetToCart(findPlanet)); //remove the planet from the list to find
                dispatch(actions.addPlanetToCart(planet)); // add the planet to the list to display
              }
            });
            if (data.next)
              //looking for next page of results
              dispatch(actions.getPlanetsToChart(data.next));
          });
    }
    return next(action);
  };
