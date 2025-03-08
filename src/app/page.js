//src/app/page.js

import ThemeRegistry from "@/components/theme/ThemeRegistry";
import UserLogin from "./login/page";

export default function Home() {
  return (
    <>
      <ThemeRegistry>
        <UserLogin />
      </ThemeRegistry>
    </>
  );
}
