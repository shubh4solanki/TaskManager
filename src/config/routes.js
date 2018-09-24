import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'

import Main from '../containers/main';

class Routes extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Main} />
                </Switch>
            </div>
        );
    }
}

export default Routes;
