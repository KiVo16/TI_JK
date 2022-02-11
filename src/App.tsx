import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import { RootState } from '.';
import './App.scss';
import Header from './containers/Header/Header';
import LoginModal from './containers/LoginModal/LoginModal';
import MainPage from './containers/Pages/MainPage/MainPage';
import OrderPage from './containers/Pages/OrderPage/OrderPage';
import OrdersPage from './containers/Pages/OrdersPage/OrdersPage';
import SummaryPage from './containers/Pages/SummaryPage/SummaryPage';
import ProductModal from './containers/ProductModal/ProductModal';
import { globalAuth, globalSetLoginOpen, globalSetProductOpen } from './redux/GlobalReducer';


function App() {

  const reduxDispatch = useDispatch();
  const loginOpen = useSelector((state: RootState) => state.global.loginOpen);
  const productOpen = useSelector((state: RootState) => state.global.productOpen);

  useEffect(() => {
    reduxDispatch(globalAuth());
  }, [])

  return (
    <div className="container">
      <Header />
      <LoginModal open={loginOpen} onClose={() => reduxDispatch(globalSetLoginOpen(false))} />
      <ProductModal open={productOpen} onClose={() => reduxDispatch(globalSetProductOpen(false))} />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="cart" element={<SummaryPage />} />
          <Route path="orders/:id" element={<OrderPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
