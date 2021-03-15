import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
// import { BrowserRouter, Route } from 'react-router-dom';

import "./App.css";
import LogIn from "./routes/LogIn";
import SignUpStudent from "./routes/SignUpStudent";

function App() {
    return (
        <Provider store={store}>
            {/* <LogIn /> */}
            <SignUpStudent />
        </Provider>
    );
}

export default App;
