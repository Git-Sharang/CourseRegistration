const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const CourseSchema = new Schema({
    added:{
        type: Date,
        default: Date.now
    },
    courseCode: {
        type: String,
        trim: true,
        required: 'Course Code is mandatory'
    },
    courseName: {
        type: String, 
        default: '',
        trim: true
    },
    section: {
        type: Number
    },
    semester: {
        type: Number
    },
    student: {
        type: Schema.ObjectId,
        ref: 'Student'
    }
});

module.exports = mongoose.model('Course', CourseSchema);
