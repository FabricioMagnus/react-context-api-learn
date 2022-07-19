import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Produto from 'components/Produto';
import { CarrinhoContext } from 'pages/Common/Context/Carrinho';
import { usePagamentoContext } from 'pages/Common/Context/Pagamento';
import { UsuarioContext } from 'pages/Common/Context/Usuario';
import { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {carrinho, totalCarrinho} = useContext(CarrinhoContext);
  const {saldo = 0} = useContext(UsuarioContext);
  const {tiposDePagamento, formaPagamento, mudarFormaPagamento} = usePagamentoContext();
  const saldoAtualizado = useMemo(() => saldo - totalCarrinho);
  const history = useHistory();

  return (
    <Container>
      <Voltar
        onClick={() => history.goBack()}
      />
      
      <h2>
        Carrinho
      </h2>
      {carrinho.map(produto => (
        <Produto
        {...produto}
        key={produto.id}
        />
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
        value={formaPagamento.id}
        onChange={(e) => {mudarFormaPagamento(e.target.value)}}>
          {tiposDePagamento.map(pagamento => (
            <MenuItem key={pagamento.id} value={pagamento.id}>{pagamento.descricao}</MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ {totalCarrinho.toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {Number(saldo).toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo Final: </h2>
            <span> R$ {saldoAtualizado.toFixed(2)}</span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
        disabled={saldoAtualizado < 0}
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;