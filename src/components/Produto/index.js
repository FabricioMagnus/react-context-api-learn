import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCarrinho } from 'pages/Common/Context/Carrinho';

function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {

  const { carrinho, addCarrinho , removeProduto } = useCarrinho();
  const produtoCarrinho = carrinho.find(produto => produto.id === id);
  
   return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>
            {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            color="secondary"
            onClick={() => removeProduto(id)}
            disabled={!produtoCarrinho}
          >
            <RemoveIcon />
          </IconButton>
          <span>{produtoCarrinho?.quantidade || 0}</span>
          <IconButton
            color="primary"
            onClick={()=>addCarrinho({id, nome, foto, valor, unidade})}>          
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)