var express = require('express');
var router = express.Router();

const { getAdmissionDetails } = require('../middleware/admission');
const { getCourseDetails, createCourse, deleteCourse } = require('../middleware/course');
 
// admission related routes
router.get('/admission/:courseId?', getAdmissionDetails);

// course related routes
router.get('/course/:courseId?', getCourseDetails);
router.post('/course', createCourse);
router.delete('/course/:courseId?', deleteCourse);

module.exports = router;
