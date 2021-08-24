import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/actions";

function VehicleTable() {
  const dispatch = useDispatch();
  const { planets } = useSelector((state) => state.planetsReducer);
  const { vehicles } = useSelector((state) => state.vehiclesReducer);
  useEffect(() => {
    dispatch(actions.getVehicles());
  }, [dispatch]);
  useEffect(() => {
    
  }, [vehicles, dispatch]);

  return <div>hi</div>;
}

export default VehicleTable;
