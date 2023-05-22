import 'dotenv/config';
import path from 'path';
import ejs from 'ejs';
import fs from 'fs';

const defaultEnvValues = {
    MICROFRONTEND_APP1_URL: 'notProvided',
    MICROFRONTEND_APP2_URL: 'notProvided'
};

const environmentTemplate = fs.readFileSync(
    path,join(__dirname, '../client/dist/env.ejs'),
    {encoding: 'utf-8'}
);

const environmentOutput = ejs.render( environmentTemplate, {
    ...defaultEnvValues
});

fs.writeFileSync(path.join(__dirname, '../client/dist/env,js'), environmentOutput);