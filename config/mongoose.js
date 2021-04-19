var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    const db = mongoose.connect(config.db, {
        useUnifiedTopology: true,
        useNewUrlParser: true, useCreateIndex: true
    }).then(() => console.log('Student-Course-DB Connected!'))
        .catch(err => {
            console.log('Error');
        });

    require('../app/models/student.server.model');

    require('../app/models/course.server.model');

    return db;
};