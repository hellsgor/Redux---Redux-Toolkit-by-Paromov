import { Counter } from "./Counter";

export function Counters() {
  return (
    <div className="relative mb-10 flex items-center justify-center gap-x-10">
      <Counter counterId="first" />
      <Counter counterId="second" />
    </div>
  );
}
