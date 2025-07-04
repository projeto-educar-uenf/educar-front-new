import { Button } from './ui/button';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from './auth-context';

interface LoginButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function LoginButton({ variant = 'default', size = 'default', className }: LoginButtonProps) {
  const { login, isLoading } = useAuth();

  return (
    <Button
      onClick={login}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      <FcGoogle className="w-5 h-5 mr-2" />
      Entrar com Google
    </Button>
  );
}

interface LoginPageProps {
  onLogin?: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const { login, isLoading } = useAuth();

  const handleLogin = () => {
    login();
    onLogin?.();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <img
            src="/images/logo-preta.webp"
            alt="Educar UENF"
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Bem-vindo ao Educar UENF
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Acesse sua conta institucional para continuar
          </p>
        </div>
        
        <div className="mt-8">
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            <FcGoogle className="w-5 h-5 mr-3" />
            {isLoading ? 'Carregando...' : 'Entrar com Google'}
          </Button>
          
          <p className="mt-4 text-xs text-gray-500 text-center">
            Você precisa de uma conta @uenf.br para acessar o sistema
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginButton;
