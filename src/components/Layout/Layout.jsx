import React, { useState } from 'react';
import { Button, Flex, Layout as AntLayout } from 'antd';
import { useNavigate } from 'react-router-dom';
import Home from '../../pages/Home';
import SpacePage from '../../pages/Space';
import TaskPage from '../../pages/Task';

const { Header, Footer, Content } = AntLayout;

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 400,
  minHeight: 400,
  height: 500,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 2px 8px #f0f1f2',
};
const headerStyle = {
  color: '#fff',
  height: 64,
  background: '#1677ff',
  display: 'flex',
  alignItems: 'center',
  fontSize: 20,
  fontWeight: 600,
  paddingLeft: 24,
};
const contentStyle = {
  flex: 1,
  background: '#fff',
  padding: 24,
  fontSize: 16,
  minHeight: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const footerStyle = {
  color: '#fff',
  background: '#1677ff',
  textAlign: 'center',
  fontWeight: 500,
  padding: 16,
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
};

const Layout = () => {
  const navigate = useNavigate();
  const [contentKey, setContentKey] = useState('home');
  let contentComponent = <Home />;
  if (contentKey === 'space') contentComponent = <SpacePage />;
  if (contentKey === 'task') contentComponent = <TaskPage />;
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <Flex gap="middle" wrap>
        <AntLayout style={layoutStyle}>
          <Header style={headerStyle}>Header</Header>
          <Content style={contentStyle}>
            {contentComponent}
          </Content>
          <Footer style={footerStyle}>
            <Button type="primary" shape="round" onClick={() => { setContentKey('home'); }}>
              Home
            </Button>
            <Button type="default" shape="round" onClick={() => { setContentKey('space'); }}>
              Space
            </Button>
            <Button type="default" shape="round" onClick={() => { setContentKey('task'); }}>
              MyTask
            </Button>
          </Footer>
        </AntLayout>
      </Flex>
    </div>
  );
};

export default Layout;
