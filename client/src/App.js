import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  //states do registro:
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  //states do login:
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //states do Status de login a ser lançado na tela:
  const [loginStatus, setLoginStatus] = useState('');


  const register = () => {
    Axios.post("http://localhost:3001/register",
      { username: usernameReg, password: passwordReg 
      }).then((response) => {
        console.log(response)
      })   
    }

  const login = () => {
    Axios.post("http://localhost:3001/login",
      { username: username, password: password 
      }).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message)    
        } else {
          setLoginStatus(response.data[0].username)
        }       
      })   
    }
  return (
    <div className="App">
      <div className="registration">

        <h1>Registration</h1>
        <div className="container">
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => { setUsernameReg(e.target.value); }} />
          <label>Password</label>
          <input
            type="text"
            onChange={(e) => { setPasswordReg(e.target.value); }} />
        </div>       
        <button onClick={ register }>Register</button>
      </div>
      <div className="login">

        
        <h1>Login</h1>
        <div className="container2">
          <input
            type="text"
            placeholder='username'
            onChange={(e) => { setUsername(e.target.value); }}
          />
          <input
            type="password"
            placeholder='password'
            onChange={(e) => { setPassword(e.target.value); }}
          />
        </div>           
        <button
          onClick={login}
        >Login</button>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
}

export default App;
