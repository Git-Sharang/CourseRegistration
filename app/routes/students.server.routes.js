var student_controller = require('../../app/controllers/students.server.controller');

module.exports = function (app) {
    
    app.route('/')
        .get(student_controller.renderIndex)
        .post(student_controller.create);
    
    app.get("/students", student_controller.list);

    //For Getting a specific student
    app.route('/students/:studentId')
        .get(student_controller.read)
    app.param('studentId', student_controller.studentByID);
    
    //authenticate user
    app.post('/signin', student_controller.authenticate);
    app.get('/signout', student_controller.signout);
    app.get('/read_cookie', student_controller.isSignedIn);

    //path to a protected page
    app.get('/welcome', student_controller.welcome);
};

