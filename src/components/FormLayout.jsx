import React from "react";
import { Layout } from "antd";
import Navigation from "./Navigation";
import ContactForm from "./ContactForm";

const FormLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: 24 }}>
        <ContactForm />
      </div>
    </Layout>
  );
};

export default FormLayout;
