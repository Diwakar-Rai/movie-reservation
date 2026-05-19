import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "@/store/store";

interface Props {
  children: React.ReactNode;
}
const ProtectedRoute = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
