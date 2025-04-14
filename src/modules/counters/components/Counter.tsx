import { useAppDispatch, useAppSelector } from "../../../store";
import {
  CounterId,
  decrementAction,
  incrementAction,
  selectCounter,
} from "../counters.slice";

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useAppDispatch();
  const counterState = useAppSelector((state) =>
    selectCounter(state, counterId),
  );

  console.log(`render counter ${counterId}`);

  return (
    <>
      <div className="flex items-center gap-x-4">
        <button onClick={() => dispatch(incrementAction({ counterId }))}>
          increment
        </button>

        <p>
          {counterId}: {counterState?.counter ?? 0}
        </p>

        <button onClick={() => dispatch(decrementAction({ counterId }))}>
          decrement
        </button>
      </div>
    </>
  );
}
