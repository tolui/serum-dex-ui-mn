import React, { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { getTradePageUrl } from '../../utils/markets';
import { useWallet } from '../../utils/wallet';
import {
    LineChartOutlined,
    QuestionCircleOutlined,
    WalletOutlined,
    BarsOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu;
const EXTERNAL_LINKS = {
    '/learn': 'https://serum-academy.com/en/serum-dex/',
    '/wallet-support': 'https://serum-academy.com/en/wallet-support',
    '/dex-list': 'https://serum-academy.com/en/dex-list/',
    '/explorer': 'https://explorer.solana.com',
    '/srm-faq': 'https://projectserum.com/srm-faq'
};
export default function SideMenu(props) {
    const { connected, wallet } = useWallet();
    const [searchFocussed, setSearchFocussed] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const tradePageUrl = location.pathname.startsWith('/market/')?location.pathname:getTradePageUrl();
    const handleClick = useCallback(
      (e) => {
        if (!(e.key in EXTERNAL_LINKS)) {
          history.push(e.key);
        }
      },
      [history],
    );
    return (
        <div style={{ width: 256, position:"absolute", zIndex:999, top:"63px" }}>
          {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button> */}
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            onClick={handleClick}
          >
            <Menu.Item key={tradePageUrl} icon={<LineChartOutlined />}>
              Арилжаа
            </Menu.Item>
            {connected && (!searchFocussed || location.pathname === '/balances') && (
              <Menu.Item key="/balances" icon={<WalletOutlined />}>
                Үлдэгдэл
              </Menu.Item>
            )}
            {connected && (!searchFocussed || location.pathname === '/orders') && (
              <Menu.Item key="/orders" icon={<BarsOutlined />}>
                Захиалгууд
              </Menu.Item>
            )}
            <SubMenu 
                key="/learn"
                icon={<QuestionCircleOutlined />} 
                title="Тусламж"
            >
              <Menu.Item key="/learn">
                <a href={EXTERNAL_LINKS['/learn']} target="_blank" rel="noopener noreferrer">
                    How to trade
                </a>
              </Menu.Item>
              <Menu.Item key="/wallet-support">
                <a href={EXTERNAL_LINKS['/wallet-support']} target="_blank" rel="noopener noreferrer">
                    Supported wallets
                </a>
              </Menu.Item>
              <Menu.Item key="/dex-list">
                <a href={EXTERNAL_LINKS['/dex-list']} target="_blank" rel="noopener noreferrer" >
                    DEX list
                </a>
              </Menu.Item>
              <Menu.Item key="/explorer">
                <a href={EXTERNAL_LINKS['/explorer']} target="_blank" rel="noopener noreferrer">
                    Solana block explorer
                </a>
              </Menu.Item>
              <Menu.Item key="/srm-faq">
                <a href={EXTERNAL_LINKS['/srm-faq']} target="_blank" rel="noopener noreferrer" >
                    SRM FAQ
                </a>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
    );
}