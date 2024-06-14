
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivatAdmin = () => {
  const { user } = useSelector((state) => state.auth);
 // console.log(currentUser,"eeeeeeeeeeeeeeeee")

  return user.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivatAdmin;