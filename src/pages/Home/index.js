import React, { Component  } from 'react';
import { connect } from 'react-redux'; // para conectar o noss componente com o estado d oredux.
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../utils/format';
import api from '../../services/api';

import { ProductList } from './styles';

 class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount(){
    const response = await api.get('products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

 handleAddProduct = product => {
   // dispatch dispara uma action ao redux.
   const { dispatch } = this.props;

   dispatch({
     type: 'ADD_TO_CART',
     product,
   });
 }

  render(){
    const { products } = this.state;
    return(
      <ProductList>
      { products.map(product =>(
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <label>{product.priceFormatted}</label>

          <button type="button" onClick={() => this.handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> 3
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
    )
  }
}


// usando o redux.
export default connect()(Home);
