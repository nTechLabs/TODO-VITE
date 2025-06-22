import React, { useState } from 'react';
import { Button, Flex, Layout as AntLayout } from 'antd';
import Home from '../../pages/Home';
import SpacePage from '../../pages/Space';
import TaskPage from '../../pages/Task';
import staticName from '../../values/staticName.js';
import './Layout.css';

const { Header, Footer, Content } = AntLayout;

const Layout = () => {
  const [contentKey, setContentKey] = useState('home');
  let contentComponent = <Home />;
  if (contentKey === 'space') contentComponent = <SpacePage />;
  if (contentKey === 'task') contentComponent = <TaskPage />;
  return (
    <div className="layout-root">
      <div className="layout-flex">
        <AntLayout className="layout-main" style={{ minHeight: '100vh' }}>
          <Header className="layout-header" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10, width: '100%' }}>Header</Header>
          <Content
            className="layout-content"
            style={{
              marginTop: 64, // Header height
              marginBottom: 64, // Footer height
              overflowY: 'scroll',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE/Edge
              height: 'calc(100vh - 128px)', // 64px header + 64px footer
              padding: 24,
              background: '#fff',
            }}
          >
            <div style={{ width: '100%', height: '100%', overflow: 'auto', scrollbarWidth: 'none' }}
              className="hide-scrollbar"
            >
              {contentComponent}
            </div>
          </Content>
          <Footer
            className="layout-footer"
            style={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              width: '100%',
              background: '#fff',
              borderTop: '1px solid #eee',
              textAlign: 'center',
              padding: '12px 0',
            }}
          >
            <Button type="primary" shape="round" onClick={() => { setContentKey('home'); }}>
              {staticName.home.home}
            </Button>
            <Button type="default" shape="round" onClick={() => { setContentKey('space'); }}>
              {staticName.space.space}
            </Button>
            <Button type="default" shape="round" onClick={() => { setContentKey('task'); }}>
              {staticName.mytask.mytask}
            </Button>
          </Footer>
        </AntLayout>
      </div>
    </div>
  );
};

export default Layout;
