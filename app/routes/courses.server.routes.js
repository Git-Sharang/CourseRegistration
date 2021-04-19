const students_controller = require('../../app/controllers/students.server.controller');
const courses_controller = require('../../app/controllers/courses.server.controller');

module.exports = function (app) {
    
    //For getting all the courses
    app.route('/api/courses')
        .get(courses_controller.list)
        .post(students_controller.isAuthenticated, courses_controller.create);

    //Get the list of students in each course
    app.route('/api/studentsInCourses/:courseName')
        .get(courses_controller.read)
    app.param('courseName', courses_controller.studentInCourse);

    //Getting the specific courses of the student by StudentId
    app.route('/api/coursesOfStudent/:studentNumber')
        .get(students_controller.isAuthenticated, courses_controller.courseByStudentId);
    app.param('studentNumber', students_controller.studentByStudentNumber);


    //Getting the specfic course by CourseId
    app.route('/api/courses/:courseId')
        .get(courses_controller.read)
        .put(students_controller.isAuthenticated, courses_controller.hasAuthorization, courses_controller.update)
        .delete(students_controller.isAuthenticated, courses_controller.hasAuthorization, courses_controller.delete);
    app.param('courseId', courses_controller.courseByID);
};
