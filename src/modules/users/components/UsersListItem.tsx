import { memo } from "react";
import { UserId, usersSlice } from "../users.slice";
import { useAppDispatch, useAppSelector } from "../../../store";

export const UsersListItem = memo(function UsersListItem({
  userId,
}: {
  userId: UserId;
}) {
  console.log(`render user ${userId}`);
  const user = useAppSelector((state) => state.users.entities[userId]);

  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(usersSlice.actions.select(userId));
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
