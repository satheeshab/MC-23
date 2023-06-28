const { callApi } = require ('../../helpers/callApi');
const { EXTERNAL_API_BASEURL } = require ('../../../config/constants');
const { checkResponseStatus } = require ('../../helpers/helpers');


const getAdmissionDetails = async (courseName) => {

    const status = await callApi(EXTERNAL_API_BASEURL, `/admission/${courseName}`)
        .then(checkResponseStatus)
        .then((response) => response.json());

    return status.value;
};

module.exports = { getAdmissionDetails };




