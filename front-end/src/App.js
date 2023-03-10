import React from 'react';
import Router from './Routes/Routes';
import AppProvider from './Context/AppProvider';
import NewOrderProvider from './Context/NewOrderProvider';
import ConsumerProductsContextProvider from './Context/ConsumerProductsContext';

function App() {
  return (
    <AppProvider>
      <NewOrderProvider>
        <ConsumerProductsContextProvider>
          <Router />
        </ConsumerProductsContextProvider>
      </NewOrderProvider>
    </AppProvider>
  );
}

export default App;
