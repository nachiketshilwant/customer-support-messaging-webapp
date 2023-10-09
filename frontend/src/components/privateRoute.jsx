import { Navigate, Outlet } from "react-router-dom";


const PrivateRoute = (props) => {

  return props.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
