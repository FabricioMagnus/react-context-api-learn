import {createContext, useContext, useState} from 'react';

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = 'CarrinhoContext';

export const CarrinhoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([]);

    return(
        <CarrinhoContext.Provider value={{carrinho, setCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    )

}

export const useCarrinho = () => {
    const {carrinho, setCarrinho} = useContext(CarrinhoContext);

    function addCarrinho (novoProduto) {
        const produtoJaAdicionado = carrinho.some(produtoCarrinho => produtoCarrinho.id === novoProduto.id);
        if (!produtoJaAdicionado) {
          novoProduto.quantidade = 1;
          return setCarrinho([...carrinho, novoProduto]);
        }
        setCarrinho(carrinhoAnterior => carrinhoAnterior.map(produtoCarrinho => {
          if (produtoCarrinho.id === novoProduto.id) {
            produtoCarrinho.quantidade++;
          }
          return produtoCarrinho;
        }));
      }   

    return {carrinho, setCarrinho, addCarrinho};
}