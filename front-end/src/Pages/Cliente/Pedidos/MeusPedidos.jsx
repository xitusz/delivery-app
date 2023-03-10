import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../Components/NavBar';
import { getAllOrdersByUserId } from '../../../Services/endpointsAPI';
import './MeusPedidos.css';

const dataTestid33 = 'customer_products__element-order-id';
const dataTestid34 = 'customer_products__element-delivery-status';
const dataTestid35 = 'customer_products__element-order-date';
const dataTestid36 = 'customer_products__element-card-price';

export default function MeusPedidos() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingTag = <h3>Loading ...</h3>;
  const numberTen = 10;

  const convertDateFormat = (date) => {
    const numberEight = 8;
    const numberFive = 5;
    const numberFour = 4;
    const day = date.substr(numberEight, 2);
    const month = date.substr(numberFive, 2);
    const year = date.substr(0, numberFour);
    return `${day}/${month}/${year}`;
  };

  const putComma = (value) => value.toString().replace('.', ',');

  const selectStatusCss = (status) => {
    if (status === 'Pendente') return 'ordem-pendente';
    if (status === 'Preparando') return 'ordem-preparando';
    return 'ordem-entregue';
  };

  const render = (sale) => (
    <div className="rigth-side">
      <div className="upper-side">
        <div className="date-price-container">
          <div data-testid={ `${dataTestid35}-${sale.id}` } className="order-date">
            { convertDateFormat(sale.saleDate) }
          </div>
          <div data-testid={ `${dataTestid36}-${sale.id}` } className="order-total">
            R$
            { ' ' }
            { putComma(sale.totalPrice) }
          </div>
        </div>
      </div>
    </div>
  );

  const renderTags = (sale, index) => (
    <div key={ index } className="each-card">
      <Link to={ `/customer/orders/${sale.id} ` } className="link">
        <div className="unit-card-container">
          <div data-testid={ `${dataTestid33}-${sale.id}` } className="order-number">
            <div className="pedido">Pedido</div>
            <div className="pedido">
              { sale.id < numberTen ? `000${sale.id}` : `00${sale.id}` }
            </div>
          </div>
          <div
            data-testid={ `${dataTestid34}-${sale.id}` }
            className="status-container"
          >
            <div className={ selectStatusCss(sale.status) }>
              { sale.status.toUpperCase() }
            </div>
          </div>
          { render(sale) }
        </div>
      </Link>
    </div>
  );

  useEffect(() => {
    setIsLoading(true);
    const userData = JSON.parse(localStorage.getItem('user'));
    getAllOrdersByUserId(userData.id)
      .then((resp) => {
        setOrders(resp);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar
        className1="inactivePage"
        name1="PRODUTOS"
        link1="/customer/products"
        className2="activePage"
        link2="/customer/orders"
        name2="MEUS PEDIDOS"
        currentPage="customer_products__"
      />
      <section className="cardsContainer">
        {
          isLoading
            ? loadingTag
            : orders.map((e, index) => renderTags(e, index))
        }
      </section>
    </div>
  );
}
