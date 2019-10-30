import React from 'react';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete} from 'react-icons/md';
import { connect } from 'react-redux';
import { Container, ProductTable, Total } from './styles';
import * as CartActions from '../../store/modules/cart/actions';
import { bindActionCreators } from 'redux';
import { formatPrice } from '../../utils/format';

function Cart({cart, removeFromCart, updateAmountRequest, total}) {
  function increment(product){
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product){
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
   <Container>
     <ProductTable>
      <thead>
        <tr>
          <th />
          <th>PRODUTO</th>
          <th>QTD</th>
          <th>SUBTOTAL</th>
          <th />
        </tr>
        </thead>
        <tbody>
          { cart.map(product => (
            <tr>
            <td>
              <img src={product.image} alt={product.title} />
            </td>
            <td>
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
            </td>
            <td>
              <div>
                <button type="button" onClick={() => decrement(product)}>
                  <MdRemoveCircleOutline size={20} color="#7159c1"/>
                </button>
                <input type="number" readOnly value={product.amount} />
                <button type="button" onClick={() => increment(product)}>
                  <MdAddCircleOutline size={20} color="#7159c1"/>
                </button>
              </div>
            </td>
            <td>
              <strong>{product.subtotal}</strong>
            </td>
            <td>
              <button type="button" onClick={() => removeFromCart(product.id)}>
                <MdDelete size={20} color="#7159c1"/>
              </button>
            </td>
          </tr>
          ))}
        </tbody>
     </ProductTable>

     <footer>
       <button type="button">Finalizar pedido</button>
       <Total>
         <span>TOTAL</span>
         <strong>{total}</strong>
       </Total>
     </footer>
   </Container>
  );
}

// Função que pega informações do estado e mapeia no formato de propriedades do componente
const  mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  //reduce utilizamos quando queremos pegar um array e reduzir a um único valor.
  total: formatPrice(state.cart.reduce((total, product) => {
    return total + product.price *  product.amount; // A cada interação calcula o total e no fim retorna para a variavel total.
  }, 0)), // inicia com valor zero.
});

//Converte actions em propriedades de componentes.
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
