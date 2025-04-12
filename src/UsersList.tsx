import { memo, useState } from "react";
import {
  createAppSelector,
  useAppDispatch,
  useAppSelector,
  UserClearSelectedAction,
  UserSelectedAction,
  RootState,
  UserId,
} from "./store";

const selectSortedUsers = createAppSelector(
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

// const selectSelectedUser = (state: RootState) =>
//   state.users.selectedUserId
//     ? state.users.entities[state.users.selectedUserId]
//     : undefined;

export function UsersList() {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const sortedUsers = useAppSelector((state) => {
    return selectSortedUsers(state, sortType);
  });
  // const selectedUser = useAppSelector(selectSelectedUser);

  const handleSortButtonsClick = () => {
    setSortType((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  console.log("render UsersList");

  return (
    <div className="relative flex flex-col gap-y-10">
      <SelectedUser />

      <div className="flex w-full items-center justify-center gap-x-2">
        sort:
        <button onClick={handleSortButtonsClick} disabled={sortType === "asc"}>
          asc
        </button>
        <button onClick={handleSortButtonsClick} disabled={sortType === "desc"}>
          desc
        </button>
      </div>

      <div className="flex flex-col gap-y-4">
        {sortedUsers.map((user) => (
          <UsersListItem key={user.id} userId={user.id} />
        ))}
      </div>
    </div>
  );
}

const UsersListItem = memo(function UsersListItem({
  userId,
}: {
  userId: UserId;
}) {
  console.log(`render user ${userId}`);
  const user = useAppSelector((state) => state.users.entities[userId]);

  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch({
      type: "userSelected",
      payload: user.id,
    } satisfies UserSelectedAction);
  };

  return (
    <li key={user.id} className="flex flex-col gap-y-1">
      <span>{user.name}</span>
      <button onClick={handleClick} className="w-fit">
        select
      </button>
    </li>
  );
});

export const SelectedUser = memo(function SelectedUser() {
  const selectedUser = useAppSelector((state) =>
    state.users.selectedUserId
      ? state.users.entities[state.users.selectedUserId]
      : undefined,
  );

  console.log("render SelectedUser");
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch({ type: "userCleared" } satisfies UserClearSelectedAction);
  };

  if (!selectedUser) {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 flex w-3xs flex-col gap-y-4 border p-4">
      <span className="font-bold">Selected user:</span>

      <div className="flex flex-col gap-y-0.5">
        <h3>name: {selectedUser.name}</h3>
        <span>description: {selectedUser.description}</span>
      </div>

      <button onClick={handleClick}>unselect</button>
    </div>
  );
});
