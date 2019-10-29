/*desta forma, estamos renomeando a função que é retornada na
desestruturacão para ser utilizada como formatPrice*/
export const { format: formatPrice } = new Intl.NumberFormat('pt-BR',{
  style: 'currency',
  currency: 'BRL',
});
