import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './CartItem.css';
import { ConsumerProductsContext } from '../../Context/ConsumerProductsContext';

function CartItem(props) {
  const productsContext = useContext(ConsumerProductsContext);

  const {
    product: { productId, productName, productPrice, productQuantity },
    index,
  } = props;

  const currentPage = 'customer_checkout__';

  return (
    <main className="CartItem">
      <p data-testid={ `${currentPage}element-order-table-item-number-${index}` }>
        {index + 1}
      </p>
      <p data-testid={ `${currentPage}element-order-table-name-${index}` }>
        {productName}
      </p>
      <p data-testid={ `${currentPage}element-order-table-quantity-${index}` }>
        {productQuantity}
      </p>
      <p data-testid={ `${currentPage}element-order-table-unit-price-${index}` }>
        {productPrice.replace('.', ',')}
      </p>
      <p data-testid={ `${currentPage}element-order-table-sub-total-${index}` }>
        {(productPrice * productQuantity).toFixed(2).replace('.', ',')}
      </p>
      <button
        type="button"
        data-testid={ `${currentPage}element-order-table-remove-${index}` }
        onClick={ () => productsContext.removeProductFromCart(productId) }
      >
        Remover Item
      </button>
    </main>
  );
}

CartItem.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.string.isRequired,
    productQuantity: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CartItem;
