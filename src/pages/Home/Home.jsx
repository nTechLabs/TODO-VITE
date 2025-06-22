import React from 'react';
import { Card, Space } from 'antd';

const cardContents = [
  {
    title: 'Default size card 1',
    extra: <a href="#">More</a>,
    style: { width: 300 },
    spaceName: 'SpaceName1',
    taskName: 'TaskName1',
    DateTime: '2025-06-22 10:00',
  },
  {
    title: 'Default size card 2',
    extra: <a href="#">More</a>,
    style: { width: 300 },
    spaceName: 'SpaceName2',
    taskName: 'TaskName2',
    DateTime: '2025-06-22 11:00',
  },
  {
    title: 'Default size card 3',
    extra: <a href="#">More</a>,
    style: { width: 300 },
    spaceName: 'SpaceName3',
    taskName: 'TaskName3',
    DateTime: '2025-06-22 12:00',
  },
  {
    title: 'Default size card 4',
    extra: <a href="#">More</a>,
    style: { width: 300 },
    spaceName: 'SpaceName4',
    taskName: 'TaskName4',
    DateTime: '2025-06-22 13:00',
  },
  {
    title: 'Default size card 5',
    extra: <a href="#">More</a>,
    style: { width: 300 },
    spaceName: 'SpaceName5',
    taskName: 'TaskName5',
    DateTime: '2025-06-22 14:00',
  },
];

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
