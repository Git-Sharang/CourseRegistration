import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import Footer from './footer';

function EditCourse(props) {
  console.log('edit student props:',props.match.params)
  const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section: '', semester:''});  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;
  
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourse(result.data);
      console.log(result.data);
      setShowLoading(false);
    };
    fetchData();
  }, []);

  const updateCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { courseCode: course.courseCode, courseName: course.courseName, section: course.section,
      semester: course.semester };
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update',result.data )
        setShowLoading(false);
        props.history.push('/showcourse/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  

  const onChange = (e) => {
    e.persist();
    setCourse({...course, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
            <Form onSubmit={updateCourse}>
              <Form.Group>
                <Form.Label> Course Code</Form.Label>
                <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Enter the course code" value={course.courseCode} onChange={onChange} readOnly/>
              </Form.Group>
              <Form.Group>
                <Form.Label> Course Name</Form.Label>
                <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter the course name" value={course.courseName} onChange={onChange} readOnly/>
              </Form.Group>
              <Form.Group>
                <Form.Label> Section</Form.Label>
                <Form.Control type="number" name="section" id="section" placeholder="Enter the section number" value={course.section} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Semester</Form.Label>
                <Form.Control type="number" name="semester" id="semester" placeholder="Enter the semester number" value={course.semester} onChange={onChange} readOnly/>
              </Form.Group>              
              <Button variant="primary" type="submit">
                Update Course Section
              </Button>
            </Form>
        </Jumbotron>
        <Footer />
    </div>
  );
}

export default withRouter(EditCourse);
