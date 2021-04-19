const Student = require('mongoose').model('Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;


const getErrorMessage = function(err) {
	var message = '';
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Student Number already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}
	return message;
};

exports.renderIndex = function(req, res, next){
	res.status(200).json("The Api has been connected Succesfully");
}


// Create a new student
exports.create = function (req, res, next) {
    var student = new Student(req.body); 
    console.log("body: " + req.body.studentNumber);

    student.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(student);
        }
    });
};

// Returns all students
exports.list = function (req, res, next) {
    Student.find({}, function (err, students) {
        if (err) {
            return next(err);
        } else {
            res.json(students);
        }
    });
};

//'read' controller method to display a student
exports.read = function(req, res) {
	res.json(req.student);
};

// 'studentByID' controller method to find a student by its id
exports.studentByID = function (req, res, next, id) {
	Student.findOne({
        _id: id
	}, (err, student) => {
		if (err) {
			return next(err);
		} else {
            req.student = student;
            console.log(student);
			next();
		}
	});
};

// 'studentByStudentNumber' controller method to find a student by its id
exports.studentByStudentNumber = function (req, res, next, studentNumber) {
	Student.findOne({
        studentNumber: studentNumber
	}, (err, student) => {
		if (err) {
			return next(err);
		} else {
            req.student = student;
            console.log(student);
			next();
		}
	});
};

// authenticates a student
exports.authenticate = function(req, res, next) {
	console.log(req.body);
	const studentNumber = req.body.auth.studentNumber;
	const password  = req.body.auth.password;
	console.log(password);
	console.log(studentNumber);
	Student.findOne({studentNumber: studentNumber}, (err, student) => {
			if (err) {
				return next(err);
			} else {
			console.log(student)

			if(bcrypt.compareSync(password, student.password)) {

                const token = jwt.sign({ id: student._id, studentNumber: student.studentNumber }, jwtKey, 
					{algorithm: 'HS256', expiresIn: jwtExpirySeconds });
				console.log('token:', token)

                res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
				res.status(200).send({ screen: student.studentNumber });
                
                req.student = student;
				next()
			} else {
				res.json({status:"error", message: "Invalid student number or password",
				data:null});
			}	
		}		
	});
};

// protected page uses the JWT token
exports.welcome = (req, res) => {
	const token = req.cookies.token
	console.log(token)
	if (!token) {
	  return res.status(401).end()
	}
  
	var payload;
	try {
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		return res.status(401).end()
	  }
	  return res.status(400).end()
	}
	res.send(`${payload.studentNumber}`)
};
 
//sign out function in controller
exports.signout = (req, res) => {
	res.clearCookie("token")
	return res.status('200').json({message: "signed out"})
	// Redirect the student back to the main application page
	//res.redirect('/');
}

//check if the student is signed in
exports.isSignedIn = (req, res) => {
	const token = req.cookies.token
	console.log(token)

	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		return res.status(401).end()
	  }
	  return res.status(400).end()
	}
	res.status(200).send({ screen: payload.studentNumber });
}


exports.isAuthenticated = function (req, res, next) {
	const token = req.cookies.token;
	console.log(token);
	
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  
	  payload = jwt.verify(token, jwtKey)
	  console.log('in requires Login - payload:',payload)
	  req.id = payload.id;
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		return res.status(401).end()
	  }
	  return res.status(400).end()
	}
    next();
};