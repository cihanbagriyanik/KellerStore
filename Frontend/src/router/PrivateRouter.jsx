
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { access } = useSelector((state) => state.auth);
 // console.log(currentUser,"eeeeeeeeeeeeeeeee")

  return access ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
