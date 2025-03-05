import { Navigate, useNavigate } from "react-router-dom";
import { signout } from "./auth";
import { useEffect } from "react";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    signout();
    navigate("/login");
  }, []);
}

export default Logout;
