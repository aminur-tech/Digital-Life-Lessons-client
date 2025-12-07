import { Navigate } from "react-router";
import useRole from "../Hooks/useRole";

export default function AdminRoute({ children }) {
  const { role, isLoading } = useRole();

  if (isLoading) return <div className="text-center">Checking role...</div>;

  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
}
