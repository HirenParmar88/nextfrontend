//src/components/user/adduser.js
"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const addUserFunction = (name, password, email) => {
  const addNewUser = async () => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      console.log("AAA");
      if (!token) {
        console.error("No token found add user");
        return;
      }
      const response = await axios({
        url: "http://localhost:3000/user/create",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: name,
          password: password,
          email: email,
        },
      });
      console.log("create user API response:", response.data);
      if (response.data.code === 200) {
        toast.success(response.data.message);
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

  return addNewUser;
};

export default addUserFunction;
