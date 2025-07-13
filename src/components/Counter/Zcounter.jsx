import React from "react";
import { Button, Space, InputNumber, Card, Typography } from "antd";
import { PlusOutlined, MinusOutlined, ReloadOutlined } from "@ant-design/icons";
import useCounterZStore from "../../store/counterZstore";
import "./Counter.css";

const { Title, Text } = Typography;

function Zcounter() {
  const { 
    count, 
    increment, 
    decrement, 
    reset, 
    incrementBy, 
    decrementBy, 
    doubleCount 
  } = useCounterZStore();

  const [customValue, setCustomValue] = React.useState(1);

  return (
    <Card 
      title="Zustand Counter" 
      className="zcounter-card"
    >
      <Space direction="vertical" size="middle" className="zcounter-container">
        {/* 기본 카운터 */}
        <div className="zcounter-display">
          <Title level={2} className="zcounter-number">
            {count}
          </Title>
        </div>

        {/* 기본 증감 버튼 */}
        <Space align="center" className="zcounter-button-group">
          <Button 
            type="primary" 
            icon={<MinusOutlined />}
            onClick={() => decrement()}
            size="large"
          >
            -1
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => increment()}
            size="large"
          >
            +1
          </Button>
        </Space>

        {/* 커스텀 값으로 증감 */}
        <Space align="center" className="zcounter-button-group">
          <Text>Custom Value:</Text>
          <InputNumber 
            value={customValue}
            onChange={(value) => setCustomValue(value || 1)}
            min={1}
            max={100}
            className="zcounter-custom-input"
          />
          <Button 
            onClick={() => decrementBy(customValue)}
            type="default"
          >
            -{customValue}
          </Button>
          <Button 
            onClick={() => incrementBy(customValue)}
            type="default"
          >
            +{customValue}
          </Button>
        </Space>

        {/* 추가 기능 버튼들 */}
        <Space align="center" className="zcounter-button-group">
          <Button 
            type="dashed"
            onClick={doubleCount}
          >
            Double (×2)
          </Button>
          <Button 
            type="default"
            icon={<ReloadOutlined />}
            onClick={reset}
          >
            Reset
          </Button>
        </Space>
      </Space>
    </Card>
  );
}

export default Zcounter;
