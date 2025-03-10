//src/components/login/Login.jsx

"use client";
import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import theme from "../theme/theme";
import Cookies from "js-cookie";
import { useUser } from "@/context/UserContext";
import { toast, ToastContainer } from "react-toastify";

function LoginComponent() {
  const router = useRouter();
  const theme = useTheme();
  console.log("custom theme:", theme.palette.primary.main);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

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
      console.log("token", response.data.token);
      const username = response.data.data.name;
      console.log(username);

      if (response.data.success) {
        console.log("Login successful.");
        //localStorage.setItem("user", JSON.stringify(response.data.data));
        setUser(response.data.data);  
        Cookies.set("token", response.data.token, { expires: 7, secure: true });
        toast.success(response.data.message)
        setTimeout(() => {
          router.push("home");
        }, 1000);
      } else {
        console.error(response.data.message || "Invalid username or password.");
        toast.error(response.data.message)
      }
    } catch (err) {
      setLoading(false);
      console.error(err.response.data);
      console.error(err.response.data.message);
      toast.error(err.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.header}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              //required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              //required
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>

    <ToastContainer />
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
    backgroundColor: theme.palette.background.default,
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
    backgroundColor: "rgb(80, 189, 160)",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default LoginComponent;
