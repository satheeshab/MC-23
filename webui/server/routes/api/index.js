const express = require('express');
const { getAdmissionDetails } = require('./admission');
const { getCourseDetails, createCourse, deleteCourse } = require('./course');

const apiRouter = express.Router();

// admission related routes
apiRouter.get('/admission/:courseName?', getAdmissionDetails);

// course related routes
apiRouter.get('/course/:courseName?', getCourseDetails);
apiRouter.post('/course', createCourse);
apiRouter.delete('/course/:courseName?', deleteCourse);

apiRouter.get('/home', (req, res) => {
    res.send('Hello, from express backend! Testing dynamic rendering');
});

module.exports = { apiRouter };
