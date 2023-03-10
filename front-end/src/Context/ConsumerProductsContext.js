import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import {
  ADD_PRODUCT, cartReducer, CHANGE_QUANTITY, REMOVE_PRODUCT,
} from './CartReducer';

export const ConsumerProductsContext = createContext();

const ConsumerProductsContextProvider = ({ children }) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [cartState, dispatch] = useReducer(cartReducer, {
    cart: [],
  });

  // const TIMEOUT = 500;

  useEffect(() => {
    let sum = 0;
    cartState.cart.forEach((eachProduct) => {
      sum += +eachProduct.productPrice * eachProduct.productQuantity;
    });

    setCartTotal((sum.toFixed(2)).replace('.', ','));

    localStorage.setItem('carrinho', JSON.stringify(cartState.cart));
  }, [cartState]);

  const addProductToCart = (product) => {
    // setTimeout(() => {
    // }, TIMEOUT);
    dispatch({ type: ADD_PRODUCT, product });
  };

  const removeProductFromCart = (productId) => {
    // setTimeout(() => {
    // }, TIMEOUT);
    dispatch({ type: REMOVE_PRODUCT, productId });
  };

  const changeCartQuantity = (product) => {
    // setTimeout(() => {
    // }, TIMEOUT);
    dispatch({ type: CHANGE_QUANTITY, product });
  };

  return (
    <ConsumerProductsContext.Provider
      value={ {
        cart: cartState.cart,
        cartTotal,
        dispatch,
        setCartTotal,
        addProductToCart,
        removeProductFromCart,
        changeCartQuantity,
      } }
    >
      {children}
    </ConsumerProductsContext.Provider>
  );
};

ConsumerProductsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ConsumerProductsContextProvider;
