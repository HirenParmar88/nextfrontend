//src/components/home/Home.jsx

"use client";
import { useUser } from "@/context/UserContext";
import React from "react";
// import LogoutComponent from "../logout/Logout.jsx";
import NavigationBar from "../navbar/Navbar.jsx";
import AddUserComponent from "../user/AddUser.jsx"
function HomeScreen(props) {
  const { user } = useUser();
  console.log("get user data home :",{user})
  if(!user) return
  return (
    <>
      <div>
      <NavigationBar user={user}/>
      
      {/* <LogoutComponent /> */}
      </div>
      {/* <AddUserComponent /> */}
    </>
  );
}

export default HomeScreen;