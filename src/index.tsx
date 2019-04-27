import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-open-sans';
import './index.scss';
import { AppConnected } from './components';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppConnected />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
