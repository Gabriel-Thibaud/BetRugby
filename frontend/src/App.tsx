import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  // useEffect(() => {
  // fetch("http://localhost:3001")
  //   .then((res) => res.text())
  //   .then((data) => console.log(data));
  // }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
       BetRugby Home Page ! 
        </p>
        <div>
          Bet with your friends on Rugby
        </div>
      </header>
    </div>
  );
}

export default App;
