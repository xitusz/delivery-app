import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { ConsumerProductsContext } from '../../Context/ConsumerProductsContext';
import './ProductCard.css';

function ProductCard(props) {
  const [productQuantity, setProductQuantity] = useState(0);

  const { productId, productName, productPrice, productUrlImage } = props;

  const productsContext = useContext(ConsumerProductsContext);

  const dataTestIdPrefix = 'customer_products__';

  const productData = {
    productId,
    productName,
    productPrice,
    productUrlImage,
    productQuantity,
  };

  const increaseProductQuantity = () => {
    setProductQuantity(productQuantity + 1);

    productsContext.addProductToCart(productData);
  };

  const decreaseProductQuantity = () => {
    if (productQuantity > 0) {
      setProductQuantity(productQuantity - 1);

      productsContext.removeProductFromCart(productId);
    }
  };

  const handleInputChange = ({ target: { value } }) => {
    const newQuantity = parseInt(value, 10);

    setProductQuantity(newQuantity);

    productsContext.changeCartQuantity({
      productData,
      newQuantity,
    });
  };

  return (
    <div data-testid="">
      <p data-testid={ `${dataTestIdPrefix}element-card-price-${productId}` }>
        {productPrice.replace('.', ',')}
      </p>
      <img
        src={ productUrlImage }
        alt=""
        className="productImage"
        data-testid={ `${dataTestIdPrefix}img-card-bg-image-${productId}` }
      />
      <p data-testid={ `${dataTestIdPrefix}element-card-title-${productId}` }>
        {productName}
      </p>
      <div className="counter">
        <button
          type="button"
          className="counter-btn"
          data-testid={ `${dataTestIdPrefix}button-card-rm-item-${productId}` }
          onClick={ decreaseProductQuantity }
        >
          -
        </button>
        <input
          type="number"
          min="0"
          value={ productQuantity }
          data-testid={ `${dataTestIdPrefix}input-card-quantity-${productId}` }
          onChange={ handleInputChange }
        />
        <button
          type="button"
          className="counter-btn"
          data-testid={ `${dataTestIdPrefix}button-card-add-item-${productId}` }
          onClick={ increaseProductQuantity }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  productId: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
  productPrice: PropTypes.string.isRequired,
  productUrlImage: PropTypes.string.isRequired,
};

export default ProductCard;
