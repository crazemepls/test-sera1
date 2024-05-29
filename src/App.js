import React from 'react';
import { Layout, Menu, theme } from 'antd';
import HomePage from './pages/Home';

const { Header, Content, Footer } = Layout;

const items = new Array(1).fill(null).map((_, index) => ({
  key: index + 1,
  label: `Pokedex`,
}));

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{background:'#C3C3C3'}}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <div
          style={{
            background: '#C3C3C3',
            minHeight: 280,
            padding: 24,
            // borderRadius: borderRadiusLG,
          }}
        >
          <HomePage />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        {/* BlahBlah */}
      </Footer>
    </Layout>
  );
};
export default App;