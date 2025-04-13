import { memo } from "react";
import { UserId, UserSelectedAction } from "../users.slice";
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
