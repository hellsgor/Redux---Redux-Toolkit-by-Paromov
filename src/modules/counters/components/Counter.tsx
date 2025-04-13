import { useAppDispatch, useAppSelector } from "../../../store";
import { selectCounter } from "../counters.selectors";
import { CounterId } from "../counters.slice";

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useAppDispatch();
  const counterState = useAppSelector((state) =>
    selectCounter(state, counterId),
  );

  console.log(`render counter ${counterId}`);

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
