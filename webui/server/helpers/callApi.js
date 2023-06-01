



export async function callApi(baseUrl, endpoint, accessToken, type = 'GET', body = null) {
    // step 1: validate the access token and refresh if not valid

    // step 2: call the external api

    const headers = {
        Authorization: `Bearer ${accessToken}`
    };

    switch (type) {
        case 'GET':
            return fetch(`${baseUrl}${endpoint}`, {headers});
        case 'POST': {
            if (body) {
                return fetch(`${baseUrl}${endpoint}`, {
                    method: 'POST',
                    body,
                    headers : {
                        ...headers,
                        'Content-Type': 'application/json'
                    }
                });
            }
            throw new Error('POST request requires body input');
        }
        case 'PUT': {
            if (body) {
                return fetch(`${baseUrl}${endpoint}`, {
                    method: 'PUT',
                    body,
                    headers
                });
            }
            throw new Error('PUT request requires body input');            
        }
        case 'DELETE': {
            if (body) {
                return fetch(`${baseUrl}${endpoint}`, {
                    method: 'DELETE',
                    body,
                    headers : {
                        ...headers,
                        'Content-Type': 'application/json'
                    }
                });
            }
            
            return fetch(`${baseUrl}${endpoint}`), {
                method: 'DELETE',
                headers                
            }
        }
        case 'PATCH': {
            return fetch(`${baseUrl}${endpoint}`, {
                method: 'PATCH',
                headers : {
                    ...headers,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            });
        }
        default:
            throw new Error(`Unsupported request type of '${type}'`);
    }
}