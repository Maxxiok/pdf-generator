const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const hbs = require('hbs');

const createPDF = async (data) => {
    let templateHtml = fs.readFileSync(path.join(__dirname, '../templates/views/pdf.hbs'), 'utf8');
    let template = hbs.compile(templateHtml);
    let html = template(data);

    let milis = new Date();
    milis = milis.getTime();

    let options = {
        width: '1230px',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "10px",
            bottom: "30px"
        },
        printBackground: true,
        format: 'A4'
    }

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });

    let page = await browser.newPage();

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
        waitUntil: 'networkidle0'
    });

    const pdf = await page.pdf(options);
    await browser.close();

    return pdf;
}

module.exports = createPDF;


