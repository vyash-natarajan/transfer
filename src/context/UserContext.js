// src/context/UserContext.js
import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (locationId, password) => {
    // Perform validation (for simplicity, hardcoding the login credentials)
    const validLocations = {
      UC: 'password1',
      StarbucksUC: 'password2',
      // Add more locations with their passwords
    };

    if (validLocations[locationId] === password) {
      setUser({ locationId });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
