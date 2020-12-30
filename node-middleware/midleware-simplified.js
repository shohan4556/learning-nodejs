/*
- Middleware is something that a functions. Or something that execute between the time that the server gets the request and the server sends the response. 
- (Between request and response) 
- Everything in expressJS is a middleware. 
- It runs in a order that. You defined it 
- Global middleware should be initiated at the top of your script
- We can get access the request and response from the middleware 
*/

const express = require('express')
const app = express();
const port = 8080 | process.env.port;

//global middleware
app.use(logger);

//default middleware (using globally)
app.use(express.json());
//convert post request to json 
app.use(express.urlencoded({extended:true}));
//serve static files
app.use(express.static("public"))

app.get('/', (req, res) => {
  res.send('Home page')
})

// local middleware auth
app.get('/users', auth, (req, res, next)=>{
  res.send('User page');
})

//global middleware using all the route
function logger(req, res, next) {
  console.log(`got the request ${req.originalUrl}`);
  //pass controll to the another middleware function (response) to terminate the request -> response cycle
  next();
  console.log('send the request')
}

//local middleware, only /users route using
function auth(req, res, next){
  // access the request 
  if(req.query.admin === 'true'){
    // execute the next middleware - /users
    next();
    return;
  }
  // modify response 
  res.send('Oridinary User');
}

app.listen(port, () => {
  console.log(`server started at : http://127.0.0.1:${port}`);
})