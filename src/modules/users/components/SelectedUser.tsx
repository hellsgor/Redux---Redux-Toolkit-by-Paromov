import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { usersSlice } from "../users.slice";

export const SelectedUser = memo(function SelectedUser() {
  const selectedUser = useAppSelector((state) =>
    usersSlice.selectors.selectedUser(state),
  );

  console.log("render SelectedUser");
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(usersSlice.actions.clearSelected());
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
