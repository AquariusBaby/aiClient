import React from "react";
import {
    BrowserRouter as Router,
    // HashRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import Home from '../routes/Home'
import AiPlayerChat from '../routes/AiPlayerChat'
import VipCenter from '../routes/VipCenter'
import CreatePlayer from '../routes/CreatePlayer/main'
import Order from '../routes/Order'
// import PayPage from '../routes/PayPage'

import PrivateRoute from "./withRouter";

function RouterApp() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/home" exact component={Home}></Route>
                {/* <Route path="/chat/:roleId" exact component={AiPlayerChat}></Route> */}
                <PrivateRoute path="/chat/:roleId" exact component={AiPlayerChat}></PrivateRoute>
                <Route path="/vip-center" exact component={VipCenter}></Route>
                <Route path="/createRole/create" exact component={CreatePlayer}></Route>
                <Route path="/order/detail/:id" exact component={Order}></Route>
            </Switch>
        </Router>
    )
}

export default RouterApp;