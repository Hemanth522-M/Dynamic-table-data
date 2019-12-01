import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Route} from "react-router-dom";
import MultipleColumn from './components/columnsCreationmodule/multipleColumns';
import TableEntry from './components/tableEntrymodule/tableEntry';
import TableView from './components/tableView/tableView';

ReactDOM.render(
    <BrowserRouter>
        <Route path = "/" exact component={MultipleColumn} />
        <Route path="/entry-table" exact component={TableEntry} />
        <Route path = "/table-view" exact component={TableView} />
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
