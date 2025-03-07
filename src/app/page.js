//src/app/page.js

import UserLogin from "./login/page";
import {ThemeProvider} from '@mui/material';
import theme from "@/components/theme/theme";

export default function Home() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserLogin />

      </ThemeProvider>
    </>
  );
}
