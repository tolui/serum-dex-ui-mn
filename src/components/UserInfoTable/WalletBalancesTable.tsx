import React, { useState } from 'react';
import DataTable from '../layout/DataTable';
import { Button, Row } from 'antd';
import { settleAllFunds } from '../../utils/send';
import { notify } from '../../utils/notifications';
import { useConnection } from '../../utils/connection';
import { useWallet } from '../../utils/wallet';
import {
  useAllMarkets,
  useSelectedTokenAccounts,
  useTokenAccounts,
} from '../../utils/markets';
import StandaloneTokenAccountsSelect from '../StandaloneTokenAccountSelect';
import { abbreviateAddress } from '../../utils/utils';
import { PublicKey } from '@solana/web3.js';

export default function WalletBalancesTable({
  walletBalances,
}: {
  walletBalances: {
    coin: string;
    mint: string;
    walletBalance: number;
    openOrdersFree: number;
    openOrdersTotal: number;
  }[];
}) {
  walletBalances = walletBalances.sort(dynamicSort("-walletBalance"));
  const connection = useConnection();
  const { wallet, connected } = useWallet();
  const [selectedTokenAccounts] = useSelectedTokenAccounts();
  const [tokenAccounts, tokenAccountsConnected] = useTokenAccounts();
  const [allMarkets, allMarketsConnected] = useAllMarkets();
  const [settlingFunds, setSettlingFunds] = useState(false);

  async function onSettleFunds() {
    setSettlingFunds(true);
    try {
      if (!wallet) {
        notify({
          message: 'Хэтэвч холбоогүй байна',
          description: 'Хэтэвч холбогдоогүй байна хэтэвчээ холбоно уу',
          type: 'error',
        });
        return;
      }

      if (!tokenAccounts || !tokenAccountsConnected) {
        notify({
          message: 'Таталт хийхэд алдаа гарлаа',
          description: 'Токены данс холбоогүй байна',
          type: 'error',
        });
        return;
      }
      if (!allMarkets || !allMarketsConnected) {
        notify({
          message: 'Таталт хийхэд алдаа гарлаа',
          description: 'Маркет холбогдоогүй байна',
          type: 'error',
        });
        return;
      }
      await settleAllFunds({
        connection,
        tokenAccounts,
        selectedTokenAccounts,
        wallet,
        markets: allMarkets.map((marketInfo) => marketInfo.market),
      });
    } catch (e) {
      notify({
        message: 'Таталт хийхэд алдаа гарлаа',
        description: e.message,
        type: 'error',
      });
    } finally {
      setSettlingFunds(false);
    }
  }

  const columns = [
    {
      title: 'Coin',
      key: 'coin',
      width: '20%',
      render: (walletBalance) => {
        if(walletBalance.mint == "6ybxMQpMgQhtsTLhvHZqk8uqao7kvoexY6e8JmCTqAB1"){
          walletBalance.coin = "QUEST";
        }
        return (
          <Row align="middle">
            <a
              href={`https://explorer.solana.com/address/${walletBalance.mint}`}
              target={'_blank'}
              rel="noopener noreferrer"
            >
              {walletBalance.coin ||
                abbreviateAddress(new PublicKey(walletBalance.mint))}
            </a>
          </Row>
        )
      },
    },
    {
      title: 'Хэтэвчийн үлдэгдэл',
      dataIndex: 'walletBalance',
      key: 'walletBalance',
      defaultSortOrder: 'descend',
      width: '20%',
    },
    {
      title: 'Нээлттэй захиалгын нийт үлдэгдэл',
      dataIndex: 'openOrdersTotal',
      key: 'openOrdersTotal',
      width: '20%',
    },
    {
      title: 'Татаагүй үлдэгдэл',
      dataIndex: 'openOrdersFree',
      key: 'openOrdersFree',
      width: '20%',
    },
    {
      title: 'Сонгогдсон токены данс',
      key: 'selectTokenAccount',
      width: '20%',
      render: (walletBalance) => (
        <Row align="middle" style={{ width: '430px' }}>
          <StandaloneTokenAccountsSelect
            accounts={tokenAccounts?.filter(
              (t) => t.effectiveMint.toBase58() === walletBalance.mint,
            )}
            mint={walletBalance.mint}
          />
        </Row>
      ),
    },
  ];
  return (
    <React.Fragment>
      <DataTable
        emptyLabel="Үлдэгдэлгүй"
        dataSource={walletBalances}
        columns={columns}
        pagination={false}
      />
      {connected && (
        <Button onClick={onSettleFunds} loading={settlingFunds}>
          Бүгдийг валетруу татах
        </Button>
      )}
    </React.Fragment>
  );
}

function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}