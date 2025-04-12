import { useMemo, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  User,
  UserClearSelectedAction,
  UserSelectedAction,
} from "./store";

export function UsersList() {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const ids = useAppSelector((state) => state.users.ids);
  const entities = useAppSelector((state) => state.users.entities);
  const selectedUser = useAppSelector((state) =>
    state.users.selectedUserId
      ? state.users.entities[state.users.selectedUserId]
      : undefined,
  );

  const sortedUsers = useMemo(
    () =>
      ids
        .map((id) => entities[id])
        .toSorted((userA, userB) => {
          if (sortType === "asc") {
            return userA.name.localeCompare(userB.name);
          } else {
            return userB.name.localeCompare(userA.name);
          }
        }),
    [ids, entities, sortType],
  );

  const handleSortButtonsClick = () => {
    setSortType((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="relative flex flex-col gap-y-10">
      {selectedUser && <SelectedUser user={selectedUser} />}

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
          <UsersListItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export function UsersListItem({ user }: { user: User }) {
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
}

export function SelectedUser({ user }: { user: User }) {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch({ type: "userCleared" } satisfies UserClearSelectedAction);
  };

  return (
    <div className="fixed top-0 right-0 flex w-3xs flex-col gap-y-4 border p-4">
      <span className="font-bold">Selected user:</span>

      <div className="flex flex-col gap-y-0.5">
        <h3>name: {user.name}</h3>
        <span>description: {user.description}</span>
      </div>

      <button onClick={handleClick}>unselect</button>
    </div>
  );
}
