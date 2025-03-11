//src/components/product/AddProduct.jsx
"use client";
import React, { useState } from "react";
import { TextField, Button, Box, Typography, useTheme } from "@mui/material";
import addProductFunction from "./addproduct.js";
import { ToastContainer } from "react-toastify";

function AddProductComponent() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [product_name, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Product Details:", { product_name, price, description, userId });
    const addProduct = addProductFunction(product_name, price, description, userId);
    
    try {
      const success = await addProduct();
      
      if (success) {
        
        setProductName("");
        setPrice("");
        setDescription("");
        setUserId("");
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
          Add Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="userId"
            variant="outlined"
            fullWidth
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
            {loading ? "Adding Product..." : "Add Product"}
          </Button>
        </form>
        <ToastContainer />
      </Box>
    </>
  );
}

export default AddProductComponent;