import { RootState } from "../../store";
import { CounterId } from "./counters.slice";

export const selectCounter = (state: RootState, counterId: CounterId) =>
  state.counters[counterId];
