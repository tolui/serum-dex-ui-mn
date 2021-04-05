import React, { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Button, Col, Menu, Popover, Row, Select } from 'antd';
import { getTradePageUrl } from '../../utils/markets';
import { useWallet } from '../../utils/wallet';
import logo from '../../assets/logo.svg';
const { Header } = Layout;

const styles = {
  header:{
    display: "flex"
  },
  logoWrapper:{
    color:"white",
    fontWeight: 600,
    fontSize:"18px",
    cursor:"pointer"
  },
  logo:{
    width:"25px",
    marginRight:"10px"
  },
  menu:{
    borderBottom: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'flex-end',
    flex: 1
  },
  headerEnd:{
    display: 'flex',
    alignItems: 'center',
    paddingRight: 5
  }
}

const Logo = (props)=>(
  <div style={styles.logoWrapper}>
    <img src={logo} alt="" style={styles.logo} />
    {'DEX.MN'}
  </div>
);

export default function TopBar_DexMn() {
  const { connected, wallet } = useWallet();
  const history = useHistory();
  const location = useLocation();
  const tradePageUrl = location.pathname.startsWith('/market/')?location.pathname:getTradePageUrl();
  const [searchFocussed, setSearchFocussed] = useState(false);
  const EXTERNAL_LINKS = {
    '/learn': 'https://serum-academy.com/en/serum-dex/',
    '/wallet-support': 'https://serum-academy.com/en/wallet-support',
    '/dex-list': 'https://serum-academy.com/en/dex-list/',
    '/explorer': 'https://explorer.solana.com',
    '/srm-faq': 'https://projectserum.com/srm-faq'
  };
  const handleClick = useCallback(
    (e) => {
      if (!(e.key in EXTERNAL_LINKS)) {
        history.push(e.key);
      }
    },
    [history],
  );
  return (
    <Layout>
      <Header style={styles.header}>
        <Logo onClick={() => history.push(tradePageUrl)}/>
        <Menu
          mode="horizontal" 
          selectedKeys={[location.pathname]} 
          style={styles.menu}
          onClick={handleClick}
        >
          <Menu.Item key={tradePageUrl} style={{ margin: '0 10px 0 20px' }}>
            АРИЛЖАА
          </Menu.Item>
          <Menu.Item key={tradePageUrl} style={{ margin: '0 10px 0 20px' }}>
            ТЭСТ МЕНЮ 1
          </Menu.Item>
          <Menu.Item key={tradePageUrl} style={{ margin: '0 10px 0 20px' }}>
            ТЭСТ МЕНЮ 2
          </Menu.Item>
          <Menu.Item key={tradePageUrl} style={{ margin: '0 10px 0 20px' }}>
            ТЭСТ МЕНЮ 3
          </Menu.Item>
          <Menu.Item key={tradePageUrl} style={{ margin: '0 10px 0 20px' }}>
            ТЭСТ МЕНЮ 4
          </Menu.Item>
          {connected && (!searchFocussed || location.pathname === '/balances') && (
            <Menu.Item key="/balances" style={{ margin: '0 10px' }}>
              BALANCES
            </Menu.Item>
          )}
          {connected && (!searchFocussed || location.pathname === '/orders') && (
            <Menu.Item key="/orders" style={{ margin: '0 10px' }}>
              ORDERS
            </Menu.Item>
          )}
          {!searchFocussed && (
            <Menu.SubMenu
              title="ТУСЛАМЖ"
              onTitleClick={() =>
                window.open(EXTERNAL_LINKS['/learn'], '_blank')
              }
              style={{ margin: '0 0px 0 10px' }}
            >
              <Menu.Item key="/learn">
                <a
                  href={EXTERNAL_LINKS['/learn']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How to trade
                </a>
              </Menu.Item>
              <Menu.Item key="/wallet-support">
                <a
                  href={EXTERNAL_LINKS['/wallet-support']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Supported wallets
                </a>
              </Menu.Item>
              <Menu.Item key="/dex-list">
                <a
                  href={EXTERNAL_LINKS['/dex-list']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DEX list
                </a>
              </Menu.Item>
              <Menu.Item key="/explorer">
                <a
                  href={EXTERNAL_LINKS['/explorer']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solana block explorer
                </a>
              </Menu.Item>
              <Menu.Item key="/srm-faq">
                <a
                  href={EXTERNAL_LINKS['/srm-faq']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SRM FAQ
                </a>
              </Menu.Item>
            </Menu.SubMenu>
          )}
        </Menu>
        <div style={styles.headerEnd}>
          dfhdfhdf
        </div>
      </Header>
    </Layout>
  )
}
