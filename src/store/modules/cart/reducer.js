import produce from 'immer';


//estado inicial do carrinho é um array vazinho.
export default function cart(state = [], action){
  switch(action.type){
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => { // draft é uma copia do estado.
        // procurando por um produto no estado (verificando se já está no carrinho)
        const productIndex = draft.findIndex(p => p.id === action.product.id);
        // validando para nao ter produto repetido no carrinho de compra.
        if(productIndex >= 0){
          draft[productIndex].amount += 1; // se encontrar o produto, adiciona mais uma unidade daquele produto.
        }else{  // caso não encontre, entao sim, cria um novo produto dentro do carrinho.
          draft.push({
            ...action.product,
            amount: 1,
          });
        }
      });
      case '@cart/REMOVE':
        return produce(state, draft => {
          const productIndex = draft.findIndex(p => p.id === action.id);
          if(productIndex >= 0){
            draft.splice(productIndex, 1) //splice remove item do array (indexNoArray, qt de Itens para Remover a partir do array)
          }
        });
      case '@cart/UPDATE_AMOUNT': {
        if(action.amount <= 0 ){
          return state;
        }
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
