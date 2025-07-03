import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sun } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">eduCar</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Button variant="outline" size="icon" disabled>
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
