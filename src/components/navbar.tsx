import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";
import { useAuth } from "./auth-context";
import { SearchInput } from "./search-input";
import { FilterButton } from "./filter-button";
import { AddDocumentButton } from "./add-document-button";
import { LoginButton } from "./login-button";
import { Settings, BookOpen } from "lucide-react";

export function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const showSearchAndFilters =
    isAuthenticated &&
    (location.pathname === "/documentos" ||
      location.pathname.startsWith("/admin"));

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link
              to={isAuthenticated ? "/documentos" : "/"}
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-bold">eduCar</span>
            </Link>
            {isAuthenticated && (
              <nav className="flex items-center space-x-6 text-sm font-medium ml-6">
                <Link
                  to="/documentos"
                  className={`transition-colors hover:text-foreground/80 flex items-center gap-1 ${
                    location.pathname === "/documentos"
                      ? "text-foreground"
                      : "text-foreground/60"
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  Biblioteca
                </Link>
                {user?.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    className={`transition-colors hover:text-foreground/80 flex items-center gap-1 ${
                      location.pathname.startsWith("/admin")
                        ? "text-foreground"
                        : "text-foreground/60"
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    Administração
                  </Link>
                )}
              </nav>
            )}
          </div>
          {showSearchAndFilters && (
            <div className="flex-1 ml-4 mr-1 flex items-center gap-2">
              <SearchInput />
              <FilterButton />
            </div>
          )}
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <AddDocumentButton />
                <UserNav />
              </>
            ) : (
              <LoginButton variant="outline" size="sm" />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
