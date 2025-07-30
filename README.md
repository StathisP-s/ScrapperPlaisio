# 🛒 Plaisio Product Scraper (with Puppeteer)

A Node.js + Puppeteer project that scrapes product information from [Plaisio.gr](https://www.plaisio.gr/), using a list of product URLs provided in a `.txt` file. It extracts product metadata such as title, price, availability, category, and brand.

---

## 📁 Project Structure

Here's what's included in the repository:

### 1️⃣ `scrapePlaisio.js`

Main scraping script using Puppeteer:
- Reads URLs from `inputURLS.txt`
- Navigates to each product page
- Scrapes key product data using CSS selectors
- Writes the output to `productData.json`

### 2️⃣ `inputURLS.txt`

Plain text file with one product URL per line. Example:

https://www.plaisio.gr/xartopoleio/promitheies-grafeiou/post-it-xartakia/work-autokollita-xartakia-neon-75x75mm-400filla_2049392

https://www.plaisio.gr/klima-spitiou/klimatismos/epaggelmatika-klimatistika/inventor-multi-split-klimatistiko-18-000-btu-h-u6rsl-2-18-ar5vi-09wifi_4598970

### 3️⃣ `productData.json`

The final scraped data output — an array of objects like:

```json
[
  {
    "Τίτλος": "@Work Αυτοκόλλητα Χαρτάκια Neon 75x75mm 400φύλλα",
    "Τιμή": "2,19 €",
    "Διαθεσιμότητα": "Διαθέσιμο σε καταστήματα",
    "Κατηγορία": "Post It - Χαρτάκια",
    "Brand": "@Work"
  },
  ...
]
```

## 📦 Data Fields Extracted
Each product includes the following fields:

Τίτλος (Title)

Τιμή (Price)

Διαθεσιμότητα (Availability)

Κατηγορία (Category) – from breadcrumbs

Brand – parsed as the first word of the title

## 🚀 How to Run

1️⃣ Install Dependencies

Αντιγραφή
Επεξεργασία
npm install puppeteer
2️⃣ Make sure inputURLS.txt exists

Add one product URL per line.

3️⃣ Run the scraper

Αντιγραφή
Επεξεργασία
node scrapePlaisio.js
4️⃣ Output

Results are saved in productData.json.