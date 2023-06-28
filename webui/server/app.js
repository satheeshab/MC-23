/*
import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

module.exports = new Promise((resolve) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    if (app.settings.env === 'production') {
        app.use((req, res, next) => {
            if (req.secure) {
                next();
            } else {
                res.redirect(`https://${req.header.host}${req.url}`);
            }
        });
    }

    app.use('/', express.static(path.join(__dirname, '../client/dist')));
    app.use(routes);

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });

    resolve(app);

});
*/
