import { useState } from "react"
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading, isAuthenticated } = useAuth()

  // Redirecionar usuários já logados
  if (isAuthenticated) {
    return <Navigate to="/documentos" replace />
  }

  // Pegar a página de origem para redirecionar após login
  const from = location.state?.from?.pathname || "/documentos"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    const result = await login(email, password)

    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.error || "Erro ao fazer login")
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        background: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 50%, #94a3b8 100%)',
      }}
    >
      {/* Modo dark sobrepõe com outro gradiente */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-slate-900 dark:via-gray-800 dark:to-slate-700"></div>
      <Card className="w-full max-w-md relative z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link to="/" className="text-2xl font-bold">
              eduCar
            </Link>
          </div>
          <CardTitle className="text-2xl text-center">Entrar</CardTitle>
          <CardDescription className="text-center">
            Acesse sua conta para gerenciar documentos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              👥 Usuários de Demonstração:
            </h3>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <div><strong>Usuário:</strong> joao.silva@uenf.br | Senha: 123456</div>
              <div><strong>Admin:</strong> maria.santos@uenf.br | Senha: admin123</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@uenf.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <div className="text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              Voltar ao início
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
