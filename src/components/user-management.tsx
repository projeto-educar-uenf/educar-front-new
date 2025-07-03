import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth-provider";
import { fetchUsers, updateUser, getAdminStats } from "@/lib/api";
import useDebounce from "@/hooks/useDebounce";

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  // Query para buscar usuários
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users", debouncedSearchQuery],
    queryFn: () => fetchUsers(debouncedSearchQuery),
    staleTime: 30000,
  });

  // Query para estatísticas
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
    staleTime: 60000,
  });

  // Mutation para atualizar permissões de usuário
  const updateUserMutation = useMutation({
    mutationFn: ({
      userId,
      updates,
    }: {
      userId: string;
      updates: { role: "USER" | "ADMIN" };
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

  const handleToggleAdmin = async (userId: string, newValue: boolean) => {
    // Impedir que o usuário remova seus próprios privilégios de admin
    if (userId === currentUser?.id && !newValue) {
      toast({
        title: "Operação não permitida",
        description:
          "Você não pode remover seus próprios privilégios de administrador.",
        variant: "destructive",
      });
      return;
    }

    updateUserMutation.mutate({
      userId,
      updates: { role: newValue ? "ADMIN" : "USER" },
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const users = usersData?.users || [];

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Usuários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Administradores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAdmins}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Usuários Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Busca */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Usuários</CardTitle>
          <CardDescription>
            Gerencie usuários, permissões e acessos do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuário..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          {/* Tabela de usuários */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome completo</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Documentos
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Data de cadastro
                  </TableHead>
                  <TableHead>Administrador</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user.documentCount}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`admin-switch-${user.id}`}
                            checked={user.role === "ADMIN"}
                            onCheckedChange={(checked) =>
                              handleToggleAdmin(user.id, checked)
                            }
                            disabled={
                              (user.id === currentUser?.id &&
                                user.role === "ADMIN") ||
                              updateUserMutation.isPending
                            }
                          />
                          <Label htmlFor={`admin-switch-${user.id}`}>
                            {user.role === "ADMIN" ? "Sim" : "Não"}
                          </Label>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
