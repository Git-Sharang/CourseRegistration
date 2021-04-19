import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { withRouter } from 'react-router-dom';
import Footer from './footer';

function StudentsInCourse(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/studentsInCourses/" + props.match.params.courseName;

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:',result.data)
          console.log('data in if:', result.data )
          setData(result.data);
          setShowLoading(false);
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
      };  
    fetchData();
  }, []);


  return (
    <div>
      <h1>List of Students in {props.match.params.courseName}</h1>
      {
        data.length !== 0
          ? <div>
            {showLoading && <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>}
            <ListGroup>
              {data.map((item, idx) => (
                <ListGroup.Item key={idx}><b>{item.student.fullName}</b><br />{item.student.email}<br />{item.student.program}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          : <p>There are no Students in this course, Yet!</p>
      }
    <Footer/>
    </div>
  );
}

export default withRouter(StudentsInCourse);
