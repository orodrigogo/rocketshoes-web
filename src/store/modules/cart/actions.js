export function addToCartRequest(id){
  return {
    type: '@cart/ADD_REQUEST', // @cart/ (para indicar de qual modulo dispara a action)
    id,
  };
}

export function addToCartSuccess(product){
  return {
    type: '@cart/ADD_SUCCESS', // @cart/ (para indicar de qual modulo dispara a action)
    product,
  };
}

export function removeFromCart(id){
  return {
    type: '@cart/REMOVE', id,
  };
}

export function updateAmountRequest(id, amount){
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST', id, amount,
  };
}

export function updateAmountSuccess(id, amount){
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS', id, amount,
  };
}
