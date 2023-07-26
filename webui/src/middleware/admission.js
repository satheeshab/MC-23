const { callApi } = require ('../helpers/callApi');
const { EXTERNAL_API_BASEURL } = require ('../../config/constants');
const { checkResponseStatus } = require ('../helpers/helpers');


const getAdmissionDetails = async (req, res, next) => {

        // *** START: mock values for testing (remove later)
        var response = [
            {
                studentId: 1000,
                status: 'confirmed',
                courseId: req.params.courseId,
                studentName: 'batman',
                year: 2023,
                grade: 'PG'
            },
            {
                studentId: 1001,
                status: 'under-review',
                courseId: req.params.courseId,
                studentName: 'spiderman',
                year: 2023,
                grade: 'PG'
            }
        ];
        return res.status(200).json(response);
        // *** END: mock values for testing (remove later)

    const status = await callApi(EXTERNAL_API_BASEURL, `/admission/${courseId}`)
        .then(checkResponseStatus)
        .then((response) => response.json());

    return status.value;
};

module.exports = { getAdmissionDetails };




