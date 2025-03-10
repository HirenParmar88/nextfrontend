//src/components/user/AddUser.jsx
"use client";
import React, { useState } from "react";
import { TextField, Button, Box, Typography, useTheme } from "@mui/material";
import addUserFunction from "./adduser.js";
import { ToastContainer } from "react-toastify";

function AddUserComponent() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("User Details:", { name, password, email });
    const addUser = addUserFunction(name, password, email);
    try {
      const success = await addUser();
      if (success) {
        setName("");
        setPassword("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: 400,
          margin: "0 auto",
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
          flex: 1,
          marginTop: 10,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Add User
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            {loading ? "Adding User..." : "Add User"}
          </Button>
        </form>
        <ToastContainer />
      </Box>
    </>
  );
}

export default AddUserComponent;
