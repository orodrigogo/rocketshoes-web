import React from 'react';
import { Router } from 'react-router-dom';
// Provider vai deixar o estado global criado na store para a aplicacão toda.
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import Routes from './routes';
import Header from './components/Header';

import history from './services/history';


import store from './store';

function App() {
  return (
    <Provider store={store}>
   <Router history={history}>
   <Header />
   <Routes />
    <GlobalStyle/>
    <ToastContainer autoClose={3000}/> {/*3000 é a quantidade de segundos que a mensagem vai ficar aberta */}
   </Router>
   </Provider>
  );
}

export default App;
