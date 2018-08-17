# Rabona
Database service using Google Sheets or GitHub APIs

## Contents
1.  Storage Engines
2.  Installation
3.  Usage
4.  Use Cases

## Storage Engines
 - ### Google Sheets
    Rabona can be used load spreadsheets using the Google Sheets V4 API in a JSON format and queried just like a database
 - ### GitHub API (Future)

## Installation
``` 
npm install rabona --save
```

## Usage
``` js
var rabona = require("rabona");
const API_KEY = '<GOOGLE_SHEETS_API_KEY>';
const SHEET_ID = '<GOOGLE_SHEET_ID>';

operations();

async function operations() {  
    var sheet = await rabona.load(SHEET_ID, API_KEY);

    /* Example for a simple lookup */
    var rows = sheet.find({ "FIELD_NAME": "VALUE" });

}

```

## Use Cases
- Store and retrieve database records from a static website (For eg. hosted on gh-pages)
- Build custom forms and store data into Google Sheets
- Look for records in existing Google Sheets

