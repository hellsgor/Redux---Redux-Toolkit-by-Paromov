// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import "./App.css";
import {
  CounterId,
  useAppDispatch,
  useAppSelector,
  selectCounter,
} from "./store";

function App() {
  return (
    <>
      <div className="relative mb-10 flex items-center justify-center gap-x-10">
        <Counter counterId="first" />
        <Counter counterId="second" />
      </div>
      <Counter counterId="first" />
      <Counter counterId="second" />
      <h1>Vite + React</h1>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
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
