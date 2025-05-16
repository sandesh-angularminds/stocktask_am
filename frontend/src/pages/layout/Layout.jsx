import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth.context";
import { useEffect, useState } from "react";
import { getData } from "@/services/http-config";

export function Layout({ children }) {
  const { logout, user, setUser } = useAuth();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function getUserData() {
      const data = await getData("/user/self");
      if (data) {
        navigate("/dashboard");
      }
      setUser(data.data.user);
    }
    getUserData();
  }, []);
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
  useEffect(() => {
    console.log("user data", user);

    setUserData(user);
  }, [user]);
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
            {!user &&
              [...authRoutes].map((route) => {
                return (
                  <Link
                    key={route.path}
                    to={route.path}
                    className="text-sm text-muted-foreground hover:text-primary transition"
                  >
                    {route.label}
                  </Link>
                );
              })}
            {user &&
              [...routes].map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  {route.label}
                </Link>
              ))}
            {user && (
              <div className="flex justify-between items-center gap-1.5">
                <p className="font-bold ">
                  Hello {String(userData?.name).toUpperCase()}
                </p>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
