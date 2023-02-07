import express from 'express';
import bodyParser from 'body-parser';
import jsend from 'jsend';
import * as fs from 'fs';
import api from './api';

const app = express();
const port = process.env.PORT || 4000;
console.log(process.env.DB_DRIVER)

app.use(jsend.middleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let raw = fs.readFileSync('package.json').toString('utf-8');
let data = JSON.parse(raw);
let appInfo = (({ name, version, description, author }) => ({ name, version, description, author }))(data);

app.get('/', (req, res) => { res.jsend.success(appInfo)});
app.use('/api', api);

app.listen(port, () => console.log('Login service is ready to ship!'));