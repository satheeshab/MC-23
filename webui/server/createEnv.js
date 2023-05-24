const dotenv = require('dotenv');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

const defaultEnvValues = {
    MICROFRONTEND_APP1_URL: 'notProvided',
    MICROFRONTEND_APP2_URL: 'notProvided'
};

const environmentTemplate = fs.readFileSync(
    path.join(__dirname, '../client/public/env.ejs'),
    {encoding: 'utf-8'}
);

const environmentOutput = ejs.render( environmentTemplate, {
    ...defaultEnvValues
});

fs.writeFileSync(path.join(__dirname, '../client/dist/env.js'), environmentOutput);

