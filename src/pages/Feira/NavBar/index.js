import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useContext } from 'react';
import { CarrinhoContext } from 'pages/Common/Context/Carrinho';
import { useHistory } from 'react-router-dom';

export default function NavBar() {
  const {quantidade} = useContext(CarrinhoContext);
  const history = useHistory();

  return (
    <Nav>
      <Logo />
      <IconButton
        disabled={!quantidade}
        onClick={() => history.push('/carrinho')}
      >
        <Badge
          color="primary"
          badgeContent={quantidade}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}