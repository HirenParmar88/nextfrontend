//src/app/login/page.js

"use client";
//'use server'
import LoginComponent from "@/components/login/Login";
import React from "react";
import theme from "@/components/theme/theme";

function UserLogin() {
  console.log("server");
  console.log("App login :",theme);

  return (
    <>
      <LoginComponent />
    </>
  );
}
export default UserLogin;
