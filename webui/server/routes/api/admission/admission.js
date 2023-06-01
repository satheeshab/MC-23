import { callApi } from "../../../helpers/callApi"
import {EXTERNAL_API_BASEURL} from '../../config/constants';


export const getAdmissionStatus = async (programmeName) => {

    const status = await callApi(EXTERNAL_API_BASEURL, `/admission/${programmeName}`)
        .then(checkResponseStatus)
        .then((response) => response.json());

    return status.value;
};

