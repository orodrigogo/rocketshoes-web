import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';
import logo from '../../assets/images/logo.svg';

 function Header({ cartSize }) { // recuperando o reducer por props graças ao connect.
  return (
    <Container>
      <Link to="/">
      <img src={logo} alt="Rockeatshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
          </div>
          <MdShoppingBasket size={36} color="#FFF"/>
      </Cart>
    </Container>
  );
}

// Connect retorna o estado do recuder. Ou seja, sempre que mudar o estado, ele atualiza aqui também.
export default connect(state => ({
  cartSize: state.cart.length, //nome do reducer que eu quero acessar.
}))(Header);
