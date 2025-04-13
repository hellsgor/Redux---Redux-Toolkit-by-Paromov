import "./App.css";
import { Counters } from "./modules/counters/components/Counters";
import { UsersList } from "./modules/users/components/UsersList";

function App() {
  return (
    <>
      <Counters />
      <UsersList />
    </>
  );
}

export default App;
