import "./App.css";
import AppRouter from "./router";
import store from "./store/store";
import { Container } from "@mui/material"; // Import Container from Material-UI
import { Provider } from "react-redux"; // Import Provider from react-redux

function App() {
  return (
    <>
      <div>
        <Container fixed>
          <Provider store={store}>
            <AppRouter />
          </Provider>
        </Container>
      </div>
    </>
  );
}

export default App;
