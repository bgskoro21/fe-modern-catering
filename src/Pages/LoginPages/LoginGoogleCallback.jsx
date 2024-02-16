import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext, UserContext } from "../../Context";
import { LogoLoadingComponent } from "../../Component";
import { NotificationContext } from "../../Context/NotificationContext/NotificationContext";

const LoginGoogleCallback = () => {
  const { dispatch } = useContext(CartContext);
  const { dispatchUser } = useContext(UserContext);
  // const { getNotifikasi } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code") || "";

  useEffect(() => {
    handleLoginCallback(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle Callback Login Google
  const handleLoginCallback = async (code) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/google-callback?code=" + code);
      const result = await response.json();
      if (result.status) {
        navigate("/user/account/profile");
        // getNotifikasi();
        dispatchUser({ type: "SET_USER", payload: result.user });
        dispatch({ type: "GET_ITEM", payload: result.user.cart });
        localStorage.setItem("auth", result.token);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <LogoLoadingComponent />;
  }
};

export default LoginGoogleCallback;
