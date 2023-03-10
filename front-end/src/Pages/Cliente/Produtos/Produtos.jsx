import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../Components/NavBar';
import ProductList from '../../../Components/Cliente/ProductList';
import Button from '../../../Components/Button';
import './Produtos.css';
import { ConsumerProductsContext } from '../../../Context/ConsumerProductsContext';

function Produtos() {
  const productsContext = useContext(ConsumerProductsContext);

  return (
    <div>
      <NavBar
        className1="activePage"
        name1="PRODUTOS"
        link1="/customer/products"
        className2="inactivePage"
        name2="MEUS PEDIDOS"
        link2="/customer/orders"
        currentPage="customer_products__"
      />
      <ProductList />
      {productsContext.cart.length === 0 ? (
        <button
          type="button"
          className="goToCart-btn"
          data-testid="customer_products__button-cart"
          disabled
        >
          Ver carrinho: R$
          {productsContext.cartTotal}
        </button>
      ) : (
        <Link to="/customer/checkout">
          <Button
            className="goToCart-btn"
            dataTestId="customer_products__button-cart"
          >
            Ver carrinho: R$
            {' '}
            <p data-testid="customer_products__checkout-bottom-value">
              {productsContext.cartTotal}
            </p>
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Produtos;
