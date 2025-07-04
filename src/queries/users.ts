import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api";
import { UsersResponse } from "../lib/types";
import useDebounce from "../hooks/useDebounce";

// Hook para buscar usuários (admin)
export function useUsers(searchQuery = "") {
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  return useQuery<UsersResponse, Error>({
    queryKey: ["admin-users", debouncedSearchQuery],
    queryFn: () => fetchUsers(debouncedSearchQuery),
    staleTime: 30000,
  });
}
