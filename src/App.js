import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';
import Header from './components/Header';

function App() {
  return (
   <BrowserRouter>
    <GlobalStyle/>
     <Header />
    <Routes />
   </BrowserRouter>
  );
}

export default App;
