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
            className="home-card card-pointer"
            hoverable
            onClick={() => navigate('/home/CardDetail')}
          >
            <div className="home-title-badge-row">
              <span className="home-title">{card.title}</span>
              <span className="home-badge">{card.count}</span>
            </div>
            <div className="home-space-task">
              <span className="home-space">{card.spaceName}</span>
              <br />
              <span className="home-task">{card.taskName}</span>
            </div>
            <div className="home-date">{card.DateTime}</div>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default Home;
