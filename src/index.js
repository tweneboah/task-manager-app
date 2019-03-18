const express = require('express');
require('./db/mongoose');
const Task = require('./models/task');
const UserRouter = require('./routers/user');
const TaskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//Registering the user Router
app.use(UserRouter)

//Registering Task router
app.use(TaskRouter)

//SERVER
app.listen(port, () => {
    console.log('Server is runing on port ' + port)
})


//JWT WEB TOKEN //Generating authenticated tokens and validating them
const jwt = require('jsonwebtoken')
const myFunction = async () => {
  
  const token =  jwt.sign({_id:'abcds43'}, 'thisismynewcourse', {expiresIn: '7 days'}) //This return a token
  const data = jwt.verify(token, 'thisismynewcourse')
  console.log(data) 
}
myFunction()