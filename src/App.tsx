// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import "./App.css";
import {
  CounterId,
  useAppDispatch,
  useAppSelector,
  selectCounter,
} from "./store";
import { UsersList } from "./UsersList";

function App() {
  return (
    <>
      <div className="relative mb-10 flex items-center justify-center gap-x-10">
        <Counter counterId="first" />
        <Counter counterId="second" />
      </div>

      <UsersList />
    </>
  );
}

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useAppDispatch();
  const counterState = useAppSelector((state) =>
    selectCounter(state, counterId),
  );

  return (
    <>
      <div className="flex items-center gap-x-4">
        <button
          onClick={() =>
            dispatch({
              type: "increment",
              payload: { counterId },
            })
          }
        >
          increment
        </button>

        <p>
          {counterId}: {counterState?.counter ?? 0}
        </p>

        <button
          onClick={() =>
            dispatch({
              type: "decrement",
              payload: { counterId },
            })
          }
        >
          decrement
        </button>
      </div>
    </>
  );
}

export default App;
