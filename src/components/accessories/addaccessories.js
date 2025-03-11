//src/components/accessories/addaccessories.js
"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const addAccessoriesFunction = (accessory_name, productId) => {
    console.log("@@@@");
    
  const addNewAccessories = async () => {
    console.log("!!!!!");
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      console.log("add accessories token",token);
      console.log("AAA");
      if (!token) {
        console.error("No token found add accessories");
        return;
      }
      const response = await axios({
        url: "http://localhost:3000/accessories/create",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          accessory_name: accessory_name,
          productId: productId
        },
      });
      console.log("create accessories API response:", response.data);
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
  return addNewAccessories;
};
export default addAccessoriesFunction;