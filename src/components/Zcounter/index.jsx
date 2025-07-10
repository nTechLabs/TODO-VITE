import React from "react";
import { Button, Space, InputNumber, Card, Typography } from "antd";
import { PlusOutlined, MinusOutlined, ReloadOutlined } from "@ant-design/icons";
import useCounterZStore from "../../store/counterZstore";

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
      style={{ maxWidth: 500, margin: '0 auto' }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* 기본 카운터 */}
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ margin: '20px 0' }}>
            {count}
          </Title>
        </div>

        {/* 기본 증감 버튼 */}
        <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
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
        <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
          <Text>Custom Value:</Text>
          <InputNumber 
            value={customValue}
            onChange={(value) => setCustomValue(value || 1)}
            min={1}
            max={100}
            style={{ width: 80 }}
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
        <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
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
