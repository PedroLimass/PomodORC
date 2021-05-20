import React from 'react';
import './App.css';
// import Task from './Componentes/tasks'
import Routes from './Routes/routes'
import { BrowserRouter } from 'react-router-dom'




function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes />
            </BrowserRouter>

        </div>
    );
}

export default App;
