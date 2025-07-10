import React from "react";
import { Button, Space, Divider, Typography, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { counterSliceActs } from "../../store/counterSlice";
import Zcounter from "../Zcounter";

const { Title } = Typography;

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Zcounter (Zustand) - 위쪽에 렌더링 */}
        <div>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Zustand Counter
          </Title>
          <Zcounter />
        </div>
        
        <Divider />
        
        {/* Counter (Redux) - 아래쪽에 렌더링 */}
        <div>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
            Redux Counter
          </Title>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Space align="center">
              <Button
                type="primary"
                onClick={() => dispatch(counterSliceActs.down(1))}
              >
                -
              </Button>
              <span style={{ minWidth: 32, textAlign: "center", fontSize: '24px', fontWeight: 'bold' }}>
                {count}
              </span>
              <Button
                type="primary"
                onClick={() => dispatch(counterSliceActs.up(1))}
              >
                +
              </Button>
            </Space>
          </div>
        </div>
        
        <Divider />
        
        {/* 비교 설명 */}
        <div>
          <Title level={3} style={{ textAlign: 'center' }}>상태 관리 라이브러리 비교</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
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
            <Col xs={24} md={12}>
              <div style={{ 
                padding: '16px', 
                background: '#fff7e6', 
                borderRadius: '8px',
                border: '1px solid #ffd591'
              }}>
                <Title level={4} style={{ color: '#fa8c16', textAlign: 'center' }}>
                  Redux ⚡
                </Title>
                <ul>
                  <li>예측 가능한 상태 업데이트</li>
                  <li>강력한 DevTools</li>
                  <li>미들웨어 생태계</li>
                  <li>시간 여행 디버깅</li>
                  <li>광범위한 커뮤니티</li>
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
