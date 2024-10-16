import "./styles.css";
import { HelloWorld } from "./components/HelloWorld";

const CONFIG = {
  entityType: "CASE",
  filter: {
    field: "fields._c_status",
    value: "WORK",
    filterType: "NOT_EQUALS",
  },
};

const CONFIG2 = {
  entityType: "CASE",
  filter: {
    filterType: "AND",
    filters: [
      {
        filterType: "EQUALS",
        field: "record.caseNu",
        value: 123,
      },
      {
        filterType: "EQUALS",
        field: "record.fields._c_status",
        value: "IN_PROGRESS",
      },
    ],
  },
};

export default function App() {
  return (
    <div className="App">
      <HelloWorld visibilityConfig={CONFIG2} />
    </div>
  );
}
