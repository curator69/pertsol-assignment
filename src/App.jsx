import Map from "./components/Map";
import Table from "./components/Table";

function App() {
  const [map, setMap] = useState(true);

  return <>{map ? <Map /> : <Table />}</>;
}

export default App;
