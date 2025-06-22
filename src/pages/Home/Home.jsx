import React from 'react';
import { Card, Space } from 'antd';
import cardContents from '../../values/cardContents';

const Home = () => {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <Space direction="vertical" size={16}>
        {cardContents.map((card, idx) => (
          <Card key={idx} title={card.title} extra={card.extra} style={card.style}>
            <p>{card.spaceName}</p>
            <p>{card.taskName}</p>
            <p>{card.DateTime}</p>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default Home;
