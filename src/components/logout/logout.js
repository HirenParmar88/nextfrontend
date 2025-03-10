//src/components/logout/logout.js

import axios from "axios";
import Cookies from "js-cookie";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useLogout = () => {
    const router = useRouter();
  const { logout } = useUser();

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      if (!token) {
        console.error("No token found");
        toast.error("No token found");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/auth/logout",
        {}, // No body needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Logout response:", response.data);
      if(response.data.code === 200){
        router.push('/login')
        toast.success(response.data.message)
      }
      // Remove token from cookies and reset user state
      Cookies.remove("token");
      logout(); // Call logout function from UserContext

    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return handleLogout;
};

export default useLogout;