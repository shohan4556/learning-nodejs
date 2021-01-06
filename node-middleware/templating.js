const express = require('express')
const app = express();
const port = 8080 | process.env.port;

//set view engine 
app.set('view engine', 'pug');

app.set('views', './views'); //default 

app.get('/', (req, res, next)=>{
    res.render('index', {title: 'my express app', message:'hello world'})
    //res.send('hello')
})

app.listen(port, () => {
    console.log(`server started at : http://127.0.0.1:${port}`);
})