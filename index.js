const axios = require("axios");

let API_KEY = "";
let SHEET_ID = "";

/**
 * Queries the Google Sheets API to obtain data from the sheet with the ID specified
 * @param {string} sheetId: Unique ID for the Google Sheet from which the user wants to load data
 * @param {string} apiKey: Google Sheets API key obtained from the Google Developer Console
 */
async function load (sheetId, apiKey)  {
    API_KEY = apiKey;
    SHEET_ID = sheetId;  
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?majorDimension=ROWS&key=${API_KEY}`;
        const response = await axios.get(url)
        SHEET.data = sanitize(response.data.values);
        return SHEET;
    }
    catch(error) {
        console.log(error)
    }
}

/**
 * Convert simple row format into JSON with key and value formatting
 * @param {string[]} data: Data obtained from the API response
 */
let sanitize = (data) => {
    var sanitizedData = [];
    var header = data[0];
    for (var i = 1; i < data.length; i++) {
        var jsonRow = {};
        for (var field in header) {
            jsonRow[header[field].toString()] = data[i][field];
        }
        sanitizedData.push(jsonRow);
    }
    return sanitizedData;
}

/**
 * Returns rows that match the parameters specified in the query
 * @param {Object} query: Contains field-value pairs for performing search
 */
let find = (query) => {

    var filteredData = SHEET.data;

    /* For empty queries the find function returns all rows in the sheet */
    if (query == {})
        return filteredData;
    
    else {
        for (var field in query) {
            /* console.log("Looking for " + field + ": " + query[field]); */
            filteredData = SHEET.data.filter((row) => {
                    return row[field] == query[field];
            })
        }
        /* console.log("Found " + filteredData.length + " record(s)"); */
        return filteredData;
    }
    
}

const SHEET = {
    "data": [],
    "find": find
};

module.exports = {
    load
}