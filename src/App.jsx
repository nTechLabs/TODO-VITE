import React from "react";
import { Layout } from "antd";
import AppRouter from "./router";
import store from "./store/store";
import { Provider } from "react-redux";
import ReactQueryProvider from "./config/react-query-provider";
import NotificationProvider from "./components/NotificationProvider";

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ReactQueryProvider>
        <Provider store={store}>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </Provider>
      </ReactQueryProvider>
    </Layout>
  );
}

export default App;
