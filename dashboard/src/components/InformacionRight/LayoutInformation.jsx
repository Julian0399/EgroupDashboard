import React from 'react'
import UsersCard from './UsersCard'
import style from "./LayoutInformation.module.css";
import { MarketCard } from './MarketCard';
import ActiveCryptos from './ActiveCryptos';

const LayoutInformation = () => {
  return (
    <div className={style.layoutInformation}>
      <UsersCard />
      <MarketCard />
      <ActiveCryptos />
    </div>
  )
}

export default LayoutInformation
