import React, {Component} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import Game from './components/Game';
import ContentNotFound from "./components/ContentNotFound";

class App extends Component {
    render() {
        return (
            <BrowserRouter>

                <div className="main-content">
                    <Switch>
                        <Route exact path="/play" component={Game}/>
                        <Route exact path="/" render={() => <Redirect to="/play"/>}/>
                        <Route component={ContentNotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;