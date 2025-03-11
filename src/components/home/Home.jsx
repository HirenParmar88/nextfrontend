//src/components/home/Home.jsx

"use client";
import { useUser } from "@/context/UserContext";
import React from "react";
import NavigationBar from "../navbar/Navbar.jsx";

function HomeScreen(props) {
  const { user } = useUser();
  console.log("get user data home :", { user });
  if (!user) return;
  return (
    <>
      <div>
        <NavigationBar user={user} />
      </div>
    </>
  );
}

export default HomeScreen;
