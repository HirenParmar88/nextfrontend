//src/components/login/Login.jsx

"use client";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import { Button } from "@mui/material";
import { Home } from "@mui/icons-material";
import theme from "../theme/theme";

function LoginComponent() {
  const cookies = parseCookies();
  console.log("custom theme:",theme);
  console.log(theme.colors.primary);
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        name,
        password,
      });
      console.log("Login res ", response.data);
      
      if (response.data.token) {
        // Save token to cookies or localStorage
        document.cookie = `token=${response.data.token}; path=/`;
        console.log("Login successful, token saved.");
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      setError("Invalid username or password.");
    }
  };

  return (
    <>
    <div style={styles.container}>
      <h2 style={styles.header}>Login Page</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
    <Button variant="contained">Hello world</Button>
    <Home sx={{fontSize:40}}/>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "lightblue",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  form: {
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "1rem",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: "0.875rem",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: theme.colors.primary,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    
  },
};

export default LoginComponent;
