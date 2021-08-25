import { Provider } from "react-redux";
import VehicleTable from "./components/vehicleTable";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PlanetChart from "./components/planetChart";

function App() {
  return (
    <Provider store={store}>
      <VehicleTable />
      <PlanetChart />
    </Provider>
  );
}

export default App;
