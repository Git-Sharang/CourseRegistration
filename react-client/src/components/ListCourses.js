import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Footer from './footer';

function ListCourses(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses";

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

  const showStudents = (courseName) => {
    props.history.push({
      pathname: '/showstudentsInCourse/' + courseName
    });
  }

  return (
    <div>
      <h2>List of courses we offer</h2>
      { data.length !== 0
        ? <div >
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <ListGroup >
            {data.map((item, idx) => (
              <ListGroup.Item className="courseList" key={idx} action onClick={() => { showStudents(item) }}>{item}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        : <p>There are no Courses, Yet!</p>
      }
      <Footer />
    </div>

  );
}
//
export default withRouter(ListCourses);
