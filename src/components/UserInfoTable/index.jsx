import BalancesTable from './BalancesTable';
import OpenOrderTable from './OpenOrderTable';
import React from 'react';
import { Tabs, Typography } from 'antd';
import FillsTable from './FillsTable';
import FloatingElement from '../layout/FloatingElement';
import FeesTable from './FeesTable';
import { useOpenOrders, useBalances, useMarket } from '../../utils/markets';

const { Paragraph } = Typography;
const { TabPane } = Tabs;

export default function Index() {
  const { market } = useMarket();
  return (
    <FloatingElement style={{ flex: 1, paddingTop: 20 }}>
      <Typography>
        <Paragraph style={{ color: 'rgba(255,255,255,0.5)' }}>
          Биелсэн захиалгаа татахын тулд "Үлдэгдэлүүд" хэсэгрүү орж татах үйлдэл
          хийж хэтэвчрүүгээ аваарай
        </Paragraph>
        <Paragraph style={{ color: 'rgba(255,255,255,0.5)' }}>
          Та <a href="https://wallet.dex.mn">wallet.dex.mn</a> дээрх хэтэвчээ
          цэнэглэхийн тулд Binance, FTX, BitMax, гэх мэт бусад арилжаануудаас
          SOL худалдан авч дансаа цэнэглээрэй. Мөн FTX биржээс олон төрлийн SPL
          (Solana сүлжээн дээр ажилладаг токен) токен авч хэтэвчээ цэнэглэх
          боломжтой.{' '}
        </Paragraph>
      </Typography>
      <Tabs defaultActiveKey="orders">
        <TabPane tab="Нээлттэй захиалгууд" key="orders">
          <OpenOrdersTab />
        </TabPane>
        <TabPane tab="Арилжааны түүх" key="fills">
          <FillsTable />
        </TabPane>
        <TabPane tab="Үлдэгдэлүүд" key="balances">
          <BalancesTab />
        </TabPane>
        {market && market.supportsSrmFeeDiscounts ? (
          <TabPane tab="Шимтгэл, урамшуулал" key="fees">
            <FeesTable />
          </TabPane>
        ) : null}
      </Tabs>
    </FloatingElement>
  );
}

const OpenOrdersTab = () => {
  const openOrders = useOpenOrders();

  return <OpenOrderTable openOrders={openOrders} />;
};

const BalancesTab = () => {
  const balances = useBalances();

  return <BalancesTable balances={balances} />;
};
