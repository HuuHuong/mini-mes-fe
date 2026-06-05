import { AppRouter } from "./routers";
import { ThemeProvider } from "@themes";

export const App = () => {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
};
