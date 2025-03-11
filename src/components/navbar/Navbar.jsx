// src/components/navbar/Navbar.jsx
"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  MenuItem,
  Box,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import useLogout from "../logout/logout.js";
import { useUser } from "@/context/UserContext";
import  AddUserComponent  from "../user/AddUser.jsx";
import AddProductComponent from "../product/AddProduct.jsx"
import ShowUserComponent from "../user/ShowUser.jsx";
import ShowProductComponent from "../product/ShowProduct.jsx";
import { ToastContainer } from "react-toastify";

function NavigationBar() {
  const handleLogout = useLogout();
  const { user } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //step-1
  const [activeView, setActiveView] = useState("");

  console.log("user :-", user);
  console.log("role", user.role);
  useEffect(() => {
    // await ShowUserComponent();
  }, []);

  const handleMenuItemClickLogout = (action) => {
    console.log(action);
    handleLogout();
  };
  const handleAddUser = (action) => {
    console.log(action);
    //step-2
    setActiveView("addUser")
  };
  const handleShowUser = (action) => {
    console.log(action);
    setActiveView("showUser")
  };

  const handleAddProduct = (action) => {
    console.log(action);
    setActiveView("addProduct")
  }
  const handleShowProduct = (action) => {
    console.log(action);
    setActiveView("showProduct")
  }

  const renderMenuItems = () => {
    if (user.role === "admin") {
      return (
        <>
          <Tooltip title="Add a new user" arrow>
            <MenuItem onClick={() => handleAddUser("addUser")}>
              Add User
            </MenuItem>
          </Tooltip>
          <Tooltip title="View all users" arrow>
            <MenuItem onClick={() => handleShowUser("showUser")}>
              Show User
            </MenuItem>
          </Tooltip>
        </>
      );
    } else if (user.role === "user") {
      return (
        <>
          <Tooltip title="Add a new product" arrow>
            <MenuItem onClick={() => handleAddProduct("addProduct")}>
              Add Product
            </MenuItem>
          </Tooltip>
          <Tooltip title="Add new accessories" arrow>
            <MenuItem onClick={() => handleAddAccessories("addAccessories")}>
              Add Accessories
            </MenuItem>
          </Tooltip>
          <Tooltip title="Show all products" arrow>
            <MenuItem onClick={() => handleShowProduct("showProduct")}>
              Show Product
            </MenuItem>
          </Tooltip>
          <Tooltip title="Show all accessories" arrow>
            <MenuItem onClick={() => handleShowAccessories("showAccessories")}>
              Show Accessories
            </MenuItem>
          </Tooltip>
        </>
      );
    }
  };

  return (
    <>
      <AppBar position="relative" color="primary">
        <Toolbar
          sx={{
            display: "flex",
            //justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" sx={{ fontWeight: "bold" }}>
              HOME | {user.role}
            </Button>
          </Box>

          {/* Render menu items for large screens */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}></Box>
          )}

          {/* Render different menu items based on role */}
          {renderMenuItems()}

          {/* Common Logout option */}
          <Tooltip title="Logout" arrow>
            <MenuItem onClick={() => handleMenuItemClickLogout("logout")}>
              <ExitToApp sx={{ marginRight: 1, alignItems: "flex-end" }} />
              Logout
            </MenuItem>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {/* step-3 */}
      {activeView === "addUser" && <AddUserComponent />}
      {activeView === "showUser" && <ShowUserComponent />}

      {activeView === "addProduct" && <AddProductComponent />}
      {activeView === "showProduct" && <ShowProductComponent />}
      <ToastContainer />
    </>
  );
}

export default NavigationBar;