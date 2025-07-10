import React, { useState } from "react";
import { Button, Space, Divider, Typography, Row, Col, InputNumber, Card, List, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { PlusOutlined, MinusOutlined, ReloadOutlined, ClearOutlined, HistoryOutlined } from "@ant-design/icons";
import { counterSliceActs } from "../../store/counterSlice";
import Zcounter from "../Zcounter";

const { Title, Text } = Typography;

function Counter() {
  const { count, history, step } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [customValue, setCustomValue] = useState(5);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Zcounter (Zustand) - 위쪽에 렌더링 */}
        <div>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Zustand Counter
          </Title>
          <Zcounter />
        </div>
        
        <Divider />
        
        {/* Counter (Redux Toolkit) - 아래쪽에 렌더링 */}
        <div>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Redux Toolkit Counter
          </Title>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Redux Toolkit Counter" style={{ textAlign: 'center' }}>
                {/* 현재 카운트 표시 */}
                <div style={{ marginBottom: '20px' }}>
                  <Title level={1} style={{ 
                    fontSize: '48px', 
                    margin: '20px 0',
                    color: '#1890ff'
                  }}>
                    {count}
                  </Title>
                </div>

                {/* 기본 증감 버튼 */}
                <Space size="middle" style={{ marginBottom: '20px' }}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<MinusOutlined />}
                    onClick={() => dispatch(counterSliceActs.decrement())}
                  >
                    -1
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={() => dispatch(counterSliceActs.increment())}
                  >
                    +1
                  </Button>
                </Space>

                {/* 커스텀 값 증감 */}
                <div style={{ marginBottom: '20px' }}>
                  <Space align="center">
                    <Text>Custom Value:</Text>
                    <InputNumber 
                      value={customValue}
                      onChange={(value) => setCustomValue(value || 1)}
                      min={1}
                      max={100}
                      style={{ width: 80 }}
                    />
                    <Button 
                      onClick={() => dispatch(counterSliceActs.down(customValue))}
                      type="default"
                    >
                      -{customValue}
                    </Button>
                    <Button 
                      onClick={() => dispatch(counterSliceActs.up(customValue))}
                      type="default"
                    >
                      +{customValue}
                    </Button>
                  </Space>
                </div>

                {/* 추가 기능 버튼들 */}
                <Space size="middle" wrap>
                  <Button 
                    type="dashed"
                    onClick={() => dispatch(counterSliceActs.multiplyBy(2))}
                  >
                    Double (×2)
                  </Button>
                  <Button 
                    type="default"
                    icon={<ReloadOutlined />}
                    onClick={() => dispatch(counterSliceActs.reset())}
                  >
                    Reset
                  </Button>
                  <Button 
                    type="default"
                    onClick={() => dispatch(counterSliceActs.setCount(100))}
                  >
                    Set to 100
                  </Button>
                </Space>
              </Card>
            </Col>
            
            <Col xs={24} lg={8}>
              <Card 
                title={
                  <Space>
                    <HistoryOutlined />
                    Action History
                    <Tag color="blue">{history.length}</Tag>
                  </Space>
                }
                extra={
                  <Button 
                    size="small"
                    icon={<ClearOutlined />}
                    onClick={() => dispatch(counterSliceActs.clearHistory())}
                  >
                    Clear
                  </Button>
                }
                style={{ height: '400px' }}
              >
                <List
                  size="small"
                  dataSource={history.slice(-10).reverse()}
                  renderItem={(item, index) => (
                    <List.Item>
                      <Text code>{item}</Text>
                    </List.Item>
                  )}
                  style={{ height: '300px', overflow: 'auto' }}
                />
              </Card>
            </Col>
          </Row>
        </div>
        
        <Divider />
        
        {/* 비교 설명 */}
        <div>
          <Title level={3} style={{ textAlign: 'center' }}>상태 관리 라이브러리 비교</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <div style={{ 
                padding: '16px', 
                background: '#f6ffed', 
                borderRadius: '8px',
                border: '1px solid #b7eb8f'
              }}>
                <Title level={4} style={{ color: '#52c41a', textAlign: 'center' }}>
                  Zustand ✨
                </Title>
                <ul>
                  <li>간단한 API</li>
                  <li>적은 보일러플레이트</li>
                  <li>Provider 래핑 불필요</li>
                  <li>TypeScript 친화적</li>
                  <li>작은 번들 크기</li>
                </ul>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ 
                padding: '16px', 
                background: '#e6f7ff', 
                borderRadius: '8px',
                border: '1px solid #91d5ff'
              }}>
                <Title level={4} style={{ color: '#1890ff', textAlign: 'center' }}>
                  Redux Toolkit ⚡
                </Title>
                <ul>
                  <li>Immer 내장 (불변성)</li>
                  <li>간소화된 보일러플레이트</li>
                  <li>강력한 DevTools</li>
                  <li>createSlice API</li>
                  <li>RTK Query 지원</li>
                </ul>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ 
                padding: '16px', 
                background: '#fff7e6', 
                borderRadius: '8px',
                border: '1px solid #ffd591'
              }}>
                <Title level={4} style={{ color: '#fa8c16', textAlign: 'center' }}>
                  Classic Redux 🔧
                </Title>
                <ul>
                  <li>순수 함수 리듀서</li>
                  <li>예측 가능한 상태</li>
                  <li>시간 여행 디버깅</li>
                  <li>미들웨어 생태계</li>
                  <li>많은 보일러플레이트</li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </Space>
    </div>
  );
}

export default Counter;
