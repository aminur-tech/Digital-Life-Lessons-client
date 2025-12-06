import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "./useAuth";

export default function useRole() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return { role, isLoading };
}
