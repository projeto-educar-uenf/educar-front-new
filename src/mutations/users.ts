import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api";
import { UpdateUserRequest } from "../lib/types";
import { toast } from "../components/ui/use-toast";

// Mutation para atualizar permissões de usuário
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      updates,
    }: {
      userId: string;
      updates: UpdateUserRequest;
    }) => updateUser(userId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast({
        title: "Permissão atualizada",
        description: "As permissões do usuário foram atualizadas com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Erro:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar as permissões do usuário.",
        variant: "destructive",
      });
    },
  });
}
