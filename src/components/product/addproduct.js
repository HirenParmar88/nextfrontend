//src/components/product/addproduct.js
"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const addProductFunction = (product_name, price, description, userId) => {
  const addNewProduct = async () => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      console.log("AAA");
      if (!token) {
        console.error("No token found add product");
        return;
      }
      const response = await axios({
        url: "http://localhost:3000/product/create",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          product_name: product_name,
          price: price,
          description: description,
          userId:userId
        },
      });
      console.log("create product API response:", response.data);
      if (response.data.code === 200) {
        toast.success(response.data.message);
        return response.data.success;
      }
    } catch (error) {
      console.error("error:", error.response?.data || error.message);
      console.log(error.response.data.message[0].message);
      toast.error(error.response.data.message);
      if (error.response.data.code === 422) {
        toast.info(error.response.data.message[0].message);
      }
    }
  };

  return addNewProduct;
};

export default addProductFunction;
