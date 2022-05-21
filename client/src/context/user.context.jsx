import { createContext, useState } from "react";

// Actual Value that is to be accessed
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//Provider - the actual component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
