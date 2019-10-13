import React, { Component } from 'react';
import './App.css';


import Form from "./components/Form";


class App extends Component {
    
    render() {
        return ( <>
             <h1 className = "App1" >
            Loan interest calculator </h1> 
            
            <Form/>
        
           
              </>
        );
    }
}

export default App