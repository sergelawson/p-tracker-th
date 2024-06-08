import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

type Role = "driver" | "tracker" | "admin";

const withRole = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  role: Role
): React.FC<P> => {
  const MyComponent: React.FC<P> = (props) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (user?.role && user?.role !== role) {
        navigate(`/${user.role}`);
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return MyComponent;
};

export default withRole;
