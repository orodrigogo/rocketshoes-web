import produce from 'immer';


//estado inicial do carrinho é um array vazinho.
export default function cart(state = [], action){
  switch(action.type){
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => { // draft é uma copia do estado.
        const { product } = action;
       draft.push(product)
      });
      case '@cart/REMOVE':
        return produce(state, draft => {
          const productIndex = draft.findIndex(p => p.id === action.id);
          if(productIndex >= 0){
            draft.splice(productIndex, 1) //splice remove item do array (indexNoArray, qt de Itens para Remover a partir do array)
          }
        });
      case '@cart/UPDATE_AMOUNT_SUCCESS': {
        return produce(state, draft => {
          const productIndex = draft.findIndex(p => p.id === action.id);


          if(productIndex >= 0){
            draft[productIndex].amount = Number(action.amount);
          }
        });
      }
    default:
      return state;
  }
}
