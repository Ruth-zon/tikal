import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/actions";
import { Container, Spinner, Table } from 'react-bootstrap'

function VehicleTable() {

  const dispatch = useDispatch();
  const { planets } = useSelector((state) => state.planetsReducer);
  const { peoples } = useSelector((state) => state.peoplesReducer);
  const { max } = useSelector((state) => state.vehiclesReducer);

  useEffect(() => {
    dispatch(actions.getMaxVehicle());
  }, [dispatch]);

  return (
    <Container className="mt-5 text-center">
      <h1>The max vehicle</h1>
      {!max.finished ? <Spinner animation="border" variant="primary" className="m-auto"/> :
        <Table bordered className="border-info">
          <tbody>
            <tr>
              <td>Vehicle name with the largest sum</td>
              <td>{max.vehicle?.name}</td>
            </tr>
            <tr>
              <td>Related home planets and their respective population</td>
              <td>{max.vehicle?.pilots.map(pilot => {
                let planet = planets[parseInt(peoples[parseInt(pilot?.split('/')[5])]?.homeworld)];
                return planet?.name + ':' + planet?.residents + ', ';
              })}</td>
            </tr>
            <tr>
              <td>Related pilot names</td>
              <td>{max.vehicle?.pilots.map(pilot => {
                return peoples[parseInt(pilot?.split('/')[5])]?.name + ", ";
              })}</td>
            </tr>
          </tbody>
        </Table>
      }
    </Container>
  );
}

export default VehicleTable;
