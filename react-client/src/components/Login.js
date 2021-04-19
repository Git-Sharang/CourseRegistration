import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Footer from './footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import View from './View';
import RegisterStudent from './RegisterStudent';


function App() {
  
  const [screen, setScreen] = useState('auth');
  
  const [studentNumber, setStudentNumber] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/signin";
  
  //For authentication
  const auth = async () => {
    console.log('calling auth');
    console.log(studentNumber);
    try {
      const loginData = { auth: { studentNumber, password } }
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth);
      console.log(res.data.screen);
      
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) { 
      console.log(e);
    }
  };
  
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');
      const res = await axios.get('/read_cookie');
      
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };

  useEffect(() => {
    readCookie();
  }, []); //only the first render
  
  return (
    <router>
      <div >
        {screen === 'auth' 
          ? <div className="login">
            <p>Please enter your login details:</p><br/>
            <label>Student Number: </label>&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="number" placeholder="eg. 3009800801" onChange={e => setStudentNumber(e.target.value)} required/>
            <br/>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password: </label>&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="password" onChange={e => setPassword(e.target.value)} required/>
            <br/><br />
            <a href="/studentSignUp" > No Account? Please Register Here</a><br/><br />
            <button onClick={auth}>Login</button>
          </div>
          : <View screen={screen} setScreen={setScreen} />
        }
      <Footer/>
      <Route render ={()=> < RegisterStudent />} path="/studentSignUp" />
      </div>
    </router>
  );
}

export default App;

