import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userId, setUserId] = useState(null);

  const login = userId => {
    setUserId(userId);
  };

  const logout = () => {
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{userId, login, logout}}>
      {children}
    </UserContext.Provider>
  );
};
