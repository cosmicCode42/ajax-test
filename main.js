// getData here is a callback function which helps everything work.
const getData = (url, cb) => {
    /* XMLHttpRequest is an inbuilt JS object that allows us
   to consume APIs. This lets us open connections, send 
   connections, and close them */
    var xhr = new XMLHttpRequest();
    /* XML stands for Extensible Markup Language, a precursor to JSON. */

    /* .open() takes 2 arguments - the HTTP method (GET here) and the URL that 
       the method is being applied to. */
    xhr.open("GET", url);
    xhr.send();

    /* The bulk of this code. readyState = 4 means the operation is complete; the
       .status is a HTTP status code, and code 200 is 'OK'. */
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
            /* This responseText is not actually JSON; it's a string formulated
               to look like JSON. To convert it to JSON, we use the JSON.parse()
               method. */
        } /* Problem - the responseText isn't accessible outside the function. 
            Even using another function doesn't solve this; it just moves the data
            to that function. To fix this, we use timeouts and callbacks.*/
    };
};

// Following is code that gets our retrieved data displayed in table format.

// this makes table headers for use in a table to be put on the page
const getTableHeaders = obj => {
    var tableHeaders = [];

    Object.keys(obj).forEach(function (key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
};

// function to make pagination work
const generatePaginationButtons = (next, prev) => {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
};

// the main meat of the table creation code.
const writeToDocument = url => {
    var tableRows = []; // this stores all our table's rows
    var el = document.getElementById("data");

    getData(url, function (data) {

        // Pagination
        var pagination = "";
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        };

        data = data.results; //gets us what we actually want
        var tableHeaders = getTableHeaders(data[0]); //gets our table headers

        data.forEach(function (item) {
            var dataRow = []; // stores each row

            Object.keys(item).forEach(function (key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            }); //this makes a row of items
            tableRows.push(`<tr>${dataRow}</tr>`); // this adds each row to our table's rows
        });

        // prints out a table with our headers and all our rows
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;
    });
};

/* Other HTTP codes:
   - 301: Moved Permanently
   - 401: Unauthorised
   - 403: Forbidden
   - 404: Not Found
   - 500: Internal Server Error */

/* Using getData we can grab data - the responseText - outside the function
   that we've used to get it. This bypasses the need for a timeout. */
// getData(function (data) {
//     console.log(data);
// });
/* Callbacks grant us more control over our code; they're only run when we want
   them to be - in this case, when the responseText we want has actually been
   gotten. */

// setTimeout(function () {
//     console.log(data);
// }, 500);
/* setTimeout takes 2 parameters: a callback function, and a parameter in ms.
   We've used a timeout of 500 ms here.
   Problem with timeouts: we'd have to tell our system to wait every time we
   wanted something to happen. And it could take different amounts of time
   depending on different circumstances, such as network speed.
   Solution: use our own callback functions! */

/* New console type! .dir stands for 'directory'. This lets us browse
   through the object and see its format; we use this to find what to
   set our data div's innerHTML to. */
// console.dir(data); not actually needed here;