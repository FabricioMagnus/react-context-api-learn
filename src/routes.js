import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UsuarioProvder } from "pages/Common/Context/index";

function Router (){   

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" >
                    <UsuarioProvder>
                    <Login/>
                    </UsuarioProvder>
                </Route>
                <Route path='/feira'>
                    <Feira />
                </Route>
                <Route path='/carrinho' component={Carrinho}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Router;