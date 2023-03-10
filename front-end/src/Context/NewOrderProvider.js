import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import NewOrderContext from './NewOrderContext';

function NewOrderProvider({ children }) {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [itensList, setItensList] = useState([]);
  const [totalPrice, setTotalPrice] = useState('');
  const [disableBtnCustomer, setDisableBtnCustomer] = useState(true);

  const [navBarSair, setNavBarSair] = useState(false);

  useEffect(() => {
    setItensList([]);
  }, [navBarSair]);

  return (
    <NewOrderContext.Provider
      value={ {
        userId, // Tela de login (recebe do banco de dados)
        setUserId,

        userName, // Tela de login (recebe do banco de dados)
        setUserName,

        itensList, // Tela de produtos (recebe do usuário)
        setItensList,

        totalPrice, // Tela checkout (valor automático)
        setTotalPrice,

        navBarSair,
        setNavBarSair,

        disableBtnCustomer,
        setDisableBtnCustomer,
      } }
    >
      {children}
    </NewOrderContext.Provider>
  );
}

NewOrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NewOrderProvider;
