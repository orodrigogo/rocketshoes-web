import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { addToCartSuccess, updateAmountSuccess } from './actions';
import { formatPrice } from '../../../utils/format';
import { toast } from 'react-toastify';
import history from '../../../services/history';

//* é uma funcionalidade do JavaScript que se chama Generation. É equivalente ao async.
function* addToCart({ id }){
  const productExists = yield select(state => state.cart.find(p => p.id === id));

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount  = stock.data.amount;
  const currentAmount  = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if(amount > stockAmount){
    toast.error('Quantidade solicitada indisponível no estoque!');
    return;
  }

  if(productExists){
    // put dispara uma action
    yield put(updateAmountSuccess(id, amount));

  }else{

  //yield é equivalente ao await.
  const response = yield call(api.get, `/products/${id}`);

  const data = {
    ...response.data,
    amount: 1,
    priceFormatted: formatPrice(response.data.price),
    }
    yield put(addToCartSuccess(data));
    history.push('/cart');
  }

}

function* updateAmount({id, amount}){
  if(amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if(amount > stockAmount){
    toast.error('Quantidade solicitada indisponível no estoque!');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

//Listener que fica escutando com a action é executada para disparar o redux saga.
export default all([
  // takelatest: se nao termina a chamada a api, adiciona apenas uma vez. Pois, pega a ultima requisicao do usuario apenas, caso ainda, nao tenha terminado.
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
  // primeiro parametro é qual ação do redux queremos ouvir, e o segundo parametro é qual a action/funcao que queremos disparar.
]);
