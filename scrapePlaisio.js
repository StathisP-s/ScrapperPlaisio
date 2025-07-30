const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const inputdata = fs.readFileSync("inputURLS.txt" , { encoding: 'utf8', flag: 'r' });
    const urls = inputdata.split('\n');
    // console.log(explodedInputData)


    // process.exit(

    // )
    // const urls = [
    //     'https://www.plaisio.gr/xartopoleio/promitheies-grafeiou/post-it-xartakia/work-autokollita-xartakia-neon-75x75mm-400filla_2049392',
    //     'https://www.plaisio.gr/klima-spitiou/klimatismos/epaggelmatika-klimatistika/inventor-multi-split-klimatistiko-18-000-btu-h-u6rsl-2-18-ar5vi-09wifi_4598970',
    //     'https://www.plaisio.gr/klima-spitiou/klimatismos/epaggelmatika-klimatistika/inventor-v7ki-18wifir-klimatistiko-18-000-btu-h_4800761',
    // ];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const scrapedData = [];

    for (let index = 0; index < urls.length; index++) {
        const url = urls[index];
        await page.goto(url, { waitUntil: 'networkidle2' });

        await page.waitForSelector('h1.product-title');             // Τίτλος
        await page.waitForSelector('.pdp-price-container .price span');  // Τιμή
        await page.waitForSelector('div.pdp-stock');                 // Περιμένουμε το container της διαθεσιμότητας
        await page.waitForSelector('.pdp-breadcrumbs span[itemprop="name"]'); // Κατηγορία breadcrumbs

        const data = await page.evaluate(() => {
            const result = {};

            // Τίτλος
            const titleEl = document.querySelector('h1.product-title');
            result['Τίτλος'] = titleEl ? titleEl.textContent.trim() : '';

            // Τιμή
            const priceEl = document.querySelector('.pdp-price-container .price span');
            result['Τιμή'] = priceEl ? priceEl.textContent.trim().replace(/\s+/g, ' ') : '';

            // Διαθεσιμότητα - παίρνουμε το πρώτο παιδί του div.pdp-stock που έχει κείμενο
            const stockEl = Array.from(document.querySelectorAll('div.pdp-stock .pdp-stock__line'))[1]
            let availability = '';
            if (stockEl) {
                availability = stockEl.textContent
            }
            result['Διαθεσιμότητα'] = availability;

            // Κατηγορία (breadcrumbs)
            const breadcrumbEls = Array.from(document.querySelectorAll('.pdp-breadcrumbs span[itemprop="name"]'));
            if (breadcrumbEls.length > 1) {
                result['Κατηγορία'] = breadcrumbEls[breadcrumbEls.length - 2].textContent.trim();
            } else {
                result['Κατηγορία'] = '';
            }

            // Brand (πρώτη λέξη τίτλου)
            if (result['Τίτλος']) {
                result['Brand'] = result['Τίτλος'].split(' ')[0];
            } else {
                result['Brand'] = '';
            }
            return result;
        });
        scrapedData.push(data);
        // console.log('Scraped data:', data);

        // console.log('Τα δεδομένα αποθηκεύτηκαν στο productData.json');        
    }
    console.log(scrapedData);
    fs.writeFileSync('productData.json', JSON.stringify(scrapedData), 'utf-8');
    // const url = 'https://www.plaisio.gr/xartopoleio/promitheies-grafeiou/post-it-xartakia/work-autokollita-xartakia-neon-75x75mm-400filla_2049392';


    await browser.close();
})();

