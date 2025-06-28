import React from 'react';
import { Card, Space } from 'antd';
import cardContents from '../../values/cardContents';
import './home.css';

const Home = () => {
  return (
    <div className="home-root">
      <Space direction="vertical">
        {cardContents.map((card, idx) => (
          <Card
            key={idx}
            title={card.title}
            extra={card.extra}
            className="home-card"
          >
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
