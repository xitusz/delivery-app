import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConsumerProductsContext } from '../../Context/ConsumerProductsContext';
import { createNewSale, getAllSellers } from '../../Services/endpointsAPI';
import './DetailsAndAddress.css';

function DetailsAndAddress() {
  const currentPage = 'customer_checkout__';
  const productsContext = useContext(ConsumerProductsContext);
  const [sellersList, setSellersList] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellerId, setSellerId] = useState(0);

  const navigate = useNavigate();

  const obj = {
    totalPrice: productsContext.cartTotal,
    deliveryAddress,
    deliveryNumber,
    sellerId,
  };

  useEffect(() => {
    getAllSellers().then((result) => {
      setSellerId(result[0].id);
      setSellersList(result);
    });
  }, [setSellerId, setSellersList]);

  async function checkoutComplete() {
    if (!deliveryAddress || !deliveryNumber) {
      return console.log('Preencha o endereço e número para continuar o checkout');
    }

    if (typeof obj.totalPrice === 'string') {
      obj.totalPrice = +(+obj.totalPrice.replace(',', '.')).toFixed(2);
    }

    const products = productsContext.cart.map(
      ({ productId, productQuantity }) => ({ productId, quantity: productQuantity }),
    );

    const userData = JSON.parse(localStorage.getItem('user'));
    const saleId = await createNewSale(obj, products, userData);

    productsContext.setCartTotal(0);
    productsContext.dispatch({ type: 'RESET', product: { cart: [] } });
    navigate(`/customer/orders/${saleId}`);
  }

  return (
    <main className="DetailsAndAddress">
      <p>Detalhes e Endereço para Entrega</p>
      <div className="DetailsAndAddressHeader">
        <p>P. Vendedora Responsável</p>
        <p>Endereço</p>
        <p>Número</p>
      </div>
      <div className="DetailsAndAddressInputs">
        <select
          id="select-seller"
          data-testid={ `${currentPage}select-seller` }
          onChange={ (e) => setSellerId(Number(e.target.value)) }
        >
          {sellersList.map((seller) => (
            <option key={ seller.id } value={ seller.id }>
              {seller.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Endereço"
          data-testid={ `${currentPage}input-address` }
          onChange={ (e) => setDeliveryAddress(e.target.value) }
        />
        <input
          type="text"
          placeholder="Número"
          data-testid={ `${currentPage}input-addressNumber` }
          onChange={ (e) => setDeliveryNumber(e.target.value) }
        />
      </div>
      <button
        className="finishButton"
        data-testid="customer_checkout__button-submit-order"
        onClick={ checkoutComplete }
        type="button"
      >
        FINALIZAR PEDIDO
      </button>
    </main>
  );
}

export default DetailsAndAddress;
