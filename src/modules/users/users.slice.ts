import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;
export type User = {
  id: UserId;
  name: string;
  description: string;
};

type UsersState = {
  entities: Record<UserId, User>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
};

export const initialUsersList: User[] = Array.from(
  { length: 3000 },
  (_, index) => ({
    id: `${index + 11}`,
    name: `User ${index + 11}`,
    description: `Description for user ${index + 11}`,
  }),
);

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  selectedUserId: undefined,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    stored: (state, action: PayloadAction<{ users: User[] }>) => {
      const { users } = action.payload;

      state.entities = users.reduce(
        (acc, user) => {
          acc[user.id] = user;
          return acc;
        },
        {} as Record<UserId, User>,
      );
      state.ids = users.map((user) => user.id);
    },
    select: (state, action: PayloadAction<UserId>) => {
      state.selectedUserId = action.payload;
    },
    clearSelected: (state) => {
      state.selectedUserId = undefined;
    },
  },
  selectors: {
    selectedUser: (state) =>
      state.selectedUserId ? state.entities[state.selectedUserId] : undefined,

    sortedUsers: createSelector(
      (state: UsersState) => state.ids,
      (state: UsersState) => state.entities,
      (_: UsersState, sort: "asc" | "desc") => sort,
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
    ),
  },
});
