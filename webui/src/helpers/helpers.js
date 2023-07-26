const Errors = require('http-errors');

module.exports = {
    checkResponseStatus: (res) => {
        if (res.ok) {
            return res;
        }

        return res.text().then((err) => Promise.reject(new Errors(res.status, err)));
    }
}