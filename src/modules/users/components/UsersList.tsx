import { useState } from "react";
import { useAppSelector } from "../../../store";
import { SelectedUser } from "./SelectedUser";
import { selectSortedUsers } from "../users.selectors";
import { UsersListItem } from "./UsersListItem";

export function UsersList() {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");

  const sortedUsers = useAppSelector((state) =>
    selectSortedUsers(state, sortType),
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
        {sortedUsers.map((user) => (
          <UsersListItem key={user.id} userId={user.id} />
        ))}
      </div>
    </div>
  );
}
