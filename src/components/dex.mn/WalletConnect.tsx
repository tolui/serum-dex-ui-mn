import React from 'react';
import { Dropdown, Menu } from 'antd';
import { useWallet } from '../../utils/wallet';
import LinkAddress from '../LinkAddress';

export default function WalletConnect() {
  const { connected, wallet, select, connect, disconnect } = useWallet();
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || '';

  const menu = (
    <Menu>
      {connected && <LinkAddress shorten={true} address={publicKey} />}
      <Menu.Item key="3" onClick={select}>
        Валлет солих
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown.Button onClick={connected ? disconnect : connect} overlay={menu}>
      {connected ? 'Валлет салгах' : 'Валлет холбох'}
    </Dropdown.Button>
  );
}
