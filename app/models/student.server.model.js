const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

var StudentSchema = new Schema({
    firstName: String,
	lastName: String,
	email: {
		type: String,
		match: [/.+\@.+\..+/, "Please fill a valid student email address"]
	},
	studentNumber: {
		type: Number,
		unique: true,
		required: 'Student Number is required'
	},
	password: {
		type: String,
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
	},
    address: String,
    city: String,
    phoneNumber:String,
    program: String
});


StudentSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});


StudentSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

StudentSchema.methods.authenticate = function(password) {
	return this.password === bcrypt.hashSync(password, saltRounds);
};

StudentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

module.exports = mongoose.model('Student', StudentSchema);