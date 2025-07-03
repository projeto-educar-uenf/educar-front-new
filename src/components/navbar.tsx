import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { UserNav } from "./user-nav"
import { useAuth } from "./auth-provider"

export function Navbar() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">eduCar</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <UserNav />
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
