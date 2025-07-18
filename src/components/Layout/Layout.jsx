import React, { useState } from 'react';
import { Button, Flex, Layout as AntLayout } from 'antd';
import { HomeOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons';
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
        <AntLayout className="layout-main">
          <Header className="layout-header header-fixed">
            <div className="layout-header-inner">
              <HomeOutlined className="layout-header-icon home" onClick={() => setContentKey('home')} />
              <span className="layout-header-title">Header</span>
              <div className="layout-header-right-icons">
                <SearchOutlined className="layout-header-icon search" />
                <BellOutlined className="layout-header-icon bell" />
              </div>
            </div>
          </Header>
          <Content className="layout-content">
            <div className="hide-scrollbar content-center">
              {contentComponent}
            </div>
          </Content>
          <Footer className="layout-footer footer-fixed">
            <Button type="default" shape="default" onClick={() => { setContentKey('home'); }}>
              {staticName.home.home}
            </Button>
            <Button type="default" shape="default" onClick={() => { setContentKey('space'); }}>
              {staticName.space.space}
            </Button>
            <Button type="default" shape="default" onClick={() => { setContentKey('task'); }}>
              {staticName.mytask.mytask}
            </Button>
          </Footer>
        </AntLayout>
      </div>
    </div>
  );
};

export default Layout;
