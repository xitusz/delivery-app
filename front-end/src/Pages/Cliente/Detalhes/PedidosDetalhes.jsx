import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../../../Components/NavBar';
import { getAllOrdersBySaleId, getAllSellers } from '../../../Services/endpointsAPI';

const dataTestId37 = 'customer_order_details__element-order-details-label-order-id';
const dataTestId38 = 'customer_order_details__element-order-details-label-seller-name';
const dataTestId39 = 'customer_order_details__element-order-details-label-order-date';
const
  dataTestId40 = 'customer_order_details__element-order-details-label-delivery-status';
const dataTestId41 = 'customer_order_details__element-order-table-item-number';
const dataTestId42 = 'customer_order_details__element-order-table-name';
const dataTestId43 = 'customer_order_details__element-order-table-quantity';
const dataTestId44 = 'customer_order_details__element-order-table-unit-price';
const dataTestId45 = 'customer_order_details__element-order-table-sub-total';
const dataTestId46 = 'customer_order_details__element-order-total-price';
const dataTestId47 = 'customer_order_details__button-delivery-check';

export default function PedidosDetalhes() {
  const { id } = useParams();
  const [itens, setItens] = useState([]);
  const [sale, setSale] = useState({});
  const [sellerName, setSellerName] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [entregue, setEntregue] = useState(false);
  const loadingTag = <h3>Loading ...</h3>;

  useEffect(() => {
    setIsLoading(true);
    getAllOrdersBySaleId(id)
      .then((result) => {
        console.log(result);
        setItens(result.products);
        console.log(result.products);
        setSale(result);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    getAllSellers()
      .then((result) => {
        setSellerName(result[0].name);
      });
  }, [setSellerName]);

  useEffect(() => {
    setEntregue(true);
  }, [entregue]);

  const clickEntregue = () => {
    console.log('clicar entregue');
    setEntregue(true);
  };

  const putComma = (value) => value.toString().replace('.', ',');

  const convertDateFormat = (date) => {
    const numberEight = 8;
    const numberFive = 5;
    const numberFour = 4;
    const day = date.substr(numberEight, 2);
    const month = date.substr(numberFive, 2);
    const year = date.substr(0, numberFour);
    return `${day}/${month}/${year}`;
  };

  const renderTable = () => (
    <table>
      <thead>
        <tr>
          <th data-testid={ `${dataTestId37}-${id}` }>
            { `PEDIDO ${sale.id} ` }
          </th>
          <th data-testid={ `${dataTestId38}-${id}` }>
            { `P. Vend: ${sellerName} ` }
          </th>
          <th data-testid={ `${dataTestId39}-${id}` }>
            { convertDateFormat(sale.saleDate) }
          </th>
          <th data-testid={ `${dataTestId40}-${id}` }>
            { sale.status }
          </th>
          <th>
            <button
              id="btnSaiu"
              type="button"
              data-testid={ `${dataTestId47}` }
              onClick={ clickEntregue }
              disabled
            >
              MARCAR COMO ENTREGUE
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
        { itens.map((item, index) => (
          <tr key={ index }>
            <th data-testid={ dataTestId41 }>
              { index + 1 }
            </th>
            <th data-testid={ dataTestId42 }>
              { item.name }
            </th>
            <th data-testid={ dataTestId43 }>
              { item.SalesProducts.quantity }
            </th>
            <th data-testid={ dataTestId44 }>
              { putComma(item.price) }
            </th>
            <th data-testid={ dataTestId45 }>
              { putComma((item.price * item.SalesProducts.quantity).toFixed(2)) }
            </th>
          </tr>
        ))}
        <tr>
          <th data-testid={ dataTestId46 }>
            { `TOTAL: R$ ${putComma(sale.totalPrice)}` }
          </th>
        </tr>
      </tbody>
    </table>
  );

  return (
    <main>
      <Navbar
        className1="inactivePage"
        name1="PRODUTOS"
        link1="/customer/products"
        className2="activePage"
        link2="/customer/orders"
        name2="MEUS PEDIDOS"
        currentPage="customer_products__"
      />
      <h3>Detalhe do Pedido</h3>
      <section>
        {
          isLoading
            ? loadingTag
            : renderTable()
        }
      </section>
    </main>
  );
}
