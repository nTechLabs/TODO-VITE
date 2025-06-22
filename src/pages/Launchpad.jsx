import React from "react";
import { Button, Typography, Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

function Launchpad() {
  const navigate = useNavigate();

  const icons = [
    { name: "Vite", path: "/Vite" },
    { name: "Counter", path: "/Counter" },
    { name: "FormGuide", path: "/formGuide" },
    { name: "Function1", path: "/main?component=function1" },
    { name: "Cars", path: "/main?component=cars" },
    { name: "TabsPage", path: "/main?component=tabsPage" },
    { name: "UtilsPage", path: "/main?component=utilsPage" },
    { name: "Calculator", path: "/main?component=calculator" },
    { name: "Contact", path: "/Contact" },
    { name: "ServerApi", path: "/ServerApi" },
    { name: "SampleComp", path: "/sample" },
    { name: "Layout", path: "/layout" },
  ];

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", background: "#f5f7fa" }}
    >
      <Col>
        <Card
          style={{
            borderRadius: 16,
            minWidth: 340,
            maxWidth: 480,
            width: "100%",
            padding: 32,
          }}
        >
          <Typography.Title
            level={3}
            style={{
              textAlign: "center",
              marginBottom: 32,
              fontWeight: 700,
            }}
          >
            Launchpad
          </Typography.Title>
          <Row gutter={[16, 16]}>
            {icons.map((icon) => (
              <Col span={12} key={icon.name}>
                <Button
                  block
                  size="large"
                  style={{ borderRadius: 8, fontWeight: 600 }}
                  onClick={() => navigate(icon.path)}
                >
                  {icon.name}
                </Button>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default Launchpad;
