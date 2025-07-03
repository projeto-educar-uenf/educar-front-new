import { createContext, useContext, useEffect, useState, ReactNode } from "react"

// Tipos para autenticação
export interface User {
  id: string
  name: string
  email: string
  image?: string
  role: "USER" | "ADMIN"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}

// Usuários mock para demonstração
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@uenf.br",
    password: "123456",
    role: "USER",
    image: "https://github.com/shadcn.png"
  },
  {
    id: "2", 
    name: "Maria Santos",
    email: "maria.santos@uenf.br",
    password: "admin123",
    role: "ADMIN",
    image: "https://github.com/vercel.png"
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro.costa@pq.uenf.br", 
    password: "password",
    role: "USER"
  }
]

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar se existe usuário salvo no localStorage ao inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem("educar-user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Erro ao carregar usuário do localStorage:", error)
        localStorage.removeItem("educar-user")
      }
    }
    setIsLoading(false)
  }, [])

  // Salvar usuário no localStorage sempre que mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem("educar-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("educar-user")
    }
  }, [user])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Verificar se email é do domínio UENF
    if (!email.endsWith("@uenf.br") && !email.endsWith("@pq.uenf.br")) {
      setIsLoading(false)
      return { 
        success: false, 
        error: "Apenas emails do domínio @uenf.br ou @pq.uenf.br são permitidos" 
      }
    }

    // Buscar usuário nos dados mock
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      setIsLoading(false)
      return { success: true }
    } else {
      setIsLoading(false)
      return { 
        success: false, 
        error: "Email ou senha incorretos" 
      }
    }
  }

  const logout = () => {
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
