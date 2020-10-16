const express = require('express');
const path = require('path');
const hbs = require('hbs');
const createPdf = require('./pdfOperator');
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'../public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, "../templates/views"));

hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get('', (req, resp)=>{
    resp.render('index', {
        title: 'PDF Generator',
    });
});

app.post('/generate', async (req, resp)=>{
    const pdf = await createPdf({content1: req.body.text});
    resp.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });
    return resp.send(pdf);
});

app.listen(port, ()=>{
    console.log('Started on port '+port);
});
