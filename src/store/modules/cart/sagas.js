import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { addToCartSuccess } from './actions';
//* é uma funcionalidade do JavaScript que se chama Generation. É equivalente ao async.
function* addToCart({ id }){
  //yield é equivalente ao await.
  const response = yield call(api.get, `/products/${id}`);
  console.log(response.data);

  yield put(addToCartSuccess(response.data));

}

//Listener que fica escutando com a action é executada para disparar o redux saga.
export default all([
  // takelatest: se nao termina a chamada a api, adiciona apenas uma vez. Pois, pega a ultima requisicao do usuario apenas, caso ainda, nao tenha terminado.
  takeLatest('@cart/ADD_REQUEST', addToCart),
  // primeiro parametro é qual ação do redux queremos ouvir, e o segundo parametro é qual a action/funcao que queremos disparar.
]);
