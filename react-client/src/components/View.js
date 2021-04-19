import AddCourse from './AddCourse';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function View(props) {
  const { screen, setScreen } = props;
  const [course, setCourse] = useState('');
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };

  const listOfMyCourses = (studentNumber) => {
    console.log('in listCourses: ', studentNumber)
    props.history.push({
      pathname: '/studentcourses/' + studentNumber
    });
  }
  
  const addCourse = () => {
    console.log('in addcourse');
    setCourse('y');
  }

  return (
    <div className="App">
      {course !== 'y' ? (
        <div>
          <h1>Student #: {screen}</h1>
          <button onClick={addCourse}>Add a Course</button>&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={() => { listOfMyCourses(screen) }}>Your Courses</button>&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={deleteCookie}>Log out</button>
        </div>
      ) : (
        <AddCourse screen={screen} setScreen={setScreen} />
      )
      }
    </div>
  );
}

//
export default withRouter(View);