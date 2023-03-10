import React from 'react';
import Cart from '../../../Components/Cliente/Cart';
import DetailsAndAddress from '../../../Components/Cliente/DetailsAndAddress';
import NavBar from '../../../Components/NavBar';

function Checkout() {
  return (
    <div className="checkout">
      <NavBar
        className1="activePage"
        name1="PRODUTOS"
        link1="/customer/products"
        className2="inactivePage"
        name2="MEUS PEDIDOS"
        link2="/customer/orders"
        currentPage="customer_checkout__"
      />
      <Cart />
      <DetailsAndAddress />
    </div>
  );
}

export default Checkout;
