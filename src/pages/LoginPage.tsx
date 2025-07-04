import { Navigate } from "react-router-dom";
import { useAuth } from "@/components/auth-context";
import { LoginPage as LoginPageComponent } from "@/components/login-button";

export function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirecionar usuários já logados
  if (isAuthenticated) {
    return <Navigate to="/documentos" replace />;
  }

  return <LoginPageComponent />;
}
