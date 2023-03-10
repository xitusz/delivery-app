import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminManage from '../Pages/AdminManage/AdminManage';
import Checkout from '../Pages/Cliente/Checkout/Checkout';
import PedidosDetalhes from '../Pages/Cliente/Detalhes/PedidosDetalhes';
import MeusPedidos from '../Pages/Cliente/Pedidos/MeusPedidos';
import Produtos from '../Pages/Cliente/Produtos/Produtos';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import VendaDetalhes from '../Pages/VendaDetalhes/VendaDetalhes';
import VendaPedidos from '../Pages/VendaPedidos/VendaPedidos';

function Router() {
  return (
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/seller/orders" element={ <VendaPedidos /> } />
      <Route path="/seller/orders/:id" element={ <VendaDetalhes /> } />
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/customer/products" element={ <Produtos /> } />
      <Route exact path="/customer/checkout" element={ <Checkout /> } />
      <Route exact path="/customer/orders" element={ <MeusPedidos /> } />
      <Route exact path="/customer/orders/:id" element={ <PedidosDetalhes /> } />
      <Route exact path="/admin/manage" element={ <AdminManage /> } />
    </Routes>
  );
}

export default Router;
