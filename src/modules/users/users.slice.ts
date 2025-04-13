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

export type UserSelectedAction = {
  type: "userSelected";
  payload: UserId;
};

export type UserClearSelectedAction = {
  type: "userCleared";
};

export type UsersStoredAction = {
  type: "usersStored";
  payload: {
    users: User[];
  };
};

type Action = UserSelectedAction | UserClearSelectedAction | UsersStoredAction;

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

export const usersReducer = (
  state = initialUsersState,
  action: Action,
): UsersState => {
  switch (action.type) {
    case "usersStored": {
      const { users } = action.payload;
      return {
        ...state,
        entities: users.reduce(
          (acc, user) => {
            acc[user.id] = user;
            return acc;
          },
          {} as Record<UserId, User>,
        ),
        ids: users.map((user) => user.id),
      };
    }
    case "userSelected": {
      const userId = action.payload;
      return {
        ...state,
        selectedUserId: userId,
      };
    }
    case "userCleared": {
      return {
        ...state,
        selectedUserId: undefined,
      };
    }
    default:
      return state;
  }
};
