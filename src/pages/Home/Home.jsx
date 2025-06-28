import React from 'react';
import { Card, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import cardContents from '../../values/cardContents';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-root">
      <Space direction="vertical">
        {cardContents.map((card, idx) => (
          <Card
            key={idx}
            title={card.title}
            extra={card.extra}
            className="home-card"
            hoverable
            onClick={() => navigate('/home/CardDetail')}
            style={{ cursor: 'pointer' }}
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
