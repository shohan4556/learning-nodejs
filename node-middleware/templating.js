const express = require('express')
const app = express();
const port = 8080 | process.env.port;

//use templating engine
app.set('view engine', 'pug');
app.set('view engine')

app.listen(port, () => {
    console.log(`server started at : http://127.0.0.1:${port}`);
})