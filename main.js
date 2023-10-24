// getData here is a callback function which helps everything work.
const getData = cb => {
    /* XMLHttpRequest is an inbuilt JS object that allows us
   to consume APIs. This lets us open connections, send 
   connections, and close them */
    var xhr = new XMLHttpRequest();
    /* XML stands for Extensible Markup Language, a precursor to JSON. */
    var data;

    /* .open() takes 2 arguments - the HTTP method (GET here) and the URL that that 
        method is being applied to. */
    xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");
    xhr.send();

    /* The bulk of this code. readyState = 4 means the operation is complete; the
       .status is a HTTP status code, and code 200 is 'OK'. */
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
            /* This responseText is not actually JSON - it's a string formulated to 
               look like JSON. To convert it to JSON, we use the JSON.parse()
               method. */
        } /* Problem - the responseText isn't accessible outside the function. 
            Even 
         using another function doesn't solve this; it just moves the data
         to that function. To fix this, we use timeouts and callbacks.*/
    };
};

getData(function (data) {
    console.log(data);
});

// setTimeout(function () {
//     console.log(data);
// }, 500);
/* setTimeout takes 2 parameters: a callback function, and a parameter in ms.
   We've used a timeout of 500 ms here.
   Problem with timeouts: we'd have to tell our system to wait every time we 
   wanted something to happen. And it could take different amounts of time 
   depending on different circumstances, such as network speed.
   Solution: use our own callback functions! */

/* Other HTTP codes:
   - 301: Moved Permanently
   - 401: Unauthorised
   - 403: Forbidden
   - 404: Not Found
   - 500: Internal Server Error */