// server.js

const http = require('http'); //    I used the 'http' module 

//  Define where the server lives.
const hostname = '127.0.0.1'; 
const port = 3000; // I used port 3000 

// I used html inside only so this is the function
const generateHtml = (title, content) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e9ecef;
            color: #343a40;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: 80px auto;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #007bff;
            font-size: 2em;
            margin-bottom: 20px;
        }
        p {
            font-size: 1.1em;
            line-height: 1.5;
        }
        .nav a {
            margin: 0 10px;
            text-decoration: none;
            color: #dc3545;
            font-weight: bold;
            transition: color 0.2s;
        }
        .nav a:hover {
            color: #0056b3;
        }
        .error {
            color: #dc3545;
            font-size: 1.5em;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="nav">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </div>
        <h1>${title}</h1>
        <p>${content}</p>
    </div>
</body>
</html>
    `;
};


//  I created the server
const server = http.createServer((req, res) => {
    
    let pageTitle = 'Page Not Found';
    let pageContent = 'Sorry, the page you are looking for does not exist.';
    let statusCode = 404;



    if (req.url === '/') {
        pageTitle = 'Welcome to the Homepage!';
        pageContent = 'HI THERE USER';
        statusCode = 200; // This means everything is ok.

    // If one is asking for the about page 
    } else if (req.url === '/about') {
        pageTitle = 'About This Server ';
        pageContent = 'It is a basic server';
        statusCode = 200;

    // If one is asking for the contact page
    } else if (req.url === '/contact') {
        pageTitle = 'Contact Us ';
        pageContent = 'Feel free to reach me ';
        statusCode = 200;

    // If none of the above then a error 
    } else{
        statusCode = 404; // 404: Page Not Found 
    }

    // Send the final response
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'text/html'); // IMPORTANT: Now tell the browser to expect HTML!
    res.end(generateHtml(pageTitle, pageContent)); // Send the styled content

});
// Starts the server
server.listen(port, hostname, () => {
    // I displayed this message which means my server is running
    console.log(`Server running at http://${hostname}:${port}/`);
});