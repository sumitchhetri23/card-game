import React, {Component} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import Lobby from './components/Lobby';
import ContentNotFound from "./components/ContentNotFound";

class App extends Component {
    render() {
        return (
            <BrowserRouter>

                <div className="main-content">
                    <Switch>
                        <Route exact path="/play" component={Lobby}/>
                        <Route exact path="/" render={() => <Redirect to="/play"/>}/>
                        <Route component={ContentNotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;