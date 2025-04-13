import { createAppSelector, RootState } from "../../store";

export const selectSortedUsers = createAppSelector(
  (state: RootState) => state.users.ids,
  (state: RootState) => state.users.entities,
  (_: RootState, sort: "asc" | "desc") => sort,
  (ids, entities, sort) =>
    ids
      .map((id) => entities[id])
      .toSorted((userA, userB) => {
        if (sort === "asc") {
          return userA.name.localeCompare(userB.name);
        } else {
          return userB.name.localeCompare(userA.name);
        }
      }),
);

export const selectSelectedUser = (state: RootState) =>
  state.users.selectedUserId
    ? state.users.entities[state.users.selectedUserId]
    : undefined;
