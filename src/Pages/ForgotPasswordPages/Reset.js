import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import LoadingComponent from "../../Component/LoadingComponent/LoadingComponent";

export default function Reset() {
  const location = useLocation();
  const navigate = useNavigate();
  const values = queryString.parse(location.search);

  const setResetPassword = () => {
    localStorage.setItem("email", values.email);
    localStorage.setItem("token_reset", values.token);
    navigate("/auth/resetpassword");
  };
  useEffect(() => {
    // console.log(values);
    setResetPassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return <LoadingComponent />;
}
