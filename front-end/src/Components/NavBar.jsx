import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import UserContext from '../Context/AppContext';
import './NavBar.css';

function NavBar(props) {
  const { name1, className1, link1, name2, className2, link2, currentPage } = props;

  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <nav>
      <div className="navbar_itens">
        <Link to={ link1 }>
          <Button
            className={ className1 }
            dataTestId={ `${currentPage}element-navbar-link-products` }
          >
            {name1}
          </Button>
        </Link>
        {className2 && (
          <Link to={ link2 }>
            <Button
              className={ className2 }
              dataTestId={ `${currentPage}element-navbar-link-orders` }
            >
              {name2}
            </Button>
          </Link>
        )}
      </div>
      <div className="user_itens">
        <Button
          className="user"
          dataTestId={ `${currentPage}element-navbar-user-full-name` }
        >
          {currentUser ? currentUser.name : 'Usuário'}
        </Button>
        <Link to="/login">
          <button
            type="button"
            className="logout"
            data-testid={ `${currentPage}element-navbar-link-logout` }
            onClick={ () => {
              localStorage.removeItem('user');
              setUserData(undefined);
              navigate('/');
            } }
          >
            SAIR
          </button>
        </Link>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  className1: PropTypes.string.isRequired,
  className2: PropTypes.string.isRequired,
  name1: PropTypes.string.isRequired,
  name2: PropTypes.string.isRequired,
  link1: PropTypes.string.isRequired,
  link2: PropTypes.string.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default NavBar;
