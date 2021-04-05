import React, { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { getTradePageUrl } from '../../utils/markets';
import { useWallet } from '../../utils/wallet';
import logo from '../../assets/logo.svg';
import './TopBar.scss';
import SideMenu from './SideMenu';
import WalletConnect from './WalletConnect';
import {
  MenuOutlined
} from '@ant-design/icons';
const { Header } = Layout;

const Logo = (props)=>(
  <div className="logoWrapper">
    <img src={logo} alt="" className="logo" />
    {'DEX.MN'}
  </div>
);

export default function TopBar_DexMn() {
  const [sideMenu, sideMenuToggle] = useState(false);
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
      <Header className="header">
        <div className="hamburgerMenuCont">
          <MenuOutlined className="hamburgerMenu" onClick={()=>sideMenuToggle(!sideMenu)}/>
        </div>
        <Logo onClick={() => history.push(tradePageUrl)}/>
        <Menu
          mode="horizontal" 
          selectedKeys={[location.pathname]} 
          className="menu"
          onClick={handleClick}
        >
          <Menu.Item className="menuItem" key={tradePageUrl}>
            АРИЛЖАА
          </Menu.Item>
          {connected && (!searchFocussed || location.pathname === '/balances') && (
            <Menu.Item key="/balances" className="menuItem">
              ҮЛДЭГДЭЛ
            </Menu.Item>
          )}
          {connected && (!searchFocussed || location.pathname === '/orders') && (
            <Menu.Item key="/orders" className="menuItem">
              ЗАХИАЛГУУД
            </Menu.Item>
          )}
          {!searchFocussed && (
            <Menu.SubMenu className="menuItem"
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
        <div>
          <WalletConnect />
        </div>
      </Header>
      {sideMenu?(<SideMenu />):(null)}
    </Layout>
  )
}
