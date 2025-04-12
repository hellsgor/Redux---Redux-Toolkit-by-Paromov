import { configureStore, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

type CounterState = {
  counter: number;
};

type CountersState = Record<CounterId, CounterState | undefined>;

export type CounterId = string;

export type UserId = string;
export type User = {
  id: UserId;
  name: string;
  description: string;
};

const users: User[] = Array.from({ length: 3000 }, (_, index) => ({
  id: `${index + 11}`,
  name: `User ${index + 11}`,
  description: `Description for user ${index + 11}`,
}));

type UsersState = {
  entities: Record<UserId, User>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
};

type State = {
  counters: CountersState;
  users: UsersState;
};

export type IncrementAction = {
  type: "increment";
  payload: {
    counterId: CounterId;
  };
};

export type DecrementAction = {
  type: "decrement";
  payload: {
    counterId: CounterId;
  };
};

export type UserSelectedAction = {
  type: "userSelected";
  payload: UserId;
};

export type UserClearSelectedAction = {
  type: "userCleared";
};

export type UsersStoredAction = {
  type: "usersStored";
  payload: {
    users: User[];
  };
};

type Action =
  | IncrementAction
  | DecrementAction
  | UserSelectedAction
  | UserClearSelectedAction
  | UsersStoredAction;

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};
const initialCounterState: CounterState = { counter: 0 };
const initialCountersState: CountersState = {};
const initialState: State = {
  counters: {},
  users: initialUsersState,
};

const usersReducer = (
  state = initialUsersState,
  action: Action,
): UsersState => {
  switch (action.type) {
    case "usersStored": {
      const { users } = action.payload;
      return {
        ...state,
        entities: users.reduce(
          (acc, user) => {
            acc[user.id] = user;
            return acc;
          },
          {} as Record<UserId, User>,
        ),
        ids: users.map((user) => user.id),
      };
    }
    case "userSelected": {
      const userId = action.payload;
      return {
        ...state,
        selectedUserId: userId,
      };
    }
    case "userCleared": {
      return {
        ...state,
        selectedUserId: undefined,
      };
    }
    default:
      return state;
  }
};
const countersReducer = (
  state = initialCountersState,
  action: Action,
): CountersState => {
  switch (action.type) {
    case "increment": {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? initialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter + 1,
        },
      };
    }
    case "decrement": {
      const { counterId } = action.payload;
      const currentCounter = state[counterId] ?? initialCounterState;
      return {
        ...state,
        [counterId]: {
          ...currentCounter,
          counter: currentCounter.counter - 1,
        },
      };
    }
    default:
      return state;
  }
};

const reducer = (state = initialState, action: Action): State => {
  return {
    users: usersReducer(state.users, action),
    counters: countersReducer(state.counters, action),
  };
};

export const store = configureStore({
  reducer,
});

store.dispatch({
  type: "usersStored",
  payload: { users },
} satisfies UsersStoredAction);

export const selectCounter = (state: RootState, counterId: CounterId) =>
  state.counters[counterId];

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<RootDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<RootState>();
