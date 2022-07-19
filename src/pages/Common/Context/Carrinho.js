import {createContext, useContext, useEffect, useState} from 'react';

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = 'CarrinhoContext';

export const CarrinhoProvider = ({children}) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidade, setQuantidade] = useState(0);
  const [totalCarrinho, setTotalCarrinho] = useState(0);

    return(
        <CarrinhoContext.Provider value={{carrinho, setCarrinho, quantidade, setQuantidade, totalCarrinho, setTotalCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export const useCarrinho = () => {
    const {carrinho, setCarrinho, quantidade, setQuantidade, totalCarrinho, setTotalCarrinho} = useContext(CarrinhoContext);

    function ChangeQuantidade (id, quantidade) {
      return carrinho.map(produtoCarrinho => {
        if (produtoCarrinho.id === id) {
          produtoCarrinho.quantidade+= quantidade;
        }
        return produtoCarrinho;
      }
    )}

    function addCarrinho (novoProduto) {
        const produtoJaAdicionado = carrinho.some(produtoCarrinho => produtoCarrinho.id === novoProduto.id);

        if (!produtoJaAdicionado) {
          novoProduto.quantidade = 1;
          return setCarrinho([...carrinho, novoProduto]);
        }
        setCarrinho(ChangeQuantidade(novoProduto.id, 1));
    }

    function removeProduto (id) {
        const produto = carrinho.find(produtoCarrinho => produtoCarrinho.id === id);
        const lastProduto = produto.quantidade === 1;

        if (lastProduto) {
          return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(produtoCarrinho => produtoCarrinho.id !== id));
        }
        setCarrinho(ChangeQuantidade(id, -1))
    }

    useEffect(() => {
      const {totalProdutos, quantidadeProdutosAtual} = carrinho.reduce((contador, produto) => ({
        quantidadeProdutosAtual: contador.quantidadeProdutosAtual + produto.quantidade,
        totalProdutos: contador.totalProdutos + (produto.quantidade * produto.valor)
      }), {
        quantidadeProdutosAtual: 0,
        totalProdutos: 0,
      });
      setQuantidade(quantidadeProdutosAtual);
      setTotalCarrinho(totalProdutos);
    }, [carrinho, setQuantidade , setTotalCarrinho]); 


    return {carrinho, setCarrinho, addCarrinho, removeProduto, quantidade, setQuantidade, totalCarrinho, setTotalCarrinho};
}