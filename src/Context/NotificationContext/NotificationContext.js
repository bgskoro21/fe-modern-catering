import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifAmount, setNotifAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      getNotifikasi();
      const interval = setInterval(getNotifikasi, 10000);
      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line
  }, [localStorage.getItem("auth")]);
  const getNotifikasi = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/amount-notifikasi", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      },
    });
    const result = await response.json();
    if (result.status) {
      setNotifAmount(result.amount);
    } else {
      localStorage.removeItem("auth");
      navigate("/auth/login");
    }
  };

  return <NotificationContext.Provider value={{ notifAmount }}>{children}</NotificationContext.Provider>;
};
