import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        setData(userData);
      }
    }
  }, [token]);

  return (
    <DataContext.Provider value={{ data, setData, token, setToken }}>
      {children}
    </DataContext.Provider>
  );
};
