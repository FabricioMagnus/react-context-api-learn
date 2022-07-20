import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UsuarioProvder } from "pages/Common/Context/Usuario";
import { CarrinhoProvider } from "pages/Common/Context/Carrinho";
import { PagamentoProvider } from "pages/Common/Context/Pagamento";

function Router (){   

    return (
        <BrowserRouter>
            <Switch>
                <UsuarioProvder>
                    <Route exact path="/" >
                        <Login/>
                    </Route>
                        <PagamentoProvider>
                         <CarrinhoProvider>
                        <Route path='/feira'>
                            <Feira />
                        </Route>
                            <Route path='/carrinho'>
                                <Carrinho />
                            </Route>
                        </CarrinhoProvider>
                        </PagamentoProvider>
                </UsuarioProvder>
                
            </Switch>
        </BrowserRouter>
    )
}
export default Router;