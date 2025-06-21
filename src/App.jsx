import React from "react";
import { Layout } from "antd";
import AppRouter from "./router";
import store from "./store/store";
import { Provider } from "react-redux";
import ReactQueryProvider from "./pages/ServerApi/react-query-provider";

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ReactQueryProvider>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </ReactQueryProvider>
    </Layout>
  );
}

export default App;
