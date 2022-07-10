import React, { useReducer } from "react";
import userReducer from "./user-reducer";
import UserContext from "./user-context";
import { LOGIN_USER, LOGOUT_USER } from "./user-actions";

const UserState = (props) => {
  const initialState = {
    isLoggedIn: false,
    user: {},
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const loginUser = (user) => {
    dispatch({
      type: LOGIN_USER,
      payload: {
        isLoggedIn: true,
        user: user,
      },
    });
  };

  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER,
    });
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
