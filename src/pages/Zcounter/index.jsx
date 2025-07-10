import React from "react";
import { Space, Typography } from "antd";
import Zcounter from "../../components/Zcounter";

const { Title, Paragraph } = Typography;

const ZcounterPage = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={1}>Zustand Counter</Title>
          <Paragraph>
            Zustand를 사용한 상태 관리 카운터 예제입니다.
            Redux와 비교하여 더 간단하고 직관적인 상태 관리를 제공합니다.
          </Paragraph>
        </div>
        
        <Zcounter />
        
        <div style={{ marginTop: '40px' }}>
          <Title level={3}>특징</Title>
          <ul>
            <li>간단한 API와 적은 보일러플레이트</li>
            <li>TypeScript 지원</li>
            <li>DevTools 미들웨어 지원</li>
            <li>Provider 래핑 불필요</li>
            <li>선택적 리렌더링</li>
          </ul>
        </div>
      </Space>
    </div>
  );
};

export default ZcounterPage;
