import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NewOrderContext from '../../Context/NewOrderContext';
import UserContext from '../../Context/AppContext';

function NavbarSellers() {
  const { userName, navBarSair, setNavBarSair } = useContext(NewOrderContext);
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <nav className="icons-container">
        <Link
          to="/seller/orders"
          data-testid="customer_products__element-navbar-link-orders"
          className="orders"
        >
          PEDIDOS
        </Link>
        <div className="right-side">
          <div
            data-testid="customer_products__element-navbar-user-full-name"
            className="seller-name"
          >
            <p>{ `${userName}` }</p>
          </div>
          <Link
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
            className="logout"
            onClick={ () => {
              setNavBarSair(!navBarSair);
              setUserData(undefined);
              navigate('/');
            } }
          >
            Sair
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavbarSellers;
