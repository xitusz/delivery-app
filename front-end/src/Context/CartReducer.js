const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
const RESET = 'RESET';

const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart];

  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.productId === product.productId,
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, productQuantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.productQuantity += 1;
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId, state) => {
  console.log(`Removing product with id: ${productId}`);

  const updatedCart = [...state.cart];

  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.productId === productId,
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };

  updatedItem.productQuantity -= 1;

  if (updatedItem.productQuantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart };
};

const changeCartQuantity = ({ productData, newQuantity }, state) => {
  console.log(
    `Changing the quantity of the product with id: ${productData.productId}`,
  );

  const NEGATIVE_ONE = -1;

  const updatedCart = [...state.cart];

  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.productId === productData.productId,
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };

  updatedItem.productQuantity = newQuantity;

  if (updatedItem.productQuantity === 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else if (updatedItemIndex === NEGATIVE_ONE) {
    updatedCart.push({ ...productData, productQuantity: newQuantity });
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart };
};

const cartReducer = (state, action) => {
  switch (action.type) {
  case ADD_PRODUCT:
    return addProductToCart(action.product, state);
  case REMOVE_PRODUCT:
    return removeProductFromCart(action.productId, state);
  case CHANGE_QUANTITY:
    return changeCartQuantity(action.product, state);
  case RESET:
    return action.product;
  default:
    return state;
  }
};

export { ADD_PRODUCT, REMOVE_PRODUCT, CHANGE_QUANTITY, cartReducer };
