import { Provider } from "react-redux";
import VehicleTable from "./components/vehicleTable";
import store from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <VehicleTable />
    </Provider>
  );
}

export default App;
