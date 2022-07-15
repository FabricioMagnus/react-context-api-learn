import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UsuarioProvder } from "pages/Common/Context/Usuario";
import { CarrinhoProvider } from "pages/Common/Context/Carrinho";

function Router (){   

    return (
        <BrowserRouter>
            <Switch>
                <UsuarioProvder>
                    <Route exact path="/" >
                        <Login/>
                    </Route>
                    <CarrinhoProvider>
                        <Route path='/feira'>
                            <Feira />
                        </Route>
                    </CarrinhoProvider>
                </UsuarioProvder>
                <Route path='/carrinho' component={Carrinho}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Router;