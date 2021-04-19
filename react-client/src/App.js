import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';

import List from './components/List';
import ListCourses from './components/ListCourses'
import StudentCourses from './components/StudentCourses';
import EditCourse from './components/EditCourse';

import RegisterStudent from './components/RegisterStudent';
import ShowStudent from './components/ShowStudent';
import StudentsInCourse from './components/StudentsInCourse';
import ShowCourse from './components/ShowCourse';

import Login from './components/Login';
import Header from './components/header';
import Home from './components/home';

function App() {

  return (
        <div className="body">
          <Header/>
          <Router >                
                <div  className="allPage" >
                    <Home />
                    <Route render ={()=> < Login /> } exact path="/" />
                    <Route render ={()=> < List />} path="/list" />
                    <Route render ={()=> < ListCourses /> } path="/listcourses" />
                    <Route render ={()=> < StudentCourses /> } path="/studentcourses/:studentNumber" />
                    <Route render ={()=> < RegisterStudent />} path="/studentSignUp" />
                    <Route render ={()=> < StudentsInCourse />} path="/showstudentsInCourse/:courseName" />
                    <Route render ={()=> < ShowStudent />} path="/show/:id" />
                    <Route render ={()=> < ShowCourse />} path="/showcourse/:id" />
                    <Route render ={()=> < EditCourse />} path="/editcourse/:id" /> 
                </div>
          </Router>          
        </div>
  );
}

export default App;
