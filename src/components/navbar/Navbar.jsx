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
import { ToastContainer } from "react-toastify";
import ShowUserComponent from "../user/ShowUser.jsx";

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

  const handleMenuItemClick = (action) => {
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
          <Tooltip title="Update an existing user" arrow>
            <MenuItem onClick={() => handleMenuItemClick("updateUser")}>
              Update User
            </MenuItem>
          </Tooltip>
          <Tooltip title="Delete a user" arrow>
            <MenuItem onClick={() => handleMenuItemClick("deleteUser")}>
              Delete User
            </MenuItem>
          </Tooltip>
        </>
      );
    } else if (user.role === "user") {
      return (
        <>
          <Tooltip title="Add a new product" arrow>
            <MenuItem onClick={() => handleMenuItemClick("addProduct")}>
              Add Product
            </MenuItem>
          </Tooltip>
          <Tooltip title="Add new accessories" arrow>
            <MenuItem onClick={() => handleMenuItemClick("addAccessories")}>
              Add Accessories
            </MenuItem>
          </Tooltip>
          <Tooltip title="Show all products" arrow>
            <MenuItem onClick={() => handleMenuItemClick("showProduct")}>
              Show Product
            </MenuItem>
          </Tooltip>
          <Tooltip title="Show all accessories" arrow>
            <MenuItem onClick={() => handleMenuItemClick("showAccessories")}>
              Show Accessories
            </MenuItem>
          </Tooltip>
          <Tooltip title="Update an existing product" arrow>
            <MenuItem onClick={() => handleMenuItemClick("updateProduct")}>
              Update Product
            </MenuItem>
          </Tooltip>
          <Tooltip title="Update an existing accessory" arrow>
            <MenuItem onClick={() => handleMenuItemClick("updateAccessories")}>
              Update Accessories
            </MenuItem>
          </Tooltip>
          <Tooltip title="Delete a product" arrow>
            <MenuItem onClick={() => handleMenuItemClick("deleteProduct")}>
              Delete Product
            </MenuItem>
          </Tooltip>
          <Tooltip title="Delete an accessory" arrow>
            <MenuItem onClick={() => handleMenuItemClick("deleteAccessories")}>
              Delete Accessories
            </MenuItem>
          </Tooltip>
        </>
      );
    }
  };

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
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
            <MenuItem onClick={() => handleMenuItemClick("logout")}>
              <ExitToApp sx={{ marginRight: 1, alignItems: "flex-end" }} />
              Logout
            </MenuItem>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {/* step-3 */}
      {activeView === "addUser" && <AddUserComponent />}
      {activeView === "showUser" && <ShowUserComponent />}
      <ToastContainer />
    </>
  );
}
export default NavigationBar;
