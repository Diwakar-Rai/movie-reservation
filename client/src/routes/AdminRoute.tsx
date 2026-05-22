import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";

interface Props {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user || user.role !== "ADMIN") {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default AdminRoute;
