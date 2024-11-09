import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownMenu, DropdownItem, DropdownTrigger,Dropdown, Avatar} from "@nextui-org/react";
import { NavBarLogo } from "../functions/NavBarLogo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/authService";
import { showPresupuesto } from "../SweetAlert/SweetAlertPresupuesto";

export default function NavBar2() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, role, token } = useSelector((state) => state.user);

  const handleLogOut = async () => {
    try {
      await logout(token);
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  
const handleVerPresupuesto = async () => {
  try {
    const presupuesto = await obtenerPresupuesto(token); 
    showPresupuesto(`El presupuesto actual es: $${presupuesto.presupuesto}`); 
  } catch (error) {
    showPresupuesto(`Error al obtener el presupuesto: ${error.message}`);
  }
}

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
        <NavBarLogo />
          <p className="font-bold text-inherit">GIFA</p>
        </NavbarBrand>
        </NavbarContent>

{
  role === "SUPERVISOR" &&
  <Button color="primary" onClick={handleVerPresupuesto} >Presupuesto</Button>
}

<NavbarContent as="div" className="items-center navbar-content" justify="end">
 

<Dropdown placement="bottom-end">
    <DropdownTrigger>
      <Avatar
        isBordered
        as="button"
        className="avatar transition-transform"
        color="secondary"
        name={username || "User"}
        size="sm"
      />
    </DropdownTrigger>
    <DropdownMenu
      aria-label="Profile Actions"
      variant="flat"
      className="dropdown-menu"
    >
      <DropdownItem key="profile" className="h-14 gap-2 dropdown-item">
        <p className="font-semibold">Signed in as</p>
        <p className="font-semibold">{username || "No User"}</p>
        <p className="text-sm">Role: {role || "No Role"}</p>
      </DropdownItem>
      <DropdownItem
        key="logout"
        color="danger"
        onClick={handleLogOut}
        className="dropdown-item"
      >
        Log Out
      </DropdownItem>
    </DropdownMenu>
    </Dropdown>
 
</NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
