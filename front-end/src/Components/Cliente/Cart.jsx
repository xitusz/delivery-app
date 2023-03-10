import React, { useContext } from 'react';
import CartItem from './CartItem';
import './Cart.css';
import { ConsumerProductsContext } from '../../Context/ConsumerProductsContext';

function Cart() {
  const productsContext = useContext(ConsumerProductsContext);

  const currentPage = 'customer_checkout__';

  return (
    <main className="Cart">
      <h2>Finalizar Pedido</h2>
      <div className="CartHeader">
        <p>Item</p>
        <p>Descrição</p>
        <p>Quantidade</p>
        <p>Valor Unitário</p>
        <p>Sub-Total</p>
        <p>Remover Item</p>
      </div>
      {productsContext.cart.map((product, index) => (
        <CartItem
          key={ `${product.productId}-${product.productName}` }
          product={ product }
          index={ index }
        />
      ))}
      <p data-testid={ `${currentPage}element-order-total-price` }>
        Total: R$
        {' '}
        {productsContext.cartTotal}
      </p>
    </main>
  );
}

export default Cart;
