import Potatoes from './img/potatoes.jpg';

import React from "react";
import ReactDOM from "react-dom";
import {css} from "@emotion/react";

const styles = css`
    color: black;
    font-size: 10px;
`;

const App = () => (
    <h1 css={styles}>Sample App!!<img src={Potatoes}/></h1>
);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('app')
);
