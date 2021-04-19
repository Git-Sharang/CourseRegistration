import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Footer from './footer';

function StudentCourses(props) {
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3000/api/coursesOfStudent/" + props.match.params.studentNumber;

    useEffect(() => {
        const fetchData = async () => {
            axios.get(apiUrl)
                .then(result => {
                    console.log('result.data:', result.data);
                    if (result.data.screen !== 'auth') {
                        console.log('data in if:', result.data);
                        setData(result.data);
                        setShowLoading(false);
                    }
                }).catch((error) => {
                    console.log('error in fetchData:', error);
                });
        };
        fetchData();
    }, []);

    const showDetail = (id) => {
        props.history.push({
            pathname: '/showcourse/' + id
        });
    }

    return (
        <div >
            { data.length !== 0
                ? <div>
                    {showLoading && <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>}
                    <h1>Your Courses</h1>
                    <ListGroup>
                        {data.map((item, idx) => (
                            <ListGroup.Item className="courseList" key={idx} action onClick={() => { showDetail(item._id) }}>{item.courseCode}: {item.courseName} - Section ({item.section})</ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
                : <p>There are no Courses, Yet!</p>
            }
            <Footer/>
        </div>
    );
}

export default withRouter(StudentCourses);
