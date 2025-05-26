import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth.context";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function ProfileDropdown({
  open,
  setOpen,
  setIsAddMoneyModal,
  isAddMoneyModal,
  setIsAddBankModal,
}) {
  const [money, setMoney] = useState(0);
  const { logout, user } = useAuth();
  function onLogout() {
    let response = confirm("Are you sure you want to logout?");
    if (response) logout();
    return;
  }

  useEffect(() => {
    // setNewTotalBalance();
    console.log("total", user);
    setMoney(user.totalBalance);
  }, [isAddMoneyModal, user]);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={"cursor-pointer"}>
          {String(user.name).toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
        <DropdownMenuItem>
          <p>
            <span>Amount</span> <br />{" "}
            <span className="text-green-500">${money}</span>{" "}
          </p>
          <DropdownMenuShortcut>
            <Button
              onClick={() => setIsAddMoneyModal(true)}
              size={"sm"}
              variant={"outline"}
              className={`bg-green-600 hover:bg-green-400 text-white`}
            >
              {" "}
              Add
            </Button>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* add bank account */}
        <DropdownMenuItem>
          <p>
            <NavLink to="/banklisting">
              {" "}
              <span>Bank</span>
            </NavLink>{" "}
            <br />{" "}
          </p>
          <DropdownMenuShortcut>
            <Button
              onClick={() => setIsAddBankModal(true)}
              size={"sm"}
              variant={"outline"}
              className={`bg-green-600 hover:bg-green-400 text-white`}
            >
              {" "}
              Add
            </Button>
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        {/* transactions */}
        <DropdownMenuItem>
          <NavLink to={"/transactions"}> Transactions </NavLink>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onLogout()}>
          Logout
          <DropdownMenuShortcut>
            <Button size={"icon"} variant={"outline"}>
              <LogOut size={20} />
            </Button>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
