import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import configureStore from './store';

import 'bootstrap/dist/css/bootstrap.css';

import './index.css';

import App from './App';

import {shuffleCards} from './actions/deck';

const store = configureStore();

store.dispatch(shuffleCards());

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));

reportWebVitals();