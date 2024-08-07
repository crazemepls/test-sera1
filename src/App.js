import React from 'react';
import { Layout, Menu } from 'antd';
import HomePage from './pages/Home';

const { Header, Content, Footer } = Layout;

const items = new Array(1).fill(null).map((_, index) => ({
  key: index + 1,
  label: `Pokedex`,
}));

const App = () => {
  return (
    <Layout style={{background:'#a63d40'}}>
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
          width:'90%',
          justifyContent:'center',
          margin:'auto'
        }}
      >
        <div
          style={{
            background: '#a63d40',
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
        BlahBlah
      </Footer>
    </Layout>
  );
};
export default App;