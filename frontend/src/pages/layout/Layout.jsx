import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth.context";
import { useEffect, useState } from "react";
import { getData } from "@/services/http-config";
import { AddMoney } from "../bank/AddMoney";
import { ProfileDropdown } from "../profile/ProfileDropdown";
import { Bank } from "../bank/Bank";

export function Layout({ children }) {
  const { user, setUser, setNewTotalBalance } = useAuth();

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAddMoneyModal, setIsAddMoneyModal] = useState(false);
  const [isAddBankModal, setIsAddBankModal] = useState(false);
  useEffect(() => {
    async function getUserData() {
      const data = await getData("/user/self");
      console.log("data", data);
      if (Object.keys(data).length) {
        navigate("/dashboard");
        setUser(data.data.user);
        setNewTotalBalance();
      } else {
        navigate("/auth/login");
      }
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
    {
      label: "Stocks",
      path: "/stocks",
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="border-b border-border h-14">
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
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    `text-sm text-muted-foreground hover:text-primary transition ${
                      isActive ? "text-primary" : ""
                    }`
                  }
                >
                  {route.label}
                </NavLink>
              ))}
            {user && (
              <div className="flex justify-between items-center gap-1.5">
                <div>
                  <ProfileDropdown
                    open={dropdownOpen}
                    isAddMoneyModal={isAddBankModal}
                    setOpen={setDropdownOpen}
                    setIsAddMoneyModal={setIsAddMoneyModal}
                    setIsAddBankModal={setIsAddBankModal}
                  />
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="container mx-auto">
        {children}
        {/* all dialogs */}
        <AddMoney open={isAddMoneyModal} onOpenChange={setIsAddMoneyModal} />
        <Bank open={isAddBankModal} onOpenChange={setIsAddBankModal} />
      </main>
    </div>
  );
}
