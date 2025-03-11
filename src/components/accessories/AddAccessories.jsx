//src/components/product/AddProduct.jsx
"use client";
import React, { useState } from "react";
import { TextField, Button, Box, Typography, useTheme } from "@mui/material";
import addAccessoriesFunction from "./addaccessories.js";
import { ToastContainer } from "react-toastify";

function AddAccessoriesComponent() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [accessory_name, setAccessoryName] = useState("");
  const [productId, setProductId] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Accessories Details:", { accessory_name, productId });
    const addAccessories = addAccessoriesFunction(accessory_name, productId);
    try {
      const success = await addAccessories();
      if (success) {
        setAccessoryName("");
        setProductId("");
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
          Add Accessories
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Accessory Name"
            variant="outlined"
            fullWidth
            value={accessory_name}
            onChange={(e) => setAccessoryName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Product Id"
            variant="outlined"
            fullWidth
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
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
            {loading ? "Adding Accessories..." : "Add Accessories"}
          </Button>
        </form>
        <ToastContainer />
      </Box>
    </>
  );
}
export default AddAccessoriesComponent;