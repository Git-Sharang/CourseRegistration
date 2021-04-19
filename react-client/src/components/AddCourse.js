import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

function AddCourse(props) {
  const studentNumber = props.screen;
  console.log('props.screen', props.screen)
  const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section: '', semester: '' });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/api/courses";

  const saveCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      courseCode: course.courseCode, courseName: course.courseName, section: course.section,
      semester: course.semester, studentNumber: studentNumber
    };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        console.log('results from save course:', result.data)
        props.history.push('/showcourse/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <h2>Add a course</h2>
      {showLoading &&
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      <Jumbotron>
        <Form onSubmit={saveCourse}>
          <Form.Group>
            <Form.Label> Course Code</Form.Label>
            <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Enter the course code eg. COMP303" value={course.courseCode} onChange={onChange} required/>
          </Form.Group>
          <Form.Group>
            <Form.Label> Course Name</Form.Label>
            <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter the course name eg. Emerging Technology" value={course.courseName} onChange={onChange} required/>
          </Form.Group>
          <Form.Group>
            <Form.Label> Section</Form.Label>
            <Form.Control type="number" name="section" id="section" placeholder="Enter the section number eg. 1" min='1' max='9' value={course.section} onChange={onChange} required/>
          </Form.Group>
          <Form.Group>
            <Form.Label> Semester</Form.Label>
            <Form.Control type="number" name="semester" id="semester" placeholder="Enter the semester number eg. 4" min='1' max='9' value={course.semester} onChange={onChange} required/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(AddCourse);
