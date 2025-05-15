import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth.context";

export function Layout({ children }) {
  const { logout } = useAuth();

  const routes = [
    {
      label: "Holdings",
      path: "/holdings",
    },
    {
      label: "Watchlist",
      path: "/watchlist",
    },
    {
      label: "Dashboard",
      path: "/dashboard",
    },
  ];

  const authRoutes = [
    {
      label: "Login",
      path: "/auth/login",
    },
    {
      label: "Register",
      path: "/auth/register",
    },
  ];

  function onLogout() {
    let response = confirm("Are you sure you want to logout?");
    if (response) logout();
    return;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-semibold text-primary">
            Stock Manager
          </div>

          {/* Nav Links */}
          <nav className="flex gap-4 items-center">
            {[...routes, ...authRoutes].map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="text-sm text-muted-foreground hover:text-primary transition"
              >
                {route.label}
              </Link>
            ))}
            <Button variant="outline" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
