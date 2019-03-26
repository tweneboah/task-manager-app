const express = require('express');
require('./db/mongoose');
const Task = require('./models/task');
const UserRouter = require('./routers/user');
const TaskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT || 3000


// //MIDDLEWARE

//1.Without middleware => new request = run router handler
//2. With middleware=> new request . Do something -> run router
// With middleware we can customise the server to suit our needs
//Middleware can use to check for authentication
//You can prevent a certain page to run

//REGISTERING MIDDLWARE

//When you pass and express functions to app.use() is not a middleware but if we pass in our own functions then it becomes a middleware

// We use next to register a middleware
// Without calling next our route handler will not run
// app.use((req, res, next) => {
//   console.log(req.method, req.path)

//   if(req.method === 'GET'){
//          res.send('GET request is disable')
//   }else{
//     next()
//   }
//  })

//MAINTAINENANCE MODE
// app.use((req, res, next) => {
//   if(req.method === "GET"){
//   res.status(503).send('Site is under maintainence')
//   }else{
//     next()
//   }
// })

app.use(express.json())
//Registering the user Router
app.use(UserRouter)
//Registering Task router
app.use(TaskRouter)

//SERVER



//JWT WEB TOKEN //Generating authenticated tokens and validating them
const jwt = require('jsonwebtoken')
const myFunction = async () => {
  
  const token =  jwt.sign({_id:'abcds43'}, 'thisismynewcourse', {expiresIn: '7 days'}) //This return a token
  const data = jwt.verify(token, 'thisismynewcourse')
  console.log(data) 
}
myFunction()


app.listen(port, () => {
  console.log('Server is runing on port ' + port)
})