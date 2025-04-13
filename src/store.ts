import {
  combineReducers,
  configureStore,
  createSelector,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { initialUsersList, usersReducer } from "./modules/users/users.slice";
import type { UsersStoredAction } from "./modules/users/users.slice";
import { countersReducer } from "./modules/counters/counters.slice";

const rootReducer = combineReducers({
  users: usersReducer,
  counters: countersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

export type RootDispatch = typeof store.dispatch;

store.dispatch({
  type: "usersStored",
  payload: { users: initialUsersList },
} satisfies UsersStoredAction);

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<RootDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<RootState>();
