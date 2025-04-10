import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
  CounterId,
  DecrementAction,
  IncrementAction,
  useAppDispatch,
  useAppSelector,
  selectCounter,
} from './store';

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
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

  console.log('render', counterId);

  return (
    <>
      <div className="card">
        <p>counter: {counterState?.counter ?? 0}</p>

        <button
          onClick={() =>
            dispatch({
              type: 'increment',
              payload: { counterId },
            } satisfies IncrementAction)
          }
        >
          increment
        </button>

        <button
          onClick={() =>
            dispatch({
              type: 'decrement',
              payload: { counterId },
            } satisfies DecrementAction)
          }
        >
          decrement
        </button>
      </div>
    </>
  );
}

export default App;
