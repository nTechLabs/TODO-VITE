import "./App.css";
import AppRouter from "./router";
import store from "./store/store";
import { Container } from "@mui/material"; // Import Container from Material-UI
import { Provider } from "react-redux"; // Import Provider from react-redux
import ReactQueryProvider from "./pages/ServerApi/react-query-provider";

function App() {
  return (
    <>
      <div>
        <Container fixed>
          <ReactQueryProvider>
            <Provider store={store}>
              <AppRouter />
            </Provider>
          </ReactQueryProvider>
        </Container>
      </div>
    </>
  );
}

export default App;
