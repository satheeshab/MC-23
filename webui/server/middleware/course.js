const { callApi } = require('../helpers/callApi');
const { EXTERNAL_API_BASEURL } = require('../../config/constants');
const { checkResponseStatus } = require('../helpers/helpers');

const getCourseDetails = async (req, res, next) => {

    // *** START: mock values for testing (remove later)
    var response = {
        status: 'open',
        courseId: req.params.courseId,
        year: 2023,
        grade: 'PG'
    }
    return res.status(200).json(response);
    // *** END: mock values for testing (remove later)

    const status = await callApi(EXTERNAL_API_BASEURL, `/course/${req.params.courseId}`)
        .then(checkResponseStatus)
        .then((response) => response.json());

    return status.value;
};

const createCourse = async (req, res, next) => {

    const courseData = { ...req.body };
    let status;

    try {
        status = await callApi(EXTERNAL_API_BASEURL, 
            '/course',
            'POST',
            JSON.stringify(courseData)
            )
            .then(checkResponseStatus)
            .then((response) => ({
                statusText: response.statusText
            }));
    } catch (error) {
        return next(error);
    }

    return res.status(200).json(status);
};

const deleteCourse = async (req, res, next) => {

    const courseData = { ...req.body };
    let status;

    try {
        status = await callApi(EXTERNAL_API_BASEURL, 
            '/course',
            'DELETE',
            JSON.stringify(courseData)
            )
            .then(checkResponseStatus)
            .then((response) => ({
                statusText: response.statusText
            }));
    } catch (error) {
        return next(error);
    }

    return res.status(200).json(status);
};

module.exports = { getCourseDetails, createCourse, deleteCourse };


