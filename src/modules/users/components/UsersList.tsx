import { useState } from "react";
import { useAppSelector } from "../../../store";
import { SelectedUser } from "./SelectedUser";
import { UsersListItem } from "./UsersListItem";
import { usersSlice } from "../users.slice";

export function UsersList() {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const sorted = useAppSelector((state) =>
    usersSlice.selectors.sortedUsers(state, sortType),
  );

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
        {sorted.map((user) => (
          <UsersListItem key={user.id} userId={user.id} />
        ))}
      </div>
    </div>
  );
}
