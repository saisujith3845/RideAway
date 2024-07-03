import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        setData(userData);
      }
    }
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/notifications');
        setNotifications(response.data); 
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [token,notifications]);

  return (
    <DataContext.Provider value={{ data, setData, token, setToken,notifications,setNotifications }}>
      {children}
    </DataContext.Provider>
  );
};
