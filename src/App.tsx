import { Provider } from "react-redux";
import { AppRouter } from "./routers";
import { ThemeProvider } from "@themes";
import { persistor, store } from "@redux/stores";
import { PersistGate } from "redux-persist/integration/react";

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
