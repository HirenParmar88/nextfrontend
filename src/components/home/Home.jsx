//src/components/home/Home.jsx

"use client";
import { useUser } from "@/context/UserContext";
import React from "react";
import LogoutComponent from "../logout/Logout.jsx";

function HomeScreen() {
  const { user } = useUser();
  console.log("get user data home :",{user})
  if(!user) return
  return (
    <>
      <div>
        <h1>{user?.role} | Welcome to Home </h1>
        <LogoutComponent />
      </div>
    </>
  );
}

export default HomeScreen;