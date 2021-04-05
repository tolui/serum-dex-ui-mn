import { Layout } from 'antd';
import React from 'react';
import TopBar_DexMn from './dex.mn/TopBar_DexMn';
import { CustomFooter as Footer } from './Footer';
const { Header, Content } = Layout;

export default function BasicLayout({ children }) {
  return (
    <React.Fragment>
      <Layout
        style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
      >
        <Header style={{ padding: 0, minHeight: 64, height: 'unset' }}>
          <TopBar_DexMn />
        </Header>
        <Content style={{ flex: 1 }}>{children}</Content>
        <Footer />
      </Layout>
    </React.Fragment>
  );
}
