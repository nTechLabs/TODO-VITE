import React from 'react';
import { Card, Space, Badge } from 'antd';
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
            className="home-card"
            hoverable
            onClick={() => navigate('/home/CardDetail')}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
              <span>{card.title}</span>
              <Badge count={card.count} style={{ backgroundColor: '#faad14' }} />
            </div>
            <div style={{ marginBottom: 4 }}>
              <span style={{ background: '#f5f5f5', borderRadius: 6, padding: '2px 10px', fontWeight: 500, color: '#555', fontSize: 14, display: 'inline-block', marginBottom: 2 }}>{card.spaceName}</span>
              <br />
              <span style={{ fontWeight: 400, color: '#222', fontSize: 15 }}>{card.taskName}</span>
            </div>
            <div style={{ textAlign: 'right', color: '#888', fontSize: 13, marginTop: 8 }}>
              {card.DateTime}
            </div>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default Home;
