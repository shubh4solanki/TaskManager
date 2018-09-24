import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './config/store';
import Header from './components/header';
import Routes from './config/routes';

import './App.css';

class App extends Component {
    Layout = () => {
        return(
            <div>
                <Header />
                <Routes />
            </div>
        );
    };

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path='' component={this.Layout} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
