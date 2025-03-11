//src/components/logout/Logout.jsx
"use client";
import { useTheme, Button } from "@mui/material";
import useLogout from "./logout.js";
import { ToastContainer } from "react-toastify";

function LogoutComponent() {
  const theme = useTheme();
  const handleLogout = useLogout();
  return (
    <>
      <Button
        onClick={handleLogout}
        variant="outlined"
        color="secondary"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderRadius: theme.shape.borderRadius,
          padding: "10px 20px",
          fontSize: "1rem",
          fontWeight: "bold",
          boxShadow: theme.shadows[0], // Applying shadow from theme
          "&:hover": {
            backgroundColor: "rgb(70, 169, 140)", // Darker shade for hover
          },
          margin: "5px",
        }}
      >
        Logout
      </Button>
      <ToastContainer />
    </>
  );
}

export default LogoutComponent;