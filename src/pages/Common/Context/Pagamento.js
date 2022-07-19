import { createContext , useContext, useState} from 'react';

export const PagamentoContext = createContext();
PagamentoContext.displayName = 'PagamentoContext';

export const PagamentoProvider = ({children}) => {
    const tiposDePagamento = [{
        nome: "boleto",
        juros: 1,
        descricao: "Boleto Bancário",
        id:1},
        {
        nome: "cartao",
        juros: 1.3,
        descricao: "Cartão de Crédito",
        id:2},
        {
        nome: "pix",
        juros: 1,
        descricao: "PIX",
        id:3},
        {
        nome: "paypal",
        juros: 1.5,
        descricao: "PayPal",
        id:4}        
    ]
    const [formaPagamento, setFormaPagamento] = useState(tiposDePagamento[0]);

    return(
        <PagamentoContext.Provider value={{
            tiposDePagamento, 
            formaPagamento, 
            setFormaPagamento
        }}>
            {children}
        </PagamentoContext.Provider>
    )    
}

    export const usePagamentoContext = () => {
        const {
            tiposDePagamento,
            formaPagamento,
            setFormaPagamento
        } = useContext(PagamentoContext);

        function mudarFormaPagamento(id) {
            const pagamentoAtual = tiposDePagamento.find(pagamento => pagamento.id === id);
            setFormaPagamento(pagamentoAtual);
        }

        return {
            tiposDePagamento,
            formaPagamento,
            setFormaPagamento,
            mudarFormaPagamento
        }
    }